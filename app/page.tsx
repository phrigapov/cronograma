'use client';

import TimelineView from '@/components/TimelineView';
import ProjectManager from '@/components/ProjectManager';
import ReportGenerator from '@/components/ReportGenerator';
import FeatureEditor from '@/components/FeatureEditor';
import DataInitializer from '@/components/DataInitializer';
import Tabs from '@/components/Tabs';
import { useCronogramaStore } from '@/store/cronogramaStore';
import { Calendar, LayoutGrid, FolderPlus, ListPlus, FileText } from 'lucide-react';

export default function Home() {
  const data = useCronogramaStore((state) => state.data);

  const tabs = [
    { id: 'cronograma', label: 'Cronograma', icon: <Calendar size={18} /> },
    { id: 'projetos', label: 'Gerenciar Projetos', icon: <FolderPlus size={18} /> },
    { id: 'features', label: 'Gerenciar Features', icon: <ListPlus size={18} /> },
    { id: 'relatorios', label: 'Relatórios', icon: <FileText size={18} /> },
  ];

  return (
    <DataInitializer>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <LayoutGrid size={32} className="text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Cronograma TE 2026
                </h1>
                <p className="text-sm text-gray-600">
                  Tecnologia e Inteligência Educacional - SME/SUPEB
                </p>
              </div>
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

              {/* Aba 2: Gerenciar Projetos */}
              <div className="p-6">
                <ProjectManager />
              </div>

              {/* Aba 3: Gerenciar Features */}
              <div className="p-6">
                <FeatureEditor />
              </div>

              {/* Aba 4: Relatórios */}
              <div className="p-6">
                <ReportGenerator />
              </div>
            </Tabs>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="container mx-auto px-6 py-4 text-center text-gray-600 text-sm">
            <p>© 2026 SME/SUPEB - Tecnologia e Inteligência Educacional</p>
          </div>
        </footer>
      </div>
    </DataInitializer>
  );
}
