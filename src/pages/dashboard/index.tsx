
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Users, TreePine, Plus, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';

const Dashboard = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { members, isLoading } = useFamilyMembers();

  const dashboardItems = [
    {
      id: 'tree',
      title: 'Arbre Généalogique',
      description: 'Visualisez et gérez votre arbre familial',
      icon: TreePine,
      path: '/',
      color: 'bg-gradient-to-br from-whatsapp-500 to-whatsapp-600',
    },
    {
      id: 'members',
      title: 'Membres',
      description: 'Gérez les membres de votre famille',
      icon: Users,
      path: '/dashboard/members',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      id: 'invite',
      title: 'Ajouter un membre',
      description: 'Ajoutez de nouveaux membres à la famille',
      icon: Plus,
      path: '/dashboard/invite',
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    },
    {
      id: 'settings',
      title: 'Paramètres',
      description: 'Configurez vos préférences',
      icon: Settings,
      path: '/dashboard/settings',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
  ];

  const totalMembers = members.length;
  const patriarchs = members.filter(m => m.title === 'Patriarche').length;
  const generations = Math.max(1, new Set(members.map(m => {
    if (m.title.includes('Grand-')) return 3;
    if (m.title.includes('Petit-')) return 1;
    if (['Père', 'Mère', 'Patriarche', 'Matriarche'].includes(m.title)) return 2;
    return 1;
  })).size);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600">
          Gérez votre arbre généalogique et votre famille
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardItems.map((item) => {
          const Icon = item.icon;
          const isHovered = hoveredCard === item.id;

          return (
            <Card
              key={item.id}
              className={cn(
                'p-6 cursor-pointer transition-all duration-300 hover-lift glass-effect',
                isHovered && 'transform -translate-y-2 shadow-xl'
              )}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(item.path)}
            >
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300',
                item.color,
                isHovered && 'animate-bounce'
              )}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Stats Section */}
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
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? '...' : totalMembers}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-effect">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TreePine className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Générations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? '...' : generations}
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
                <p className="text-sm text-gray-600">Patriarches</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? '...' : patriarchs}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
