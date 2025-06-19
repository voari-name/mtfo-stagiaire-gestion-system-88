
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Users, BookOpen, Award, TrendingUp, Calendar, MapPin } from "lucide-react";
import { useInternsData } from "@/hooks/useInternsData";
import { useProjectsData } from "@/hooks/useProjectsData";

const Statistics = () => {
  const { interns, loading: internsLoading } = useInternsData();
  const { projects, loading: projectsLoading } = useProjectsData();
  
  const [stats, setStats] = useState({
    totalInterns: 0,
    activeInterns: 0,
    completedInterns: 0,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0
  });

  const [chartData, setChartData] = useState({
    internsByStatus: [],
    projectsByMonth: [],
    internsByGender: []
  });

  useEffect(() => {
    if (!internsLoading && !projectsLoading) {
      // Calculate basic statistics
      const totalInterns = interns.length;
      const activeInterns = interns.filter(intern => intern.status === "en cours").length;
      const completedInterns = interns.filter(intern => intern.status === "terminé").length;
      const totalProjects = projects.length;
      const activeProjects = projects.filter(project => 
        project.interns.some(intern => intern.status === "en cours")
      ).length;
      const completedProjects = projects.filter(project => 
        project.interns.every(intern => intern.status === "fin")
      ).length;

      setStats({
        totalInterns,
        activeInterns,
        completedInterns,
        totalProjects,
        activeProjects,
        completedProjects
      });

      // Prepare chart data
      const statusData = [
        { name: "À commencer", value: interns.filter(intern => intern.status === "début").length, color: "#f59e0b" },
        { name: "En cours", value: activeInterns, color: "#3b82f6" },
        { name: "Terminés", value: completedInterns, color: "#10b981" }
      ];

      const monthlyData = projects.reduce((acc: any[], project) => {
        const startMonth = new Date(project.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
        const existing = acc.find(item => item.month === startMonth);
        if (existing) {
          existing.projets += 1;
        } else {
          acc.push({ month: startMonth, projets: 1 });
        }
        return acc;
      }, []);

      setChartData({
        internsByStatus: statusData,
        projectsByMonth: monthlyData,
        internsByGender: []
      });
    }
  }, [interns, projects, internsLoading, projectsLoading]);

  if (internsLoading || projectsLoading) {
    return (
      <MainLayout title="Statistiques" currentPage="statistics">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des statistiques...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Statistiques" currentPage="statistics">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Tableau de Bord MTeFoP</h2>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date().toLocaleDateString('fr-FR')}
          </Badge>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stagiaires</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInterns}</div>
              <p className="text-xs text-blue-100">
                +{stats.activeInterns} actifs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stages Terminés</CardTitle>
              <Award className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedInterns}</div>
              <p className="text-xs text-green-100">
                {stats.totalInterns > 0 ? Math.round((stats.completedInterns / stats.totalInterns) * 100) : 0}% du total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projets Actifs</CardTitle>
              <BookOpen className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProjects}</div>
              <p className="text-xs text-purple-100">
                sur {stats.totalProjects} projets
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Répartition des Stagiaires par Statut
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.internsByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.internsByStatus.map((entry: any, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {chartData.internsByStatus.map((entry: any, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                      <span className="text-sm">{entry.name}</span>
                    </div>
                    <span className="font-medium">{entry.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Évolution des Projets par Mois</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.projectsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="projets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Stagiaires Récents</CardTitle>
              <CardDescription>Les derniers stagiaires ajoutés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interns.slice(0, 5).map((intern, index) => (
                  <div key={intern.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                        {intern.firstName.charAt(0)}{intern.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{intern.firstName} {intern.lastName}</p>
                        <p className="text-sm text-gray-600">{intern.email}</p>
                      </div>
                    </div>
                    <Badge variant={
                      intern.status === 'en cours' ? 'default' :
                      intern.status === 'terminé' ? 'secondary' : 'outline'
                    }>
                      {intern.status === 'en cours' ? 'En cours' : 
                       intern.status === 'terminé' ? 'Terminé' : 'À commencer'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projets en Cours</CardTitle>
              <CardDescription>Suivi des projets actifs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.slice(0, 5).map((project, index) => (
                  <div key={project.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{project.title}</h4>
                      <Badge variant="outline">{project.interns.length} stagiaire(s)</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progression</span>
                        <span>{project.tasks.length > 0 ? Math.round((project.tasks.filter((t: any) => t.status === 'completed').length / project.tasks.length) * 100) : 0}%</span>
                      </div>
                      <Progress 
                        value={project.tasks.length > 0 ? Math.round((project.tasks.filter((t: any) => t.status === 'completed').length / project.tasks.length) * 100) : 0} 
                        className="h-2" 
                      />
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

export default Statistics;
