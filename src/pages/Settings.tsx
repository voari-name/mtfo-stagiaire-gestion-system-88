
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Settings = () => {
  // Form states
  const [brightness, setBrightness] = useState([50]);
  const [standbyTimeout, setStandbyTimeout] = useState([5]);
  const [darkMode, setDarkMode] = useState(false);
  const [standbyMode, setStandbyMode] = useState(false);
  const [language, setLanguage] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [newStagiaires, setNewStagiaires] = useState(false);
  const [pendingEvaluations, setPendingEvaluations] = useState(false);
  const [projectDeadlines, setProjectDeadlines] = useState(false);
  
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
    <MainLayout title="Paramètres" currentPage="settings">
      <div className="space-y-6">
        <Tabs defaultValue="display">
          <TabsList className="mb-6">
            <TabsTrigger value="display">Affichage</TabsTrigger>
            <TabsTrigger value="account">Compte</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences d'affichage</CardTitle>
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
                        <span className="text-sm text-muted-foreground">{brightness}%</span>
                      </div>
                      <Slider
                        id="brightness"
                        min={10}
                        max={100}
                        step={1}
                        value={brightness}
                        onValueChange={setBrightness}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="timeout">Délai de mise en veille (minutes)</Label>
                        <span className="text-sm text-muted-foreground">{standbyTimeout} min</span>
                      </div>
                      <Slider
                        id="timeout"
                        min={1}
                        max={30}
                        step={1}
                        value={standbyTimeout}
                        onValueChange={setStandbyTimeout}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Langue</CardTitle>
                <CardDescription>Choisissez votre langue préférée</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue de l'application</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full">
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
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
                <CardDescription>Gérez les informations liées à votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email-notifications" className="mb-2 block">Notifications par email</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                      <Label htmlFor="email-notifications" className="text-sm">Recevoir des notifications par email</Label>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="two-factor" className="mb-2 block">Authentification à deux facteurs</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="two-factor" 
                        checked={twoFactorAuth}
                        onCheckedChange={setTwoFactorAuth}
                      />
                      <Label htmlFor="two-factor" className="text-sm">Activer l'authentification à deux facteurs</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Exportation de données</CardTitle>
                <CardDescription>Téléchargez ou supprimez vos données</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" onClick={handleExportData}>Exporter mes données</Button>
                  <Button 
                    variant="outline" 
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={handleDeleteAccount}
                  >
                    Supprimer mon compte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notifications</CardTitle>
                <CardDescription>Configurez vos notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouveaux stagiaires</p>
                      <p className="text-sm text-muted-foreground">Recevoir une notification lorsqu'un nouveau stagiaire est ajouté</p>
                    </div>
                    <Switch 
                      checked={newStagiaires}
                      onCheckedChange={setNewStagiaires}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Évaluations en attente</p>
                      <p className="text-sm text-muted-foreground">Recevoir une notification pour les évaluations qui doivent être complétées</p>
                    </div>
                    <Switch 
                      checked={pendingEvaluations}
                      onCheckedChange={setPendingEvaluations}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Échéances des projets</p>
                      <p className="text-sm text-muted-foreground">Recevoir un rappel pour les projets dont l'échéance approche</p>
                    </div>
                    <Switch 
                      checked={projectDeadlines}
                      onCheckedChange={setProjectDeadlines}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>Enregistrer les paramètres</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
