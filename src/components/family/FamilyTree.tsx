
import { useState } from 'react';
import { Plus, Users, Search, TreePine } from 'lucide-react';
import { InteractiveFamilyTree } from './InteractiveFamilyTree';
import { AddMemberDialog } from './AddMemberDialog';
import { FamilyMember } from '@/types/family';

export const FamilyTree = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree');

  const handleAddMember = (memberData: Partial<FamilyMember>) => {
    console.log('Adding member:', memberData);
    // TODO: Implémenter l'ajout en base de données
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
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Arbre Généalogique</h1>
                <p className="text-gray-600">Famille Martin</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Toggle View Mode */}
              <div className="flex items-center bg-white/80 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('tree')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'tree'
                      ? 'bg-whatsapp-500 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <TreePine className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-whatsapp-500 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-5 h-5" />
                </button>
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
      </div>

      {/* Main Content */}
      <div className="relative">
        {viewMode === 'tree' ? (
          <InteractiveFamilyTree />
        ) : (
          <div className="container mx-auto px-6 py-8">
            <div className="text-center py-12">
              <Users className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">
                Vue grille en développement
              </h3>
              <p className="text-gray-400">
                Utilisez la vue arbre pour voir votre famille
              </p>
            </div>
          </div>
        )}
      </div>

      <AddMemberDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddMember}
        existingMembers={[]}
      />
    </div>
  );
};
