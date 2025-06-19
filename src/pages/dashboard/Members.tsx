
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Users, Plus, Search, Filter } from 'lucide-react';
import { AddMemberDialog } from '@/components/family/AddMemberDialog';
import { MemberCard } from '@/components/family/MemberCard';
import { FamilyMember } from '@/types/family';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

const Members = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { members, isLoading, error, refetch } = useFamilyMembers();

  const handleAddMember = (memberData: Partial<FamilyMember>) => {
    console.log('Adding member:', memberData);
    setIsAddDialogOpen(false);
    // Rafraîchir la liste après ajout
    refetch();
  };

  const filteredMembers = members.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 text-whatsapp-500 animate-spin mx-auto" />
            <p className="text-gray-600">Chargement des membres...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <div className="space-y-2">
              <p className="text-red-600 font-medium">Erreur de chargement</p>
              <p className="text-gray-600 text-sm">{error}</p>
              <button
                onClick={refetch}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-whatsapp-500 text-white rounded-lg hover:bg-whatsapp-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Réessayer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Membres de la Famille
          </h1>
          <p className="text-gray-600">
            Gérez les membres de votre famille ({members.length} membre{members.length > 1 ? 's' : ''})
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
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">
            {searchTerm ? 'Aucun membre trouvé' : 'Aucun membre dans la famille'}
          </h3>
          <p className="text-gray-400">
            {searchTerm 
              ? 'Essayez de modifier votre recherche'
              : 'Commencez par ajouter des membres à votre famille'
            }
          </p>
        </div>
      )}

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
                <p className="text-2xl font-bold text-gray-900">{members.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-effect">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Patriarches</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.filter(m => m.title === 'Patriarche').length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-effect">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avec photo</p>
                <p className="text-2xl font-bold text-gray-900">
                  {members.filter(m => m.photoUrl).length}
                </p>
              </div>
            </div>
          </Card>
        </div>
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

export default Members;
