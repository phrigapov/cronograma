import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CronogramaState, TimelineData, Project, Feature } from '@/types/cronograma';

export const useCronogramaStore = create<CronogramaState>()(
  persist(
    (set, get) => ({
      data: null,
      
      setData: (data: TimelineData) => {
        set({ data });
        // Salvar no servidor
        if (typeof window !== 'undefined') {
          fetch('/api/cronograma', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }).catch(console.error);
        }
      },
      
      addProject: (project: Project) => {
        set((state) => ({
          data: state.data
            ? { ...state.data, projects: [...state.data.projects, project] }
            : null,
        }));
        const newData = get().data;
        if (newData) get().setData(newData);
      },
      
      updateProject: (id: string, updates: Partial<Project>) => {
        set((state) => ({
          data: state.data
            ? {
                ...state.data,
                projects: state.data.projects.map((p) =>
                  p.id === id ? { ...p, ...updates } : p
                ),
              }
            : null,
        }));
        const newData = get().data;
        if (newData) get().setData(newData);
      },
      
      deleteProject: (id: string) => {
        set((state) => ({
          data: state.data
            ? {
                ...state.data,
                projects: state.data.projects.filter((p) => p.id !== id),
              }
            : null,
        }));
        const newData = get().data;
        if (newData) get().setData(newData);
      },
      
      addFeature: (projectId: string, phaseId: string, feature: Feature) => {
        set((state) => ({
          data: state.data
            ? {
                ...state.data,
                projects: state.data.projects.map((project) =>
                  project.id === projectId
                    ? {
                        ...project,
                        phases: project.phases.map((phase) =>
                          phase.id === phaseId
                            ? { ...phase, features: [...phase.features, feature] }
                            : phase
                        ),
                      }
                    : project
                ),
              }
            : null,
        }));
        const newData = get().data;
        if (newData) get().setData(newData);
      },
      
      updateFeature: (projectId: string, phaseId: string, featureId: string, updates: Partial<Feature>) => {
        set((state) => ({
          data: state.data
            ? {
                ...state.data,
                projects: state.data.projects.map((project) =>
                  project.id === projectId
                    ? {
                        ...project,
                        phases: project.phases.map((phase) =>
                          phase.id === phaseId
                            ? {
                                ...phase,
                                features: phase.features.map((feature) =>
                                  feature.id === featureId
                                    ? { ...feature, ...updates }
                                    : feature
                                ),
                              }
                            : phase
                        ),
                      }
                    : project
                ),
              }
            : null,
        }));
        const newData = get().data;
        if (newData) get().setData(newData);
      },
      
      deleteFeature: (projectId: string, phaseId: string, featureId: string) => {
        set((state) => ({
          data: state.data
            ? {
                ...state.data,
                projects: state.data.projects.map((project) =>
                  project.id === projectId
                    ? {
                        ...project,
                        phases: project.phases.map((phase) =>
                          phase.id === phaseId
                            ? {
                                ...phase,
                                features: phase.features.filter((f) => f.id !== featureId),
                              }
                            : phase
                        ),
                      }
                    : project
                ),
              }
            : null,
        }));
        const newData = get().data;
        if (newData) get().setData(newData);
      },
    }),
    {
      name: 'cronograma-storage',
    }
  )
);
