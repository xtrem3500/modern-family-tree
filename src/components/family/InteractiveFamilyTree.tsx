
import { useState, useCallback } from 'react';
import Tree from 'react-d3-tree';
import { FamilyNode } from './FamilyNode';
import { useFamilyTree } from '@/hooks/useFamilyTree';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export const InteractiveFamilyTree = () => {
  const { treeData, isLoading, error, refetch } = useFamilyTree();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const renderCustomNodeElement = useCallback(({ nodeDatum, toggleNode }: any) => (
    <g>
      <foreignObject width="280" height="200" x="-140" y="-100">
        <FamilyNode
          nodeDatum={nodeDatum}
          onClick={() => {
            setSelectedNode(nodeDatum.id);
            if (nodeDatum.children) {
              toggleNode();
            }
          }}
          isSelected={selectedNode === nodeDatum.id}
        />
      </foreignObject>
    </g>
  ), [selectedNode]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-whatsapp-500 animate-spin mx-auto" />
          <p className="text-gray-600">Chargement de l'arbre généalogique...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  if (!treeData) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <span className="text-gray-400 text-2xl">👨‍👩‍👧‍👦</span>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 font-medium">Aucune donnée familiale trouvée</p>
            <p className="text-gray-500 text-sm">Commencez par ajouter des membres à votre famille</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <Tree
        data={treeData}
        translate={{ x: 400, y: 150 }}
        orientation="vertical"
        pathFunc="diagonal"
        renderCustomNodeElement={renderCustomNodeElement}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        nodeSize={{ x: 300, y: 250 }}
        zoom={0.8}
        scaleExtent={{ min: 0.3, max: 2 }}
        enableLegacyTransitions
        transitionDuration={500}
      />
    </div>
  );
};
