
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar } from '@/components/shared/Avatar';
import { Camera, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const familyRegisterSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe minimum 6 caractères"),
  phone: z.string().optional(),
  profession: z.string().optional(),
  currentLocation: z.string().optional(),
  birthPlace: z.string().optional(),
  photoUrl: z.string().optional(),
});

type FamilyRegisterData = z.infer<typeof familyRegisterSchema>;

export const FamilyRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FamilyRegisterData>({
    resolver: zodResolver(familyRegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      profession: '',
      currentLocation: '',
      birthPlace: '',
      photoUrl: '',
    }
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfilePhoto(result);
        form.setValue('photoUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FamilyRegisterData) => {
    setIsLoading(true);
    
    try {
      // Vérifier si c'est le premier utilisateur
      const { data: existingProfiles, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);

      if (checkError) {
        throw new Error('Erreur lors de la vérification des utilisateurs existants');
      }

      const isFirstUser = !existingProfiles || existingProfiles.length === 0;

      // Créer le compte utilisateur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone || '',
            profession: data.profession || '',
            current_location: data.currentLocation || '',
            birth_place: data.birthPlace || '',
            photo_url: data.photoUrl || '',
            title: isFirstUser ? 'Patriarche' : 'Membre',
            is_patriarch: isFirstUser,
            is_admin: false,
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        // Créer le profil dans la table profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone || '',
            current_location: data.currentLocation || '',
            birth_place: data.birthPlace || '',
            photo_url: data.photoUrl || '',
            title: isFirstUser ? 'Patriarche' : 'Membre',
            is_patriarch: isFirstUser,
            is_admin: false,
          });

        if (profileError) {
          console.error('Erreur création profil:', profileError);
          // Continue même si l'insertion du profil échoue
        }

        toast({
          title: "Inscription réussie !",
          description: isFirstUser 
            ? "Félicitations ! Vous êtes maintenant le patriarche de la famille." 
            : "Votre compte a été créé avec succès.",
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Erreur inscription:', error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Rejoindre la famille</h2>
        <p className="mt-2 text-gray-600">
          Créez votre profil familial
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Photo de profil */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Avatar
                src={profilePhoto}
                size="lg"
                fallback={form.watch('firstName') ? form.watch('firstName')[0].toUpperCase() : '?'}
              />
              <label className="absolute bottom-0 right-0 w-6 h-6 bg-whatsapp-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-whatsapp-600 transition-colors">
                <Camera className="w-3 h-3 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <p className="text-xs text-gray-500">Photo de profil (optionnel)</p>
        </div>

        {/* Nom et Prénom */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Prénom *</Label>
            <Input
              id="firstName"
              {...form.register('firstName')}
              placeholder="Prénom"
            />
            {form.formState.errors.firstName && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.firstName.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="lastName">Nom *</Label>
            <Input
              id="lastName"
              {...form.register('lastName')}
              placeholder="Nom de famille"
            />
            {form.formState.errors.lastName && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...form.register('email')}
            placeholder="votre@email.com"
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Mot de passe */}
        <div>
          <Label htmlFor="password">Mot de passe *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...form.register('password')}
              placeholder="Mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-sm text-red-600 mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            {...form.register('phone')}
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        {/* Profession */}
        <div>
          <Label htmlFor="profession">Profession/Activité</Label>
          <Input
            id="profession"
            {...form.register('profession')}
            placeholder="ex: Médecin, Retraité, Étudiant..."
          />
        </div>

        {/* Localisation actuelle */}
        <div>
          <Label htmlFor="currentLocation">Localisation actuelle</Label>
          <Input
            id="currentLocation"
            {...form.register('currentLocation')}
            placeholder="ex: Paris, France"
          />
        </div>

        {/* Lieu de naissance */}
        <div>
          <Label htmlFor="birthPlace">Lieu de naissance</Label>
          <Input
            id="birthPlace"
            {...form.register('birthPlace')}
            placeholder="ex: Lyon, France"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700"
        >
          {isLoading ? 'Inscription...' : "Créer mon profil familial"}
        </Button>
      </form>
    </div>
  );
};
