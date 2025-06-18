
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TreePine, Users, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <TreePine className="w-12 h-12 text-whatsapp-600" />
            <h1 className="text-5xl font-bold text-gray-900">Famille Connect</h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Créez et explorez votre arbre généalogique familial. Connectez-vous avec vos proches, 
            partagez des souvenirs et préservez l'histoire de votre famille pour les générations futures.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/family-auth">
              <Button size="lg" className="bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 hover:from-whatsapp-600 hover:to-whatsapp-700 text-white px-8 py-3">
                Rejoindre ma famille
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-whatsapp-500 text-whatsapp-600 hover:bg-whatsapp-50 px-8 py-3">
                Voir l'arbre familial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir Famille Connect ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-green-100 hover:border-whatsapp-300 transition-colors">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Connexion Familiale</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Restez connecté avec tous les membres de votre famille, près ou loin. 
                  Partagez des moments, des photos et des nouvelles importantes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:border-whatsapp-300 transition-colors">
              <CardHeader className="text-center">
                <TreePine className="w-12 h-12 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Arbre Généalogique</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Visualisez et explorez votre histoire familiale avec un arbre généalogique 
                  interactif et facile à naviguer.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 hover:border-whatsapp-300 transition-colors">
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-whatsapp-600 mx-auto mb-4" />
                <CardTitle className="text-xl text-gray-900">Souvenirs Partagés</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  Créez un album familial numérique pour préserver et partager 
                  vos précieux souvenirs familiaux.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-whatsapp-500 to-whatsapp-600">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer votre voyage familial ?
          </h2>
          <p className="text-xl text-whatsapp-100 mb-8">
            Rejoignez des milliers de familles qui utilisent déjà Famille Connect 
            pour rester connectées et préserver leur héritage.
          </p>
          <Link to="/family-auth">
            <Button size="lg" variant="secondary" className="bg-white text-whatsapp-600 hover:bg-gray-100 px-8 py-3">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
