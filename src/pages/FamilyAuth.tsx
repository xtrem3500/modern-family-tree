
import React, { useState } from 'react';
import { TreePine, Users } from 'lucide-react';
import { FamilyLoginForm } from '@/components/auth/FamilyLoginForm';
import { FamilyRegisterForm } from '@/components/auth/FamilyRegisterForm';

const FamilyAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TreePine className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Famille Connect</h1>
          </div>
          <p className="text-whatsapp-100">
            {isLogin ? 'Retrouvez votre famille' : 'Rejoignez votre famille'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="p-6 border-b">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-white text-whatsapp-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin
                  ? 'bg-white text-whatsapp-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Inscription
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {isLogin ? <FamilyLoginForm /> : <FamilyRegisterForm />}
        </div>

        {/* Info Footer */}
        {!isLogin && (
          <div className="bg-blue-50 p-4 border-t">
            <div className="flex items-start space-x-2">
              <Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Information importante :</p>
                <p className="mt-1">
                  Le premier membre inscrit devient automatiquement le patriarche de la famille. 
                  Les autres membres pourront ensuite rejoindre la famille en précisant leur lien familial.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyAuth;
