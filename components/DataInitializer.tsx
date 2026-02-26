'use client';

import { useEffect, useState } from 'react';
import { useCronogramaStore } from '@/store/cronogramaStore';
import { parseCSV } from '@/lib/csvParser';

export default function DataInitializer({ children }: { children: React.ReactNode }) {
  const { data, setData } = useCronogramaStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeData() {
      try {
        // Tentar carregar dados salvos do servidor
        const savedResponse = await fetch('/api/cronograma');
        
        if (savedResponse.ok) {
          const savedData = await savedResponse.json();
          
          // Verifica se há dados válidos (não apenas { data: null })
          if (savedData && savedData.data && savedData.data.projects) {
            setData(savedData.data);
            setLoading(false);
            return;
          }
        }

        // Se não houver dados salvos, carregar CSV inicial
        const csvResponse = await fetch('/api/csv-inicial');
        
        if (!csvResponse.ok) {
          throw new Error('Erro ao carregar dados iniciais');
        }

        const { csv } = await csvResponse.json();
        const parsedData = parseCSV(csv);
        setData(parsedData);
        
      } catch (err) {
        console.error('Erro ao inicializar dados:', err);
        setError('Erro ao carregar dados. Entre em contato com o suporte.');
      } finally {
        setLoading(false);
      }
    }

    if (!data) {
      initializeData();
    } else {
      setLoading(false);
    }
  }, [data, setData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Carregando cronograma...</p>
          <p className="text-sm text-gray-500 mt-2">Inicializando dados do sistema</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-center mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold mb-2">Erro ao Carregar Dados</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <p className="text-xs text-gray-500">Entre em contato com o suporte técnico.</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
