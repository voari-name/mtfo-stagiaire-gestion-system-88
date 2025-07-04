
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useSettings } from "@/contexts/SettingsContext";
import { X } from "lucide-react";

const Index = () => {
  const [showMTEFoPInfo, setShowMTEFoPInfo] = useState(false);
  const { translations } = useSettings();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
      {/* Header with MTeFoP Banner */}
      <div className="w-full bg-gradient-to-r from-red-600 via-white to-green-600 p-4 shadow-md animate-fade-in">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gold animate-slide-in-left">
            <p className="text-sm text-gold font-semibold">REPOBLIKAN'I MADAGASIKARA</p>
            <p className="text-sm text-gold font-light">Fitiavana - Tanindrazana - Fandrosoana</p>
          </div>
          <div className="flex justify-center my-4 md:my-0 animate-bounce-slow">
            <img 
              src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
              alt="MTeFoP Logo" 
              className="h-24 w-auto hover-scale transition-transform duration-300 animate-pulse-slow"
            />
          </div>
          <div className="text-right animate-slide-in-right">
            <p className="text-md font-semibold text-green-800">Ministère du Travail, de l'Emploi</p>
            <p className="text-md font-semibold text-green-800">et de la Fonction Publique</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 dark:text-blue-100 mb-6">
            Bienvenue sur <span className="text-blue-600 dark:text-blue-300">MTeFoP</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 dark:text-blue-200 mb-8 max-w-3xl mx-auto">
            Système de gestion des stages - Ministère du Travail, de l'Emploi et de la Fonction Publique
          </p>
          <p className="text-lg text-blue-600 dark:text-blue-300 mb-12 max-w-2xl mx-auto">
            Plateforme moderne pour la gestion, le suivi et l'évaluation des stagiaires
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Button 
              onClick={handleLogin}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 text-lg hover-scale transition-all duration-300 transform hover:shadow-xl"
            >
              Se connecter
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg hover-scale transition-all duration-300 transform hover:shadow-xl"
                >
                  En savoir plus
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] animate-scale-in">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center gap-3">
                    <img 
                      src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
                      alt="MTeFoP Logo" 
                      className="h-8 w-auto"
                    />
                    À propos du MTeFoP
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg">
                    Le Ministère du Travail, de l'Emploi et de la Fonction Publique (MTeFoP) 
                    est un département gouvernemental clé de la République de Madagascar.
                  </p>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-800">Notre Mission</h3>
                    <p>
                      Nous œuvrons pour l'amélioration des conditions de travail, la promotion de l'emploi, 
                      et le développement de la fonction publique à Madagascar.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-blue-800">Cette Plateforme</h3>
                    <p>
                      Ce système de gestion des stagiaires permet de :
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Gérer efficacement les stages au sein du ministère</li>
                      <li>Suivre les projets et les évaluations des stagiaires</li>
                      <li>Générer des attestations officielles</li>
                      <li>Analyser les statistiques et performances</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                    <p className="text-sm italic text-blue-800">
                      "Fitiavana - Tanindrazana - Fandrosoana"
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Devise de la République de Madagascar
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 animate-fade-in-up">
            <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-400 mb-6 animate-slide-in-right animate-gradient-text">Système de Gestion des Stagiaires</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Bienvenue sur la plateforme de gestion des stagiaires et des projets du Ministère du Travail, 
              de l'Emploi et de la Fonction Publique de Madagascar.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Cette plateforme permet de gérer efficacement les stages, les évaluations et les projets
              au sein de notre ministère.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="relative animate-float">
              <img 
                src="/lovable-uploads/85fb290d-d5c9-45d9-a72b-b63c11346cfa.png" 
                alt="MTeFoP Header" 
                className="w-full h-auto rounded-lg shadow-lg hover-scale transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </main>

      {/* About Section with Enhanced Madagascar Emblem */}
      <div className="bg-gray-100 dark:bg-card py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          {/* Enhanced Madagascar Emblem positioned above À propos */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <div className="relative animate-float">
                <img 
                  src="/lovable-uploads/00f9c523-711b-4306-a064-0c9681e407f3.png" 
                  alt="République de Madagascar" 
                  className="h-40 w-auto hover-scale transition-transform duration-500 animate-glow shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-xl animate-pulse-slow"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-400 mb-4 animate-gradient-text">République de Madagascar</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 animate-fade-in" style={{animationDelay: '0.2s'}}>Fitiavana - Tanindrazana - Fandrosoana</p>
          </div>

          <h2 className="text-2xl font-bold text-center text-blue-900 dark:text-blue-400 mb-8 animate-fade-in">À propos du MTeFoP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in-up hover:bg-gradient-to-br hover:from-blue-50 hover:to-white dark:hover:from-blue-950 dark:hover:to-card">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">Notre Mission</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Le Ministère du Travail, de l'Emploi et de la Fonction Publique œuvre pour l'amélioration 
                des conditions de travail et la promotion de l'emploi à Madagascar.
              </p>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in-up hover:bg-gradient-to-br hover:from-green-50 hover:to-white dark:hover:from-green-950 dark:hover:to-card" style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">Nos Services</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nous offrons divers services pour les employeurs, les employés et les stagiaires, 
                incluant des programmes de formation et d'insertion professionnelle.
              </p>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in-up hover:bg-gradient-to-br hover:from-red-50 hover:to-white dark:hover:from-red-950 dark:hover:to-card" style={{animationDelay: '0.4s'}}>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">Nos Valeurs</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Intégrité, professionnalisme, transparence et engagement envers le développement 
                du capital humain de Madagascar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer MTeFoP 2025 */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950 py-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
                alt="MTeFoP Logo" 
                className="h-12 w-auto animate-pulse-slow hover-scale transition-transform duration-300"
              />
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 animate-gradient-text drop-shadow-lg animate-pulse">
                  MTeFoP 2025
                </h3>
                <p className="text-blue-200 text-sm animate-fade-in">Ministère du Travail, de l'Emploi et de la Fonction Publique</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-blue-200 text-sm animate-fade-in">© 2025 République de Madagascar</p>
              <p className="text-blue-300 text-xs animate-fade-in" style={{animationDelay: '0.2s'}}>
                Fitiavana - Tanindrazana - Fandrosoana
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-blue-700 text-center">
            <div className="flex justify-center space-x-8 text-blue-200 text-sm">
              <span className="hover:text-white transition-colors animate-fade-in cursor-default">
                Système de Gestion des Stagiaires
              </span>
              <span className="hover:text-white transition-colors animate-fade-in cursor-default" style={{animationDelay: '0.1s'}}>
                Plateforme Officielle
              </span>
              <span className="hover:text-white transition-colors animate-fade-in cursor-default" style={{animationDelay: '0.2s'}}>
                Sécurisé et Confidentiel
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* MTeFoP 2025 Footer */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
          <span className="font-bold text-lg bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-fade-in">
            MTeFoP 2025
          </span>
        </div>
      </div>
    </div>
  );
};

export default Index;
