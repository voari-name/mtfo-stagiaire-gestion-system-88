
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import { InternData } from "@/types/intern";

interface InternCardProps {
  intern: InternData;
  onEdit: (intern: InternData) => void;
  onDelete: (internId: string) => void;
}

export const InternCard = ({ intern, onEdit, onDelete }: InternCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-102 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-4 mb-6">
              {intern.photo ? (
                <img 
                  src={intern.photo} 
                  alt={`${intern.firstName} ${intern.lastName}`}
                  className="h-16 w-16 rounded-full object-cover border-4 border-blue-200 shadow-md"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white text-xl font-bold shadow-md">
                  {intern.firstName.charAt(0)}{intern.lastName.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-bold text-xl text-gray-800">{intern.firstName} {intern.lastName}</h3>
                <p className="text-sm text-blue-600 font-medium">{intern.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-500 capitalize">{intern.gender || 'Non spécifié'}</p>
                  {intern.title && (
                    <>
                      <span className="text-gray-300">•</span>
                      <p className="text-xs text-gray-600 font-medium">{intern.title}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600 font-medium mb-2">Statut du stage</p>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold inline-block ${
                intern.status === 'En cours' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                intern.status === 'Terminé' ? 'bg-green-100 text-green-800 border border-green-200' :
                'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {intern.status}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 flex flex-col justify-center space-y-3 md:w-48">
            <Button 
              variant="outline"
              onClick={() => onEdit(intern)}
              className="border-blue-300 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 font-medium"
            >
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 font-medium">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action supprimera définitivement le stagiaire {intern.firstName} {intern.lastName}.
                    Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(intern.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
