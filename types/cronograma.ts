export interface Task {
  id: string;
  project: string;
  phase: string;
  feature: string;
  assignments: Record<string, string[]>; // mês -> [semanas]
  responsible: string;
}

export interface Project {
  id: string;
  name: string;
  phases: Phase[];
}

export interface Phase {
  id: string;
  name: string;
  features: Feature[];
}

export interface Feature {
  id: string;
  name: string;
  weeks: WeekAssignment[];
}

export interface WeekAssignment {
  month: string;
  weekNumber: number;
  responsible: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
}

export interface TimelineData {
  months: Month[];
  projects: Project[];
}

export interface Month {
  name: string;
  weeks: number;
}

export const MONTHS = [
  'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export interface CronogramaState {
  data: TimelineData | null;
  setData: (data: TimelineData) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addFeature: (projectId: string, phaseId: string, feature: Feature) => void;
  updateFeature: (projectId: string, phaseId: string, featureId: string, feature: Partial<Feature>) => void;
  deleteFeature: (projectId: string, phaseId: string, featureId: string) => void;
}
