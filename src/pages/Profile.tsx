
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    lastName: "RAHAJANIAINA",
    firstName: "Olivier",
    email: "olivierrahajaniaina9@gmail.com",
    phone: "+261 34 00 000 00",
    position: "Administrateur"
  });

  const [displaySettings, setDisplaySettings] = useState({
    darkMode: false,
    standbyMode: false,
    brightness: [50],
    language: "fr"
  });

  const languages = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "mg", label: "Malagasy" }
  ];
  
  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences d'affichage ont été enregistrées.",
    });
  };

  const handlePhotoChange = () => {
    toast({
      title: "Photo mise à jour",
      description: "Votre photo de profil a été changée avec succès.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <MainLayout title="Mon profil" currentPage="profile" username="RAHAJANIAINA Olivier">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        <div className="md:col-span-1">
          <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800">Photo de profil</CardTitle>
              <CardDescription>Cette photo sera visible par les autres utilisateurs</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src="/lovable-uploads/d23d8c4c-1324-4c58-9904-d37fd7d53be4.png"
                  alt="Profile Photo"
                  className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg hover-scale transition-all duration-300"
                />
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 hover-scale transition-all duration-300"
                  onClick={handlePhotoChange}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                  <span className="sr-only">Edit</span>
                </Button>
              </div>
              <div className="text-center">
                <h3 className="font-medium">RAHAJANIAINA Olivier</h3>
                <p className="text-sm text-muted-foreground">Administrateur</p>
              </div>
              <Button 
                variant="outline" 
                className="w-full hover-scale transition-all duration-300"
                onClick={handlePhotoChange}
              >
                Changer la photo
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <CardTitle className="text-blue-800">Informations personnelles</CardTitle>
              <CardDescription>Gérez vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Poste</Label>
                  <Input
                    id="position"
                    name="position"
                    value={profileData.position}
                    onChange={handleInputChange}
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={handleSaveProfile}
                  className="hover-scale transition-all duration-300"
                >
                  Enregistrer les modifications
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <CardTitle className="text-blue-800">Préférences d'affichage</CardTitle>
              <CardDescription>Gérez l'apparence de l'application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">Mode sombre</Label>
                  <Switch 
                    id="darkMode" 
                    checked={displaySettings.darkMode}
                    onCheckedChange={(checked) => setDisplaySettings({...displaySettings, darkMode: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="standbyMode">Mode veille</Label>
                  <Switch 
                    id="standbyMode" 
                    checked={displaySettings.standbyMode}
                    onCheckedChange={(checked) => setDisplaySettings({...displaySettings, standbyMode: checked})}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="brightness">Luminosité</Label>
                    <span className="text-sm text-muted-foreground">{displaySettings.brightness[0]}%</span>
                  </div>
                  <Slider
                    id="brightness"
                    min={10}
                    max={100}
                    step={1}
                    value={displaySettings.brightness}
                    onValueChange={(value) => setDisplaySettings({...displaySettings, brightness: value})}
                    className="transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Langue de l'application</Label>
                  <Select 
                    value={displaySettings.language} 
                    onValueChange={(value) => setDisplaySettings({...displaySettings, language: value})}
                  >
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
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={handleSaveSettings}
                  className="hover-scale transition-all duration-300"
                >
                  Enregistrer les paramètres
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
