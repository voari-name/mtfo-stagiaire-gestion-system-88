
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  // Sample statistics for dashboard
  const stats = [
    { title: "Stagiaires actifs", value: 12, change: "+2", iconColor: "text-blue-500" },
    { title: "Projets en cours", value: 5, change: "+1", iconColor: "text-green-500" },
    { title: "Évaluations à faire", value: 8, change: "-3", iconColor: "text-amber-500" },
    { title: "Projets terminés", value: 24, change: "+4", iconColor: "text-purple-500" },
  ];

  // Sample recent activities
  const activities = [
    { name: "Rakoto Jean", action: "a commencé un stage", date: "aujourd'hui", time: "09:15", status: "début" },
    { name: "Razafy Marie", action: "a terminé son évaluation", date: "hier", time: "14:30", status: "fin" },
    { name: "Randria Hery", action: "a été assigné au projet Alpha", date: "il y a 2 jours", time: "10:00", status: "en cours" },
  ];

  // Sample upcoming deadlines
  const deadlines = [
    { project: "Projet Alpha", deadline: "15 juin 2025", daysLeft: 5, completion: 75 },
    { project: "Analyse de données", deadline: "22 juin 2025", daysLeft: 12, completion: 40 },
    { project: "Développement frontend", deadline: "30 juin 2025", daysLeft: 20, completion: 25 },
  ];

  return (
    <MainLayout title="Tableau de bord" currentPage="dashboard">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className={`flex items-center ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                      {activity.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{activity.name}</span> {activity.action}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <span>{activity.date} à {activity.time}</span>
                        <span className="mx-2">•</span>
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs font-medium
                          ${activity.status === 'début' ? 'bg-blue-100 text-blue-800' : 
                            activity.status === 'fin' ? 'bg-green-100 text-green-800' : 
                            'bg-amber-100 text-amber-800'}
                        `}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Échéances à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deadlines.map((deadline, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{deadline.project}</span>
                      <span className="text-sm">{deadline.deadline}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${deadline.completion}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{deadline.completion}% complété</span>
                      <span className={deadline.daysLeft < 7 ? 'text-red-600 font-medium' : ''}>
                        {deadline.daysLeft} jours restants
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
