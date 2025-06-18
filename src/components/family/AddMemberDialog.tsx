
import { useState } from 'react';
import { X, User, Calendar, MapPin, Phone, Mail, Briefcase, Lock, Camera } from 'lucide-react';
import { FamilyMember } from '@/types/family';
import { Database } from '@/integrations/supabase/types';
import { Avatar } from '@/components/shared/Avatar';

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Partial<FamilyMember>) => void;
  existingMembers: FamilyMember[];
}

export const AddMemberDialog = ({ isOpen, onClose, onSubmit, existingMembers }: AddMemberDialogProps) => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    title: Database['public']['Enums']['family_title'] | '';
    birthDate: string;
    birthPlace: string;
    currentLocation: string;
    phone: string;
    email: string;
    situation: string;
    profession: string;
    fatherId: string;
    motherId: string;
    photoUrl: string;
  }>({
    firstName: '',
    lastName: '',
    title: '',
    birthDate: '',
    birthPlace: '',
    currentLocation: '',
    phone: '',
    email: '',
    situation: '',
    profession: '',
    fatherId: '',
    motherId: '',
    photoUrl: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ne soumettre que si le titre est valide
    if (formData.title) {
      onSubmit({
        ...formData,
        title: formData.title as Database['public']['Enums']['family_title']
      });
      setFormData({
        firstName: '',
        lastName: '',
        title: '',
        birthDate: '',
        birthPlace: '',
        currentLocation: '',
        phone: '',
        email: '',
        situation: '',
        profession: '',
        fatherId: '',
        motherId: '',
        photoUrl: ''
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold gradient-text">Ajouter un membre</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Avatar Selection */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar
                  src={formData.photoUrl}
                  size="xl"
                  fallback={formData.firstName ? formData.firstName[0].toUpperCase() : '?'}
                />
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-whatsapp-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-whatsapp-600 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-600">Cliquez sur l'icône pour ajouter une photo</p>
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <User className="w-5 h-5 text-whatsapp-600" />
              <span>Informations personnelles</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                  placeholder="Prénom"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                  placeholder="Nom de famille"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre/Rôle *
              </label>
              <select
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Sélectionner un titre...</option>
                <option value="Patriarche">Patriarche</option>
                <option value="Matriarche">Matriarche</option>
                <option value="Père">Père</option>
                <option value="Mère">Mère</option>
                <option value="Fils">Fils</option>
                <option value="Fille">Fille</option>
                <option value="Grand-père">Grand-père</option>
                <option value="Grand-mère">Grand-mère</option>
                <option value="Petit-fils">Petit-fils</option>
                <option value="Petite-fille">Petite-fille</option>
                <option value="Oncle">Oncle</option>
                <option value="Tante">Tante</option>
                <option value="Neveu">Neveu</option>
                <option value="Nièce">Nièce</option>
                <option value="Cousin">Cousin</option>
                <option value="Cousine">Cousine</option>
                <option value="Époux">Époux</option>
                <option value="Épouse">Épouse</option>
                <option value="Beau-père">Beau-père</option>
                <option value="Belle-mère">Belle-mère</option>
                <option value="Beau-fils">Beau-fils</option>
                <option value="Belle-fille">Belle-fille</option>
                <option value="Frère">Frère</option>
                <option value="Sœur">Sœur</option>
              </select>
            </div>
          </div>

          {/* Birth & Location Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-whatsapp-600" />
              <span>Naissance et localisation</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span>Date de naissance</span>
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span>Lieu de naissance</span>
                </label>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) => handleChange('birthPlace', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ville, Pays"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-gray-400" />
                <MapPin className="w-4 h-4" />
                <span>Lieu de résidence actuel</span>
              </label>
              <input
                type="text"
                value={formData.currentLocation}
                onChange={(e) => handleChange('currentLocation', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                placeholder="Ville, Pays"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Phone className="w-5 h-5 text-whatsapp-600" />
              <span>Contact et situation</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                  placeholder="email@exemple.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span>Situation familiale</span>
                </label>
                <select
                  value={formData.situation}
                  onChange={(e) => handleChange('situation', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Célibataire">Célibataire</option>
                  <option value="Marié(e)">Marié(e)</option>
                  <option value="Divorcé(e)">Divorcé(e)</option>
                  <option value="Veuf/Veuve">Veuf/Veuve</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <Briefcase className="w-4 h-4" />
                  <span>Profession</span>
                </label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => handleChange('profession', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                  placeholder="Profession actuelle"
                />
              </div>
            </div>
          </div>

          {/* Relations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Relations familiales</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Père
                </label>
                <select
                  value={formData.fatherId}
                  onChange={(e) => handleChange('fatherId', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Sélectionner le père...</option>
                  {existingMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.firstName} {member.lastName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mère
                </label>
                <select
                  value={formData.motherId}
                  onChange={(e) => handleChange('motherId', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Sélectionner la mère...</option>
                  {existingMembers.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.firstName} {member.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 text-white hover:from-whatsapp-600 hover:to-whatsapp-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Ajouter le membre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
