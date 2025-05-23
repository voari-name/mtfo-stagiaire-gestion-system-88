
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [brightness, setBrightness] = useState([50]);
  const [darkMode, setDarkMode] = useState(false);
  const [standbyMode, setStandbyMode] = useState(false);
  const [language, setLanguage] = useState("fr");
  
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres mis à jour",
      description: "Vos préférences ont été enregistrées avec succès."
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportation des données",
      description: "Vos données sont en cours d'exportation. Vous recevrez un email lorsque l'exportation sera terminée."
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès.",
        variant: "destructive"
      });
    }
  };

  const languages = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "mg", label: "Malagasy" }
  ];

  return (
    <MainLayout title="Paramètres" currentPage="settings" username="RAHAJANIAINA Olivier">
      <div className="space-y-6 animate-fade-in">
        <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-blue-800">Préférences d'affichage</CardTitle>
            <CardDescription>Gérez l'apparence de l'application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mode">Mode sombre</Label>
                  <Switch 
                    id="mode" 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="standby">Mode veille</Label>
                  <Switch 
                    id="standby" 
                    checked={standbyMode}
                    onCheckedChange={setStandbyMode}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="brightness">Luminosité</Label>
                    <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
                  </div>
                  <Slider
                    id="brightness"
                    min={10}
                    max={100}
                    step={1}
                    value={brightness}
                    onValueChange={setBrightness}
                    className="transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardHeader>
            <CardTitle className="text-blue-800">Langue</CardTitle>
            <CardDescription>Choisissez votre langue préférée</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue de l'application</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full transition-all duration-300 focus:scale-105">
                  <SelectValue placeholder="Sélectionnez une langue" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Cette option modifie la langue de l'interface utilisateur. Toutes les données existantes resteront inchangées.
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardHeader>
            <CardTitle className="text-blue-800">Exportation de données</CardTitle>
            <CardDescription>Téléchargez ou supprimez vos données</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                onClick={handleExportData}
                className="hover-scale transition-all duration-300"
              >
                Exporter mes données
              </Button>
              <Button 
                variant="outline" 
                className="text-red-600 border-red-600 hover:bg-red-50 hover-scale transition-all duration-300"
                onClick={handleDeleteAccount}
              >
                Supprimer mon compte
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end animate-fade-in" style={{animationDelay: '0.6s'}}>
          <Button 
            onClick={handleSaveSettings}
            className="hover-scale transition-all duration-300"
          >
            Enregistrer les paramètres
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
