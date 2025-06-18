
import { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, Calendar } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? 'Connexion' : 'Inscription'}
          </h1>
          <p className="text-whatsapp-100 mt-1">
            {isLogin ? 'Connectez-vous à votre compte familial' : 'Rejoignez votre famille'}
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          {/* Toggle Form */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-2 text-whatsapp-600 hover:text-whatsapp-700 font-medium transition-colors"
            >
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
