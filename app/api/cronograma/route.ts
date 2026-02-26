import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'cronograma.json');

// Garantir que a pasta data existe
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export async function GET() {
  try {
    ensureDataDir();
    
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      
      // O arquivo pode ter a estrutura { months: [], projects: [] } 
      // ou { data: { months: [], projects: [] } }
      // Sempre retornar na estrutura { data: ... }
      if (jsonData.projects && jsonData.months) {
        // Arquivo tem estrutura direta
        return NextResponse.json({ data: jsonData });
      } else if (jsonData.data) {
        // Arquivo já tem a estrutura { data: ... }
        return NextResponse.json(jsonData);
      }
      
      return NextResponse.json({ data: null });
    }
    
    return NextResponse.json({ data: null });
  } catch (error) {
    console.error('Erro ao ler dados:', error);
    return NextResponse.json({ error: 'Erro ao ler dados' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    ensureDataDir();
    const body = await request.json();
    
    // Salvar apenas a estrutura de dados, sem o wrapper { data: ... }
    // já que o setData recebe TimelineData diretamente
    fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return NextResponse.json({ error: 'Erro ao salvar dados' }, { status: 500 });
  }
}
