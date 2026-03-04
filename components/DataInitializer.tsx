'use client';

import { useEffect, useState, useRef } from 'react';
import { useCronogramaStore } from '@/store/cronogramaStore';

export default function DataInitializer({ children }: { children: React.ReactNode }) {
  const store = useCronogramaStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    // Prevenir múltiplas inicializações
    if (initRef.current) {
      return;
    }

    initRef.current = true;

    async function initializeData() {
      try {
        console.log('🔄 Inicializando sistema...');
        
        // Esperar um pouco para garantir que a hidratação aconteceu
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Verificar dados do localStorage primeiro (mais rápido)
        const localData = useCronogramaStore.getState().data;
        
        // Carregar dados do servidor (sempre tem dados - seja do arquivo ou padrão)
        const savedResponse = await fetch('/api/cronograma', {
          cache: 'no-store',
        });
        
        if (!savedResponse.ok) {
          throw new Error('Erro ao comunicar com o servidor');
        }

        const savedDataResponse = await savedResponse.json();
        
        // Dados do servidor têm prioridade sobre localStorage
        if (savedDataResponse && savedDataResponse.data) {
          console.log('✓ Dados carregados do servidor');
          store.setData(savedDataResponse.data);
          setLoading(false);
          return;
        }
        
        // Se por algum motivo o servidor não retornar dados, usar localStorage
        if (localData && localData.projects) {
          console.log('✓ Dados carregados do localStorage (fallback)');
          store.setData(localData);
          setLoading(false);
          return;
        }

        // Isso não deveria acontecer, mas caso aconteça
        throw new Error('Nenhum dado disponível');
        
      } catch (err) {
        console.error('✗ Erro ao inicializar dados:', err);
        setError('Erro ao carregar dados. Tente recarregar a página.');
        initRef.current = false; // Permitir retry
      } finally {
        setLoading(false);
      }
    }

    initializeData();
  }, []);

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
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Recarregar Página
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Limpar Cache
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
