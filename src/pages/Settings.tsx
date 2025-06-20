
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/contexts/SettingsContext";

const Settings = () => {
  const { 
    darkMode, 
    standbyMode, 
    brightness, 
    language, 
    setDarkMode, 
    setStandbyMode, 
    setBrightness, 
    setLanguage,
    translations 
  } = useSettings();

  useEffect(() => {
    if (standbyMode) {
      // Activer le mode veille après 5 secondes d'inactivité pour la démonstration
      let standbyTimer: NodeJS.Timeout;
      
      const resetTimer = () => {
        clearTimeout(standbyTimer);
        document.body.style.filter = 'none';
        document.body.style.opacity = '1';
        
        standbyTimer = setTimeout(() => {
          document.body.style.filter = 'blur(2px) brightness(0.3)';
          document.body.style.opacity = '0.7';
          document.body.style.transition = 'all 0.5s ease';
        }, 5000);
      };

      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      
      events.forEach(event => {
        document.addEventListener(event, resetTimer, true);
      });

      resetTimer();

      return () => {
        clearTimeout(standbyTimer);
        events.forEach(event => {
          document.removeEventListener(event, resetTimer, true);
        });
        document.body.style.filter = 'none';
        document.body.style.opacity = '1';
      };
    } else {
      document.body.style.filter = 'none';
      document.body.style.opacity = '1';
    }
  }, [standbyMode]);

  const languages = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "mg", label: "Malagasy" }
  ];

  return (
    <MainLayout title={translations["Paramètres"]} currentPage="settings" username="RAHAJANIAINA Olivier">
      <div className="space-y-6 animate-fade-in">
        <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-blue-800">{translations["Préférences d'affichage"]}</CardTitle>
            <CardDescription>Gérez l'apparence de l'application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mode">{translations["Mode sombre"]}</Label>
                  <Switch 
                    id="mode" 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="standby">{translations["Mode veille"]}</Label>
                  <Switch 
                    id="standby" 
                    checked={standbyMode}
                    onCheckedChange={setStandbyMode}
                  />
                </div>
                {standbyMode && (
                  <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                    Mode veille activé : l'écran se mettra en veille après 5 secondes d'inactivité
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="brightness">{translations["Luminosité"]}</Label>
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
              <Label htmlFor="language">{translations["Langue de l'application"]}</Label>
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
      </div>
    </MainLayout>
  );
};

export default Settings;
