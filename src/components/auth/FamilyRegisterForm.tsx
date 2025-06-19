
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  firstName: z.string().min(2, 'Le prénom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  phone: z.string().optional(),
  profession: z.string().optional(),
  currentLocation: z.string().optional(),
  birthPlace: z.string().optional(),
  country: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const FamilyRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      // Vérifier si c'est le premier utilisateur
      const { data: existingProfiles, error: checkError } = await supabase
        .from('profiles')
        .select('id');

      if (checkError) {
        console.error('Error checking existing profiles:', checkError);
      }

      const isFirstUser = !existingProfiles || existingProfiles.length === 0;

      // Créer l'utilisateur dans Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Erreur lors de la création du compte');
      }

      // Upload de la photo si présente
      let photoUrl = null;
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${authData.user.id}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, photoFile);

        if (uploadError) {
          console.error('Photo upload error:', uploadError);
        } else {
          const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          photoUrl = urlData.publicUrl;
        }
      }

      // Créer le profil utilisateur
      const profileData = {
        id: authData.user.id,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone || null,
        current_location: data.currentLocation || null,
        birth_place: data.birthPlace || null,
        country: data.country || null,
        photo_url: photoUrl,
        title: isFirstUser ? 'Patriarche' as const : 'Fils' as const,
        is_patriarch: isFirstUser,
        is_admin: false,
        situation: data.profession || null,
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .insert(profileData);

      if (profileError) {
        throw new Error(profileError.message);
      }

      toast({
        title: "Inscription réussie !",
        description: isFirstUser 
          ? "Félicitations ! Vous êtes maintenant le patriarche de votre famille."
          : "Votre compte a été créé avec succès.",
      });

      navigate('/dashboard');

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erreur d'inscription",
        description: error instanceof Error ? error.message : "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Photo de profil */}
      <div className="flex flex-col items-center space-y-2">
        <div className="relative">
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Aperçu"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-whatsapp-500 text-white p-1.5 rounded-full cursor-pointer hover:bg-whatsapp-600 transition-colors">
            <Upload className="w-3 h-3" />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500">Photo de profil (optionnelle)</p>
      </div>

      {/* Informations personnelles */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            placeholder="Votre prénom"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Votre nom"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="votre@email.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Mot de passe *</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder="Minimum 6 caractères"
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          {...register('phone')}
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      <div>
        <Label htmlFor="profession">Profession / Statut</Label>
        <Input
          id="profession"
          {...register('profession')}
          placeholder="Ex: Ingénieur, Retraité, Étudiant..."
        />
      </div>

      <div>
        <Label htmlFor="currentLocation">Localisation actuelle</Label>
        <Input
          id="currentLocation"
          {...register('currentLocation')}
          placeholder="Ex: Paris, France"
        />
      </div>

      <div>
        <Label htmlFor="birthPlace">Lieu de naissance</Label>
        <Input
          id="birthPlace"
          {...register('birthPlace')}
          placeholder="Ex: Lyon, France"
        />
      </div>

      <div>
        <Label htmlFor="country">Pays</Label>
        <Input
          id="country"
          {...register('country')}
          placeholder="Ex: France"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-whatsapp-500 hover:bg-whatsapp-600"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Inscription en cours...
          </>
        ) : (
          'Créer mon compte'
        )}
      </Button>
    </form>
  );
};
