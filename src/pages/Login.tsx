
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isResetMode, setIsResetMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        console.log("Erreur de connexion:", error);
        if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
          setError("Email ou mot de passe incorrect. Vérifiez vos identifiants.");
        } else if (error.message.includes('Email not confirmed')) {
          setError("Veuillez confirmer votre email avant de vous connecter.");
        } else {
          setError(`Erreur: ${error.message}`);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        console.log("Connexion réussie:", data.user);
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur la plateforme de gestion MTFoP",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Une erreur est survenue lors de la connexion");
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe",
      });
      setIsResetMode(false);
      setEmail("");
      setLoading(false);
    } catch (error) {
      setError("Une erreur est survenue");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Banner MTFoP */}
      <div className="w-full bg-gradient-to-r from-red-600 via-white to-green-600 p-3 shadow-lg animate-fade-in">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gold font-semibold">REPOBLIKAN'I MADAGASIKARA</p>
          </div>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
              alt="MTFoP Logo" 
              className="h-16 w-auto animate-scale-in"
            />
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-green-800">MTFoP</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="absolute top-20 left-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover-scale transition-all duration-300 animate-slide-in-right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Retour à l'accueil
          </Button>
        </div>
        
        <Card className="w-full max-w-md mx-4 shadow-2xl border-t-4 border-t-blue-800 animate-scale-in">
          <CardHeader className="space-y-1 flex items-center flex-col">
            <div className="flex justify-center mb-4 animate-fade-in">
              <img 
                src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
                alt="MTFoP Logo" 
                className="h-16 w-auto hover-scale transition-transform duration-300"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center animate-fade-in">
              {isResetMode ? "Réinitialiser le mot de passe" : "Connexion"}
            </CardTitle>
            <CardDescription className="text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
              {isResetMode ? "Entrez votre email pour recevoir un lien de réinitialisation" : "Connectez-vous avec vos identifiants MTFoP"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={isResetMode ? handlePasswordReset : handleLogin}>
            <CardContent className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              {!isResetMode ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="olivierrahajaniaina9@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <button 
                        type="button"
                        onClick={() => setIsResetMode(true)}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Mot de passe oublié?
                      </button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
              )}
              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-md text-sm animate-fade-in border border-red-200">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Button 
                type="submit" 
                className="w-full bg-blue-800 hover:bg-blue-900 hover-scale transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Chargement..." : (isResetMode ? "Envoyer le lien" : "Se connecter")}
              </Button>
              {isResetMode && (
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setIsResetMode(false)}
                  className="w-full"
                >
                  Retour à la connexion
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
