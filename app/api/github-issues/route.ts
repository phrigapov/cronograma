import { NextResponse } from 'next/server';

// ISR: Cache de 24 horas (86400 segundos) - só atualiza com refresh manual
export const revalidate = 86400;

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  html_url: string;
  created_at: string;
  updated_at: string;
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  assignees: Array<{
    login: string;
    avatar_url: string;
  }>;
  user: {
    login: string;
    avatar_url: string;
  };
  body: string | null;
  comments: number;
  milestone?: {
    title: string;
    due_on: string | null;
  } | null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state') || 'all'; // 'open', 'closed', 'all'
    const labels = searchParams.get('labels') || ''; // comma-separated
    const since = searchParams.get('since') || ''; // ISO 8601 timestamp
    const forceRefresh = searchParams.has('_t'); // timestamp indica refresh forçado
    
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'sismacke';
    const repo = process.env.GITHUB_REPO || 'mackensina';

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token não configurado' },
        { status: 500 }
      );
    }

    // Buscar issues com paginação limitada (máximo 3 páginas = 300 issues)
    let allIssues: GitHubIssue[] = [];
    const maxPages = 3; // Limitar a 300 issues para performance
    
    for (let page = 1; page <= maxPages; page++) {
      let url = `https://api.github.com/repos/${owner}/${repo}/issues?state=${state}&per_page=100&page=${page}`;
      if (labels) {
        url += `&labels=${labels}`;
      }
      if (since) {
        url += `&since=${since}`;
      }

      try {
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Cronograma-TE-App'
          },
          // Usar cache exceto quando forçar refresh
          next: forceRefresh ? { revalidate: 0 } : { revalidate: 86400 },
          cache: forceRefresh ? 'no-store' : 'force-cache'
        });
        
        if (!response.ok) {
          // Se falhar, usar o que já temos
          if (allIssues.length > 0) {
            break;
          }
          const errorData = await response.json();
          return NextResponse.json(
            { error: 'Erro ao buscar issues do GitHub', details: errorData },
            { status: response.status }
          );
        }

        const issues: GitHubIssue[] = await response.json();
        
        // Se retornou menos de 100, é a última página
        if (issues.length === 0) {
          break;
        }
        
        allIssues = allIssues.concat(issues);
        
        // Se retornou menos que 100, não há mais páginas
        if (issues.length < 100) {
          break;
        }
      } catch (error) {
        console.error(`Erro ao buscar página ${page}:`, error);
        // Se já temos dados, continuar com o que temos
        if (allIssues.length > 0) {
          break;
        }
        throw error;
      }
    }
    
    // Filtrar pull requests (issues com 'pull_request' key)
    const filteredIssues = allIssues.filter(issue => !('pull_request' in issue));

    return NextResponse.json({
      issues: filteredIssues,
      total: filteredIssues.length,
      repository: `${owner}/${repo}`
    });
  } catch (error) {
    console.error('Erro na API GitHub:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar issues' },
      { status: 500 }
    );
  }
}
