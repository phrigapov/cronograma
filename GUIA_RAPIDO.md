# 🚀 Guia Rápido de Uso

## Iniciar o Sistema

```bash
cd /home/phrigapov/code/sismacke/cronograma
npm run dev
```

Acesse: **http://localhost:3000**

## Primeiros Passos

### 1. Acessar o Sistema
- Sistema já vem com cronograma carregado automaticamente
- Todos os projetos estão prontos 
- Dados salvos em banco JSON no servidor

### 2. Navegar pelo Cronograma
- Role horizontalmente para ver todos os meses (Fev-Dez 2026)
- Cada célula colorida representa uma semana de trabalho
- Passe o mouse sobre as células para ver detalhes

### 3. Gerenciar Projetos

#### Adicionar Novo Projeto
1. Vá até "Gerenciar Projetos"
2. Clique em **"Novo Projeto"**
3. Preencha:
   - Nome do Projeto
   - Nome da Fase
   - Nome da Feature inicial
4. Clique em **"Adicionar"**

#### Adicionar Features
1. Vá até "Gerenciar Features"
2. Selecione o Projeto
3. Selecione a Fase
4. Clique em **"Nova Feature"**
5. Preencha:
   - Nome da Feature
   - Responsável (dev, Jonatas, guga, TE, autor)
   - Mês Inicial
   - Mês Final
6. Clique em **"Adicionar"**

### 4. Gerar Relatórios

#### PowerPoint (.pptx)
- Clique no botão laranja **"Apresentação PowerPoint"**
- Aguarde a geração
- O arquivo será baixado automaticamente
- Contém: slides de cada projeto, timeline visual, estatísticas

#### Relatório Markdown (.md)
- Clique no botão roxo **"Relatório Markdown"**
- Arquivo será baixado com toda a documentação
- Pode ser convertido para PDF ou visualizado no GitHub

#### Exportar CSV
- Clique no botão verde **"Exportar CSV"**
- Baixa o cronograma atualizado em formato CSV
- Útil para backup ou compartilhamento

## Cores dos Responsáveis

- 🔵 **dev** - Desenvolvedores
- 🟢 **Jonatas** - Designer/Desenvolvedor
- 🟣 **guga** - Designer
- 🟠 **TE** - Equipe Técnica Educacional
- 🩷 **autor** - Criadores de Conteúdo

## Projetos Incluídos

1. **Backoffice** - Sistema administrativo
2. **Banco de Questões** - Gerenciamento de questões educacionais
3. **Plataforma Maker** - Ferramenta de criação
4. **Gestor 3.1** - Sistema de gestão atualizado
5. **E-Learning** - Plataforma de aprendizagem online

## Persistência de Dados

- ✅ Dados salvos automaticamente em arquivo JSON no servidor
- ✅ Ao recarregar a página, o cronograma é restaurado automaticamente
- ✅ Todas as edições são sincronizadas instantaneamente
- ✅ Backup em `/data/cronograma.json`

## Dicas

✅ **Reajuste Automático**: Ao adicionar features, o cronograma se reorganiza automaticamente

✅ **Exclusão**: Use o botão ❌ ao lado de projetos/features para removê-los

✅ **Visualização**: A timeline se adapta automaticamente ao número de projetos

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start

# Lint
npm run lint
```

## Estrutura de Pastas

```
cronograma/
├── app/              # Páginas Next.js
├── components/       # Componentes React
├── lib/             # Utilitários (parser CSV, gerador de relatórios)
├── store/           # Estado global (Zustand)
├── types/           # Tipos TypeScript
└── public/          # Arquivos estáticos (CSV inicial)
```

## Tecnologias

- Next.js 16
- TypeScript
- Tailwind CSS
- Zustand (Estado)
- PapaParse (CSV)
- PptxGenJS (PowerPoint)

---

💡 **Precisa de ajuda?** Consulte o [README.md](README.md) completo!
