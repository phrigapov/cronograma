'use client';

import TimelineView from '@/components/TimelineView';
import InfrastructureView from '@/components/InfrastructureView';
import GitHubTasksView from '@/components/GitHubTasksView';
import ReportGenerator from '@/components/ReportGenerator';
import FeatureEditor from '@/components/FeatureEditor';
import DataInitializer from '@/components/DataInitializer';
import Tabs from '@/components/Tabs';
import ThemeToggle from '@/components/ThemeToggle';
import { useCronogramaStore } from '@/store/cronogramaStore';
import { Calendar, LayoutGrid, ListPlus, FileText, Server, Github } from 'lucide-react';

export default function Home() {
  const data = useCronogramaStore((state) => state.data);

  const tabs = [
    { id: 'cronograma', label: 'Planejamento 2026', description: 'Cronograma', icon: <Calendar size={18} /> },
    { id: 'github', label: 'Tarefas', description: 'Em execução', icon: <Github size={18} /> },
    { id: 'infraestrutura', label: 'Infraestrutura', icon: <Server size={18} /> },
    { id: 'features', label: 'Gerenciar Features', icon: <ListPlus size={18} /> },
    { id: 'relatorios', label: 'Relatórios', icon: <FileText size={18} /> },
  ];

  return (
    <DataInitializer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LayoutGrid size={32} className="text-blue-600 dark:text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Cronograma TE 2026
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tecnologia e Inteligência Educacional - SME/SUPEB
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {data && (
            <Tabs tabs={tabs}>
              {/* Aba 1: Cronograma */}
              <div className="p-6">
                <TimelineView />
              </div>

              {/* Aba 2: Tarefas GitHub */}
              <div className="p-6">
                <GitHubTasksView />
              </div>

              {/* Aba 3: Infraestrutura */}
              <div className="p-6">
                <InfrastructureView />
              </div>

              {/* Aba 4: Gerenciar Features */}
              <div className="p-6">
                <FeatureEditor />
              </div>

              {/* Aba 5: Relatórios */}
              <div className="p-6">
                <ReportGenerator />
              </div>
            </Tabs>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="container mx-auto px-6 py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>© 2026 SME/SUPEB - Tecnologia e Inteligência Educacional</p>
          </div>
        </footer>
      </div>
    </DataInitializer>
  );
}
