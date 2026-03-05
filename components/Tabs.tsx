'use client';

import { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  children: ReactNode[];
}

export default function Tabs({ tabs, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="bg-white dark:bg-gray-800 rounded-t-lg shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`
                flex items-center gap-2 px-6 py-4 font-semibold text-sm
                transition-all duration-200 border-b-2
                ${
                  activeTab === index
                    ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-600 dark:text-gray-300 border-transparent hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }
              `}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <div className="flex flex-col items-start">
                <span className="whitespace-pre-line text-center">{tab.label}</span>
                {tab.description && (
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                    {tab.description}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg">
        {children[activeTab]}
      </div>
    </div>
  );
}
