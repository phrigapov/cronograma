# Sistema de Cronograma TE 2026

Sistema completo de gerenciamento de cronograma de projetos desenvolvido para a Tecnologia e Inteligência Educacional - SME/SUPEB.

## 🚀 Funcionalidades

### ✅ Importação de Dados
- Importação de cronogramas via arquivo CSV
- Parser inteligente que reconhece estrutura de projetos, fases e features
- Suporte para múltiplos responsáveis e períodos

### 📊 Visualização
- Timeline visual interativa com todos os projetos e tarefas
- Código de cores por responsável
- Navegação por meses e semanas
- Hierarquia clara: Projeto → Fase → Feature

### ✏️ Edição e Gerenciamento
- **Adicionar novos projetos** com fases e features
- **Adicionar features** a projetos existentes
- **Excluir projetos e features**
- Sistema de reajuste automático do cronograma
- Persistência de dados no navegador (LocalStorage)

### 📑 Geração de Relatórios
1. **Apresentação PowerPoint (.pptx)**
   - Slide de título profissional
   - Visão geral de todos os projetos
   - Slide detalhado para cada projeto com tabelas
   - Timeline visual com todos os projetos
   - Exportação com um clique

2. **Relatório Markdown (.md)**
   - Resumo executivo com estatísticas
   - Detalhamento completo de todos os projetos
   - Tabelas organizadas por fase e feature
   - Pronto para conversão em PDF ou outras visualizações

3. **Exportação CSV**
   - Exportar cronograma atualizado para CSV
   - Mantém formato compatível para reimportação
   - Backup dos dados

## 🛠️ Tecnologias Utilizadas

- **Next.js 16** - Framework React para produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização moderna e responsiva
- **Zustand** - Gerenciamento de estado global
- **PapaParse** - Parser de CSV robusto
- **PptxGenJS** - Geração de apresentações PowerPoint
- **Lucide React** - Ícones modernos
- **date-fns** - Manipulação de datas

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar versão de produção
npm start
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🎯 Como Usar

### Sistema Pronto para Uso
O sistema já vem com o cronograma carregado automaticamente! 
- ✅ Ao abrir, os dados são carregados do banco JSON
- ✅ Todos os projetos já estão configurados
- ✅ Não é necessário importar nada

### 1. Visualizar o Cronograma
- A timeline mostra todos os projetos organizados hierarquicamente
- Cada célula colorida representa uma semana de trabalho
- Passe o mouse sobre as células para ver detalhes
- Role horizontalmente para navegar pelos meses

### 2. Adicionar Novo Projeto
1. Na seção "Gerenciar Projetos", clique em "Novo Projeto"
2. Preencha: Nome do Projeto, Fase e Feature inicial
3. Clique em "Adicionar"

### 3. Adicionar Features a Projetos Existentes
1. Na seção "Gerenciar Features", selecione o Projeto
2. Selecione a Fase
3. Clique em "Nova Feature"
4. Preencha os dados e defina o período

### 4. Gerar Relatórios
- **PowerPoint**: Clique no botão laranja - gera apresentação completa
- **Markdown**: Clique no botão roxo - baixa relatório em MD
- **CSV**: Clique no botão verde - exporta dados atualizados

## 📁 Estrutura do Projeto

```
cronograma/
├── app/                    # Páginas Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── DataInitializer.tsx # Carregamento automático
│   ├── TimelineView.tsx  # Visualização do cronograma
│   ├── ProjectManager.tsx # Gerenciador de projetos
│   ├── FeatureEditor.tsx  # Editor de features
│   └── ReportGenerator.tsx # Gerador de relatórios
├── lib/                   # Bibliotecas e utilitários
│   ├── csvParser.ts      # Parser de CSV
│   └── reportGenerator.ts # Gerador de relatórios
├── store/                 # Gerenciamento de estado
│   └── cronogramaStore.ts # Store Zustand
├── types/                 # Definições TypeScript
│   └── cronograma.ts     # Tipos do cronograma
└── public/                # Arquivos estáticos
    └── cronograma-inicial.csv # CSV inicial
```

## 📝 Responsáveis Suportados

O sistema reconhece e coloriza automaticamente:
- **dev** - Desenvolvedores (azul)
- **Jonatas** - Designer/Dev (verde)
- **guga** - Designer (roxo)
- **TE** - Equipe TE (laranja)
- **autor** - Criadores de conteúdo (rosa)

---

**Desenvolvido com ❤️ para SME/SUPEB**

