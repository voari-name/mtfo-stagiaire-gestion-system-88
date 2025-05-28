
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/contexts/SettingsContext";

interface PersonalInfoData {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  position: string;
}

const PersonalInfoForm = () => {
  const { toast } = useToast();
  const { translations } = useSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<PersonalInfoData>({
    lastName: "RAHAJANIAINA",
    firstName: "Olivier",
    email: "olivierrahajaniaina9@gmail.com",
    phone: "038 51 621 07",
    position: "Administrateur"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      lastName: "RAHAJANIAINA",
      firstName: "Olivier",
      email: "olivierrahajaniaina9@gmail.com",
      phone: "038 51 621 07",
      position: "Administrateur"
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
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
            disabled={!isEditing}
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
          disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
            className="transition-all duration-300 focus:scale-105"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end space-x-2">
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)}
            className="hover-scale transition-all duration-300"
          >
            Modifier
          </Button>
        ) : (
          <>
            <Button 
              variant="outline"
              onClick={handleCancel}
              className="hover-scale transition-all duration-300"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSave}
              className="hover-scale transition-all duration-300"
            >
              Enregistrer les modifications
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
