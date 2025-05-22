
import { useState, ReactNode } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type MainLayoutProps = {
  children: ReactNode;
  title: string;
  currentPage?: string;
};

const MainLayout = ({ children, title, currentPage = "dashboard" }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!",
    });
    navigate("/");
  };

  const menuItems = [
    { name: "Tableau de bord", path: "/dashboard", icon: "menu" },
    { name: "Profil", path: "/profile", icon: "user" },
    { name: "Stage", path: "/internships", icon: "file" },
    { name: "Évaluation", path: "/evaluations", icon: "edit" },
    { name: "Projet", path: "/projects", icon: "image" },
    { name: "Paramètres", path: "/settings", icon: "settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-blue-900 text-white transition-all duration-300 ease-in-out flex flex-col",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex justify-center items-center p-4 border-b border-blue-800">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
                alt="MTFoP Logo" 
                className="h-10 w-auto" 
              />
              <span className="font-bold">MTEFoP</span>
            </div>
          ) : (
            <img 
              src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
              alt="MTFoP Logo" 
              className="h-8 w-auto" 
            />
          )}
        </div>
        
        <div className="flex flex-col flex-1 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-3 px-4 transition-colors",
                currentPage === item.path.substring(1) 
                  ? "bg-blue-800 border-l-4 border-white" 
                  : "hover:bg-blue-800"
              )}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={cn(sidebarOpen ? "mr-3" : "mx-auto")}
              >
                {item.icon === "user" && (
                  <>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </>
                )}
                {item.icon === "menu" && (
                  <>
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </>
                )}
                {item.icon === "file" && (
                  <>
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </>
                )}
                {item.icon === "edit" && (
                  <>
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </>
                )}
                {item.icon === "image" && (
                  <>
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </>
                )}
                {item.icon === "settings" && (
                  <>
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
        
        <div className="mt-auto border-t border-blue-800 p-4">
          <Button 
            variant="ghost" 
            className={cn(
              "text-white hover:bg-blue-800 w-full justify-start",
              !sidebarOpen && "justify-center px-0"
            )}
            onClick={handleLogout}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={cn(sidebarOpen ? "mr-3" : "")}
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {sidebarOpen && "Déconnexion"}
          </Button>
        </div>
        
        <div className="p-4 border-t border-blue-800">
          <Button 
            variant="ghost" 
            size="icon"
            className="w-full text-white hover:bg-blue-800 flex justify-center"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {sidebarOpen ? (
                <>
                  <path d="m15 18-6-6 6-6" />
                </>
              ) : (
                <>
                  <path d="m9 18 6-6-6-6" />
                </>
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bienvenue, RAHAJANIAINA Olivier</span>
              <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center text-white text-sm">
                RO
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
