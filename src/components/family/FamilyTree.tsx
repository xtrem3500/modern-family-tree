
import { useState } from 'react';
import { Plus, Users, Search } from 'lucide-react';
import { MemberCard } from './MemberCard';
import { AddMemberDialog } from './AddMemberDialog';
import { FamilyMember } from '@/types/family';

// Données de démonstration
const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    firstName: 'Pierre',
    lastName: 'Martin',
    title: 'Patriarche',
    birthDate: '1945-03-15',
    birthPlace: 'Paris, France',
    currentLocation: 'Lyon, France',
    phone: '+33 6 12 34 56 78',
    email: 'pierre.martin@email.com',
    situation: 'Marié',
    profession: 'Retraité',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Martin',
    title: 'Épouse',
    birthDate: '1948-07-22',
    birthPlace: 'Marseille, France',
    currentLocation: 'Lyon, France',
    phone: '+33 6 98 76 54 32',
    email: 'marie.martin@email.com',
    situation: 'Mariée',
    spouseId: '1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    firstName: 'Jean',
    lastName: 'Martin',
    title: 'Fils aîné',
    birthDate: '1975-11-10',
    birthPlace: 'Lyon, France',
    currentLocation: 'Paris, France',
    phone: '+33 6 11 22 33 44',
    email: 'jean.martin@email.com',
    situation: 'Marié',
    profession: 'Ingénieur',
    fatherId: '1',
    motherId: '2',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '4',
    firstName: 'Sophie',
    lastName: 'Martin',
    title: 'Fille',
    birthDate: '1978-05-18',
    birthPlace: 'Lyon, France',
    currentLocation: 'Nice, France',
    phone: '+33 6 55 66 77 88',
    email: 'sophie.martin@email.com',
    situation: 'Célibataire',
    profession: 'Médecin',
    fatherId: '1',
    motherId: '2',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

export const FamilyTree = () => {
  const [members, setMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = (memberData: Partial<FamilyMember>) => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      firstName: memberData.firstName || '',
      lastName: memberData.lastName || '',
      title: memberData.title || '',
      birthDate: memberData.birthDate,
      birthPlace: memberData.birthPlace,
      currentLocation: memberData.currentLocation,
      phone: memberData.phone,
      email: memberData.email,
      photoUrl: memberData.photoUrl,
      situation: memberData.situation,
      profession: memberData.profession,
      fatherId: memberData.fatherId,
      motherId: memberData.motherId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setMembers(prev => [...prev, newMember]);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Header */}
      <div className="glass-effect sticky top-0 z-40 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Arbre Généalogique</h1>
                <p className="text-gray-600">Famille Martin</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 text-white px-6 py-3 rounded-xl hover:from-whatsapp-600 hover:to-whatsapp-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter un membre</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total des membres</p>
                <p className="text-2xl font-bold text-gray-900">{members.length}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Générations</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Branches actives</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Family Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => (
            <div
              key={member.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MemberCard
                member={member}
                isSelected={selectedMember?.id === member.id}
                onClick={() => setSelectedMember(member)}
                variant="default"
              />
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">
              Aucun membre trouvé
            </h3>
            <p className="text-gray-400">
              Essayez de modifier votre recherche ou ajoutez un nouveau membre
            </p>
          </div>
        )}
      </div>

      <AddMemberDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddMember}
        existingMembers={members}
      />
    </div>
  );
};
