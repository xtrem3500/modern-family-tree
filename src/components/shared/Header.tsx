
import { useState } from 'react';
import { TreePine, Menu, X, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <TreePine className="w-8 h-8 text-whatsapp-600" />
            <span className="text-xl font-bold text-gray-900">Famille Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-whatsapp-600 transition-colors"
            >
              Arbre Familial
            </Link>
            <Link 
              to="/dashboard/members" 
              className="text-gray-700 hover:text-whatsapp-600 transition-colors"
            >
              Membres
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Bonjour, {user.email}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/family-auth">
                  <Button variant="outline" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link to="/family-auth">
                  <Button size="sm" className="bg-whatsapp-500 hover:bg-whatsapp-600">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-whatsapp-600 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-white">
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 text-gray-700 hover:text-whatsapp-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Arbre Familial
              </Link>
              <Link 
                to="/dashboard/members" 
                className="block px-3 py-2 text-gray-700 hover:text-whatsapp-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Membres
              </Link>
              
              {user ? (
                <div className="px-3 py-2 space-y-2">
                  <p className="text-sm text-gray-600">
                    Bonjour, {user.email}
                  </p>
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link to="/family-auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/family-auth" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" className="w-full bg-whatsapp-500 hover:bg-whatsapp-600">
                      Inscription
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
