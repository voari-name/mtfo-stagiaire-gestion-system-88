
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfilePhotoUploadProps {
  currentPhoto: string;
  onPhotoChange: (newPhoto: string) => void;
}

const ProfilePhotoUpload = ({ currentPhoto, onPhotoChange }: ProfilePhotoUploadProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onPhotoChange(result);
        setIsEditing(false);
        toast({
          title: "Photo mise à jour",
          description: "Votre photo de profil a été changée avec succès.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <img
          src={currentPhoto}
          alt="Profile Photo"
          className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg hover-scale transition-all duration-300"
        />
        <Button
          size="sm"
          className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 hover-scale transition-all duration-300"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Camera className="w-4 h-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </div>
      
      {isEditing && (
        <div className="space-y-2">
          <Label htmlFor="photo-upload">Sélectionner une nouvelle photo</Label>
          <Input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(false)}
            className="w-full"
          >
            Annuler
          </Button>
        </div>
      )}
      
      {!isEditing && (
        <Button 
          variant="outline" 
          className="w-full hover-scale transition-all duration-300"
          onClick={() => setIsEditing(true)}
        >
          Changer la photo
        </Button>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;
