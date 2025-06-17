
import { Link, useLocation } from 'react-router-dom';
import { TreePine, Home, Users, Settings, Menu, X, MessageCircle, Facebook, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/dashboard', icon: TreePine, label: 'Arbre' },
    { path: '/dashboard/members', icon: Users, label: 'Membres' },
    { path: '/dashboard/settings', icon: Settings, label: 'Paramètres' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-gradient-to-r from-whatsapp-500/95 to-whatsapp-600/95 shadow-lg backdrop-blur-md'
          : 'bg-gradient-to-r from-whatsapp-500/90 to-whatsapp-600/90 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo et Titre */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md
                              group-hover:scale-150 transition-transform duration-500 animate-pulse-soft" />
                <TreePine className="w-8 h-8 text-white relative z-10
                                  group-hover:animate-bounce transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white group-hover:text-whatsapp-100
                               transition-colors duration-300">
                  Family Tree
                </span>
                <span className="text-sm text-whatsapp-100/80 group-hover:text-whatsapp-100/90
                               transition-colors duration-300">
                  Votre histoire familiale
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className={cn(
                    'w-5 h-5 transition-transform duration-300',
                    isActive ? 'scale-110' : 'hover:scale-110'
                  )} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Zone Sociale et Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Boutons sociaux */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-white/80 hover:text-white transition-colors duration-200
                               hover:bg-white/10 rounded-lg">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/80 hover:text-white transition-colors duration-200
                               hover:bg-white/10 rounded-lg">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/80 hover:text-white transition-colors duration-200
                               hover:bg-white/10 rounded-lg">
                <Star className="w-5 h-5" />
              </button>
            </div>

            {/* Séparateur */}
            <div className="w-px h-6 bg-white/20" />

            {/* Zone Utilisateur Simulée */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-whatsapp-200 to-whatsapp-300 
                               border-2 border-white/20 hover:border-white/40 transition-colors duration-200
                               flex items-center justify-center">
                  <span className="text-whatsapp-700 font-semibold text-sm">JD</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400
                              rounded-full border-2 border-white animate-pulse" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-whatsapp-100/80">En ligne</p>
              </div>
            </div>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        <div
          className={cn(
            'md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-white/20 transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          )}
        >
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-whatsapp-50 text-whatsapp-600 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-whatsapp-600'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Actions mobiles */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-around">
                <button className="p-3 text-gray-600 hover:text-whatsapp-600 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="p-3 text-gray-600 hover:text-whatsapp-600 transition-colors">
                  <Facebook className="w-6 h-6" />
                </button>
                <button className="p-3 text-gray-600 hover:text-whatsapp-600 transition-colors">
                  <Star className="w-6 h-6" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
