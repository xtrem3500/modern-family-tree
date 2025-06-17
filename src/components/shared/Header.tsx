
import { Link, useLocation } from 'react-router-dom';
import { TreePine, Home, Users, Settings, Menu, X } from 'lucide-react';
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
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-white/20'
          : 'bg-white/80 backdrop-blur-md'
      )}
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group relative"
          >
            <div className="relative">
              <TreePine className="w-6 h-6 text-whatsapp-500 group-hover:animate-bounce transition-all duration-300" />
              <div className="absolute inset-0 bg-whatsapp-500/20 rounded-full blur-sm group-hover:scale-150 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold gradient-text group-hover:text-whatsapp-600 transition-colors duration-300">
              Family Tree
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-whatsapp-50 text-whatsapp-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-whatsapp-600'
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

          {/* Bouton Menu Mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        <div
          className={cn(
            'md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out',
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
                    'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all',
                    isActive
                      ? 'bg-whatsapp-50 text-whatsapp-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-whatsapp-600'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
