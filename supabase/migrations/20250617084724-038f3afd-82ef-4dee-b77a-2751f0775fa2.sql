
-- Créer la table des stagiaires
CREATE TABLE public.interns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'début',
  completion INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table des projets
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table des tâches
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not-started',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table de liaison entre projets et stagiaires
CREATE TABLE public.project_interns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  intern_id UUID REFERENCES public.interns(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, intern_id)
);

-- Activer Row Level Security (RLS) pour toutes les tables
ALTER TABLE public.interns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_interns ENABLE ROW LEVEL SECURITY;

-- Créer des politiques RLS permissives pour permettre toutes les opérations
-- (Pour l'instant, nous permettons tout accès. Plus tard, vous pourrez restreindre selon vos besoins)
CREATE POLICY "Allow all operations on interns" ON public.interns FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on project_interns" ON public.project_interns FOR ALL USING (true) WITH CHECK (true);

-- Insérer les données par défaut des stagiaires
INSERT INTO public.interns (first_name, last_name, email, title, start_date, end_date, status, completion) VALUES
('Jean', 'Rakoto', 'jean.rakoto@example.com', 'Développement Web', '2025-03-01', '2025-06-01', 'en cours', 65),
('Marie', 'Razafy', 'marie.razafy@example.com', 'Gestion de Projet', '2025-02-15', '2025-05-15', 'en cours', 45),
('Hery', 'Randriamaro', 'hery.r@example.com', 'Analyse de données', '2025-01-10', '2025-04-10', 'fin', 100);

-- Insérer les données par défaut des projets
INSERT INTO public.projects (title, start_date, end_date, description) VALUES
('Développement Web', '2025-03-01', '2025-06-01', 'Projet de développement d''une application web'),
('Gestion de Projet', '2025-02-15', '2025-05-15', 'Projet de gestion et suivi de projet'),
('Analyse de données', '2025-01-10', '2025-04-10', 'Projet d''analyse et visualisation de données');

-- Créer les tâches pour chaque projet
INSERT INTO public.tasks (project_id, name, status) VALUES
-- Tâches pour le projet Développement Web
((SELECT id FROM public.projects WHERE title = 'Développement Web'), 'Conception de la base de données', 'completed'),
((SELECT id FROM public.projects WHERE title = 'Développement Web'), 'Développement Frontend', 'in-progress'),
((SELECT id FROM public.projects WHERE title = 'Développement Web'), 'Intégration API', 'not-started'),

-- Tâches pour le projet Gestion de Projet
((SELECT id FROM public.projects WHERE title = 'Gestion de Projet'), 'Analyse des besoins', 'completed'),
((SELECT id FROM public.projects WHERE title = 'Gestion de Projet'), 'Planification', 'completed'),
((SELECT id FROM public.projects WHERE title = 'Gestion de Projet'), 'Suivi du projet', 'in-progress'),

-- Tâches pour le projet Analyse de données
((SELECT id FROM public.projects WHERE title = 'Analyse de données'), 'Collecte des données', 'completed'),
((SELECT id FROM public.projects WHERE title = 'Analyse de données'), 'Nettoyage des données', 'completed'),
((SELECT id FROM public.projects WHERE title = 'Analyse de données'), 'Analyse et visualisation', 'completed');

-- Associer les stagiaires aux projets
INSERT INTO public.project_interns (project_id, intern_id) VALUES
((SELECT id FROM public.projects WHERE title = 'Développement Web'), (SELECT id FROM public.interns WHERE email = 'jean.rakoto@example.com')),
((SELECT id FROM public.projects WHERE title = 'Gestion de Projet'), (SELECT id FROM public.interns WHERE email = 'marie.razafy@example.com')),
((SELECT id FROM public.projects WHERE title = 'Analyse de données'), (SELECT id FROM public.interns WHERE email = 'hery.r@example.com'));
