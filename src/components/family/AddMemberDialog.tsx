
import { useState } from 'react';
import { X, User, Calendar, MapPin, Phone, Mail, Briefcase } from 'lucide-react';
import { FamilyMember } from '@/types/family';

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Partial<FamilyMember>) => void;
  existingMembers: FamilyMember[];
}

export const AddMemberDialog = ({ isOpen, onClose, onSubmit, existingMembers }: AddMemberDialogProps) => {
  const [formData, setFormData] = useState({
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
    motherId: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
      motherId: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                placeholder="Ex: Fils, Fille, Époux, Épouse..."
              />
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lieu de naissance
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Lieu de résidence actuel
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Situation familiale
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  Profession
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
