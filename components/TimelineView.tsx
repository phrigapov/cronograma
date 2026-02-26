'use client';

import { useCronogramaStore } from '@/store/cronogramaStore';
import { MONTHS } from '@/types/cronograma';

export default function TimelineView() {
  const data = useCronogramaStore((state) => state.data);

  if (!data) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Nenhum cronograma carregado.</p>
        <p className="text-sm mt-2">Importe um arquivo CSV para começar.</p>
      </div>
    );
  }

  const getResponsibleColor = (responsible: string): string => {
    const colors: Record<string, string> = {
      dev: 'bg-blue-500',
      jonatas: 'bg-green-500',
      guga: 'bg-purple-500',
      te: 'bg-orange-500',
      autor: 'bg-pink-500',
    };
    return colors[responsible.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {/* Header com meses */}
        <div className="flex border-b-2 border-gray-300 mb-4 pb-2 sticky top-0 bg-white z-10">
          <div className="w-64 font-bold text-sm">Projeto / Fase / Feature</div>
          {data.months.map((month, idx) => (
            <div key={idx} className="flex-shrink-0" style={{ width: `${month.weeks * 80}px` }}>
              <div className="font-bold text-center text-sm bg-blue-50 py-2 rounded">
                {month.name}
              </div>
              <div className="flex">
                {Array.from({ length: month.weeks }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center text-xs text-gray-500 border-r border-gray-200"
                  >
                    S{i + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Projetos */}
        {data.projects.map((project) => (
          <div key={project.id} className="mb-6 border-l-4 border-blue-600 pl-2">
            <div className="font-bold text-lg text-blue-900 mb-2">{project.name}</div>
            {project.phases.map((phase) => (
              <div key={phase.id} className="mb-3 ml-4">
                <div className="font-semibold text-md text-gray-700 mb-1">{phase.name}</div>
                {phase.features.map((feature) => (
                  <div key={feature.id} className="flex items-center mb-1 hover:bg-gray-50 rounded">
                    <div className="w-64 text-sm text-gray-600 py-1 px-2 truncate" title={feature.name}>
                      {feature.name}
                    </div>
                    <div className="flex-1 flex">
                      {data.months.map((month) => (
                        <div
                          key={month.name}
                          className="flex"
                          style={{ width: `${month.weeks * 80}px` }}
                        >
                          {Array.from({ length: month.weeks }, (_, weekNum) => {
                            const assignment = feature.weeks.find(
                              (w) => w.month === month.name && w.weekNumber === weekNum + 1
                            );
                            return (
                              <div
                                key={weekNum}
                                className="flex-1 px-1 py-1"
                                style={{ width: '80px' }}
                              >
                                {assignment && (
                                  <div
                                    className={`${getResponsibleColor(assignment.responsible)} 
                                      text-white text-xs text-center py-1 rounded shadow-sm 
                                      hover:shadow-md transition-shadow cursor-pointer`}
                                    title={`${assignment.responsible} - ${month.name} S${weekNum + 1}`}
                                  >
                                    {assignment.responsible}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <h3 className="font-semibold mb-2 text-sm">Legenda:</h3>
        <div className="flex flex-wrap gap-3">
          {['dev', 'Jonatas', 'guga', 'TE', 'autor'].map((resp) => (
            <div key={resp} className="flex items-center gap-2">
              <div className={`${getResponsibleColor(resp)} w-4 h-4 rounded`}></div>
              <span className="text-sm capitalize">{resp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
