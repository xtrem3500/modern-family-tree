
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Users, Plus, Search, Filter } from 'lucide-react';
import { AddMemberDialog } from '@/components/family/AddMemberDialog';
import { MemberCard } from '@/components/family/MemberCard';
import { FamilyMember } from '@/types/family';

const Members = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Données mockées pour les tests
  const mockMembers: FamilyMember[] = [
    {
      id: '1',
      firstName: 'Pierre',
      lastName: 'Martin',
      title: 'Patriarche',
      birthDate: '1945-03-15',
      currentLocation: 'Lyon, France',
      photoUrl: '',
      situation: 'Marié',
      email: 'pierre.martin@example.com',
      phone: '+33 6 12 34 56 78',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      title: 'Épouse',
      birthDate: '1948-07-22',
      currentLocation: 'Lyon, France',
      photoUrl: '',
      situation: 'Mariée',
      email: 'marie.martin@example.com',
      phone: '+33 6 12 34 56 79',
      spouseId: '1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '3',
      firstName: 'Jean',
      lastName: 'Martin',
      title: 'Fils',
      birthDate: '1975-11-10',
      currentLocation: 'Paris, France',
      photoUrl: '',
      situation: 'Marié',
      email: 'jean.martin@example.com',
      phone: '+33 6 12 34 56 80',
      fatherId: '1',
      motherId: '2',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ];

  const handleAddMember = (memberData: Partial<FamilyMember>) => {
    console.log('Adding member:', memberData);
    setIsAddDialogOpen(false);
  };

  const filteredMembers = mockMembers.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Membres de la Famille
          </h1>
          <p className="text-gray-600">
            Gérez les membres de votre famille
          </p>
        </div>
        
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 text-white px-6 py-3 rounded-xl hover:from-whatsapp-600 hover:to-whatsapp-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter un membre</span>
        </button>
      </div>

      {/* Search and Filter */}
      <Card className="p-6 mb-8 glass-effect">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-whatsapp-500 focus:border-transparent"
            />
          </div>
          <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Stats */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass-effect">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total des membres</p>
                <p className="text-2xl font-bold text-gray-900">{mockMembers.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-effect">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Adultes</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-effect">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Enfants</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <AddMemberDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddMember}
        existingMembers={mockMembers}
      />
    </div>
  );
};

export default Members;
