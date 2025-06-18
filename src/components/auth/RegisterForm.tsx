
import { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, Calendar, Eye, EyeOff, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { SocialAuthButtons } from './SocialAuthButtons';
import { Constants } from '@/integrations/supabase/types';
import { Avatar } from '@/components/shared/Avatar';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    title: '',
    phone: '',
    country: '',
    birthDate: '',
    birthPlace: '',
    currentLocation: '',
    situation: '',
    profession: '',
    photoUrl: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailChange = (value: string) => {
    // Si l'utilisateur tape seulement le nom d'utilisateur, ajouter @gmail.com automatiquement
    if (value && !value.includes('@') && !value.includes('.')) {
      setFormData(prev => ({ ...prev, email: value + '@gmail.com' }));
    } else {
      setFormData(prev => ({ ...prev, email: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        handleChange('photoUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            title: formData.title,
            phone: formData.phone,
            country: formData.country,
            birth_date: formData.birthDate,
            birth_place: formData.birthPlace,
            current_location: formData.currentLocation,
            situation: formData.situation,
            profession: formData.profession,
            photo_url: formData.photoUrl
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Social Login */}
      <SocialAuthButtons />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Ou inscrivez-vous avec</span>
        </div>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Avatar Selection */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <Avatar
                src={formData.photoUrl}
                size="lg"
                fallback={formData.firstName ? formData.firstName[0].toUpperCase() : '?'}
              />
              <label className="absolute bottom-0 right-0 w-6 h-6 bg-whatsapp-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-whatsapp-600 transition-colors">
                <Camera className="w-3 h-3 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <p className="text-xs text-gray-500">Photo de profil (optionnel)</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent text-sm"
                placeholder="Prénom"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent text-sm"
              placeholder="Nom"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre/Rôle *
          </label>
          <select
            required
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent text-sm"
          >
            <option value="">Sélectionner...</option>
            {Constants.public.Enums.family_title.map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email ou nom d'utilisateur *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              required
              value={formData.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent text-sm"
              placeholder="admin123 ou email@exemple.com"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Tapez juste le nom (ex: admin123) pour @gmail.com automatique
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full pl-9 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent text-sm"
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
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 text-white py-2 rounded-lg hover:from-whatsapp-600 hover:to-whatsapp-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isLoading ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};
