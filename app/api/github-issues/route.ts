import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
    
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'sismacke';
    const repo = process.env.GITHUB_REPO || 'mackensina';

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token não configurado' },
        { status: 500 }
      );
    }

    let url = `https://api.github.com/repos/${owner}/${repo}/issues?state=${state}&per_page=100`;
    if (labels) {
      url += `&labels=${labels}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Cronograma-TE-App'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Erro ao buscar issues do GitHub', details: errorData },
        { status: response.status }
      );
    }

    const issues: GitHubIssue[] = await response.json();
    
    // Filtrar pull requests (issues com 'pull_request' key)
    const filteredIssues = issues.filter(issue => !('pull_request' in issue));

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
