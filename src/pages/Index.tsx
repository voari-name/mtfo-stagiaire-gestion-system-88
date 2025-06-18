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
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Header with MTFoP Banner */}
      <div className="w-full bg-gradient-to-r from-red-600 via-white to-green-600 p-4 shadow-md animate-fade-in">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gold animate-slide-in-left">
            <p className="text-sm text-gold font-semibold">REPOBLIKAN'I MADAGASIKARA</p>
            <p className="text-sm text-gold font-light">Fitiavana - Tanindrazana - Fandrosoana</p>
          </div>
          <div className="flex justify-center my-4 md:my-0 animate-bounce-slow">
            <img 
              src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
              alt="MTFoP Logo" 
              className="h-24 w-auto hover-scale transition-transform duration-300 animate-pulse-slow"
            />
          </div>
          <div className="text-right animate-slide-in-right">
            <p className="text-md font-semibold text-green-800">Ministère du Travail, de l'Emploi</p>
            <p className="text-md font-semibold text-green-800">et de la Fonction Publique</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
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
            <div className="flex space-x-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Button 
                onClick={handleLogin}
                className="bg-blue-800 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-2 rounded-md hover-scale transition-all duration-300 animate-pulse-button"
              >
                Se connecter
              </Button>
              <Dialog open={showMTEFoPInfo} onOpenChange={setShowMTEFoPInfo}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 hover-scale transition-all duration-300">
                    En savoir plus
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto animate-scale-in border-2 border-blue-200 dark:border-blue-700 shadow-2xl">
                  <DialogHeader className="relative pb-4 border-b border-blue-100 dark:border-blue-800">
                    <DialogClose asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute right-0 top-0 hover:bg-red-50 hover:text-red-600 transition-colors duration-300 animate-fade-in"
                        onClick={() => setShowMTEFoPInfo(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </DialogClose>
                    <div className="flex items-center gap-4 animate-fade-in-up">
                      <img 
                        src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
                        alt="MTFoP Logo" 
                        className="h-16 w-auto animate-float"
                      />
                      <DialogTitle className="text-3xl font-bold text-blue-900 dark:text-blue-400 animate-gradient-text">
                        Ministère du Travail, de l'Emploi et de la Fonction Publique (MTFoP)
                      </DialogTitle>
                    </div>
                  </DialogHeader>
                  
                  <div className="space-y-8 py-6">
                    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950 dark:to-transparent">
                        <CardTitle className="text-blue-800 dark:text-blue-400 flex items-center gap-2">
                          <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                          Historique et Fondation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Créé après l'indépendance de Madagascar, le MTFoP est l'institution gouvernementale chargée de la mise en œuvre 
                          de la politique nationale en matière de Fonction Publique, d'Emploi, de Travail, de Formation professionnelle 
                          et de Lois sociales. Il constitue un pilier essentiel du développement socio-économique du pays.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500" style={{animationDelay: '0.2s'}}>
                      <CardHeader className="bg-gradient-to-r from-green-50 to-transparent dark:from-green-950 dark:to-transparent">
                        <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
                          <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                          Missions Principales
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="list-none space-y-3">
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 dark:text-gray-300">Élaborer et appliquer la politique nationale dans les domaines du travail, de l'emploi et de la fonction publique</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 dark:text-gray-300">Garantir les droits fondamentaux des travailleurs et renforcer leur sécurité sociale</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 dark:text-gray-300">Réformer et moderniser la Fonction Publique pour plus d'efficacité et de transparence</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 dark:text-gray-300">Favoriser l'employabilité des jeunes, des personnes vulnérables et la professionnalisation des métiers</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 dark:text-gray-300">Contrôler le respect des lois en matière de gestion des ressources humaines de l'État</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500" style={{animationDelay: '0.4s'}}>
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950 dark:to-transparent">
                        <CardTitle className="text-purple-800 dark:text-purple-400 flex items-center gap-2">
                          <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                          Organisation Administrative
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 className="font-semibold text-purple-700 dark:text-purple-400">Le Ministre</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Dirige la politique générale du ministère</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 className="font-semibold text-purple-700 dark:text-purple-400">Secrétariat Général</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Coordonne les directions centrales et régionales</p>
                          </div>
                          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <h4 className="font-semibold text-purple-700 dark:text-purple-400">Cabinet du Ministre</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Conseille et appuie politiquement le Ministre</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500" style={{animationDelay: '0.6s'}}>
                      <CardHeader className="bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-950 dark:to-transparent">
                        <CardTitle className="text-amber-800 dark:text-amber-400 flex items-center gap-2">
                          <span className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                          Directions Générales
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div className="p-4 border border-amber-200 dark:border-amber-800 rounded-lg">
                            <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Direction Générale du Travail</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Gère la législation du travail, la sécurité sociale, le travail décent et la migration professionnelle</p>
                          </div>
                          <div className="p-4 border border-amber-200 dark:border-amber-800 rounded-lg">
                            <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Direction Générale de la Fonction Publique</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Supervise la gestion des ressources humaines de l'État, l'éthique, la formation et les réformes</p>
                          </div>
                          <div className="p-4 border border-amber-200 dark:border-amber-800 rounded-lg">
                            <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Direction Générale de la Promotion de l'Emploi</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Développe l'insertion professionnelle, la formation continue et l'auto-emploi</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="animate-fade-in hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500" style={{animationDelay: '0.8s'}}>
                      <CardHeader className="bg-gradient-to-r from-red-50 to-transparent dark:from-red-950 dark:to-transparent">
                        <CardTitle className="text-red-800 dark:text-red-400 flex items-center gap-2">
                          <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                          Établissements sous Tutelle
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            { name: "ENAM", full: "École Nationale d'Administration de Madagascar" },
                            { name: "INFA", full: "Institut National de Formation Administrative" },
                            { name: "CNaPS", full: "Caisse Nationale de Prévoyance Sociale" },
                            { name: "INTra", full: "Institut National du Travail" },
                            { name: "ONEF", full: "Office National de l'Emploi et de la Formation" }
                          ].map((org, index) => (
                            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                              <h4 className="font-bold text-red-700 dark:text-red-400">{org.name}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{org.full}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-400 italic animate-fade-in">
                        "Ensemble, construisons un avenir professionnel meilleur pour Madagascar"
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="relative animate-float">
              <img 
                src="/lovable-uploads/85fb290d-d5c9-45d9-a72b-b63c11346cfa.png" 
                alt="MTFoP Header" 
                className="w-full h-auto rounded-lg shadow-lg hover-scale transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

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

          <h2 className="text-2xl font-bold text-center text-blue-900 dark:text-blue-400 mb-8 animate-fade-in">À propos du MTFoP</h2>
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

      {/* Footer MTFoP 2025 */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950 py-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
                alt="MTFoP Logo" 
                className="h-12 w-auto animate-pulse-slow hover-scale transition-transform duration-300"
              />
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 animate-gradient-text drop-shadow-lg">
                  MTFoP 2025
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
    </div>
  );
};

export default Index;
