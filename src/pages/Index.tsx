
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with MTFoP Banner */}
      <div className="w-full bg-gradient-to-r from-red-600 via-white to-green-600 p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gold">
            <p className="text-sm text-gold font-semibold">REPOBLIKAN'I MADAGASIKARA</p>
            <p className="text-sm text-gold font-light">Fitiavana - Tanindrazana - Fandrosoana</p>
          </div>
          <div className="flex justify-center my-4 md:my-0">
            <img 
              src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
              alt="MTFoP Logo" 
              className="h-24 w-auto"
            />
          </div>
          <div className="text-right">
            <p className="text-md font-semibold text-green-800">Ministère du Travail, de l'Emploi</p>
            <p className="text-md font-semibold text-green-800">et de la Fonction Publique</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Système de Gestion des Stagiaires</h1>
            <p className="text-lg text-gray-700 mb-4">
              Bienvenue sur la plateforme de gestion des stagiaires et des projets du Ministère du Travail, 
              de l'Emploi et de la Fonction Publique de Madagascar.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Cette plateforme permet de gérer efficacement les stages, les évaluations et les projets
              au sein de notre ministère.
            </p>
            <div className="flex space-x-4">
              <Button 
                onClick={handleLogin}
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-2 rounded-md"
              >
                S'inscrire / Se connecter
              </Button>
              <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50">
                En savoir plus
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/85fb290d-d5c9-45d9-a72b-b63c11346cfa.png" 
                alt="MTFoP Header" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 rounded-b-lg">
                <div className="flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/00f9c523-711b-4306-a064-0c9681e407f3.png" 
                    alt="Madagascar Emblem" 
                    className="h-16 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">À propos du MTFoP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Notre Mission</h3>
              <p className="text-gray-700">
                Le Ministère du Travail, de l'Emploi et de la Fonction Publique œuvre pour l'amélioration 
                des conditions de travail et la promotion de l'emploi à Madagascar.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Nos Services</h3>
              <p className="text-gray-700">
                Nous offrons divers services pour les employeurs, les employés et les stagiaires, 
                incluant des programmes de formation et d'insertion professionnelle.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-blue-800 mb-3">Nos Valeurs</h3>
              <p className="text-gray-700">
                Intégrité, professionnalisme, transparence et engagement envers le développement 
                du capital humain de Madagascar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 MTFoP - Tous droits réservés</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">Mentions légales</a>
              <a href="#" className="hover:underline">Politique de confidentialité</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
