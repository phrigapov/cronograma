import pptxgen from 'pptxgenjs';
import { TimelineData, Project } from '@/types/cronograma';

export function generatePowerPoint(data: TimelineData): pptxgen {
  const pptx = new pptxgen();
  
  // Slide de título
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: '1e40af' };
  titleSlide.addText('Cronograma de Projetos 2026', {
    x: 0.5,
    y: 2,
    w: 9,
    h: 1.5,
    fontSize: 44,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
  });
  titleSlide.addText('Tecnologia e Inteligência Educacional - SME/SUPEB', {
    x: 0.5,
    y: 3.5,
    w: 9,
    h: 0.5,
    fontSize: 20,
    color: 'E0E0E0',
    align: 'center',
  });
  
  // Slide de visão geral
  const overviewSlide = pptx.addSlide();
  overviewSlide.addText('Visão Geral dos Projetos', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: '1e40af',
  });
  
  const projectsList = data.projects.map((p, i) => ({
    text: `${i + 1}. ${p.name}`,
    options: { bullet: false, fontSize: 18, color: '333333' },
  }));
  
  overviewSlide.addText(projectsList, {
    x: 1,
    y: 1.5,
    w: 8,
    h: 4,
  });
  
  // Slide para cada projeto
  data.projects.forEach((project) => {
    addProjectSlide(pptx, project, data);
  });
  
  // Slide de cronograma visual
  addTimelineSlide(pptx, data);
  
  return pptx;
}

function addProjectSlide(pptx: pptxgen, project: Project, data: TimelineData) {
  const slide = pptx.addSlide();
  
  slide.addText(project.name, {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: '1e40af',
  });
  
  let yPos = 1.2;
  
  project.phases.forEach((phase) => {
    slide.addText(phase.name, {
      x: 0.5,
      y: yPos,
      w: 9,
      h: 0.4,
      fontSize: 20,
      bold: true,
      color: '64748b',
    });
    yPos += 0.5;
    
    const tableData: any[] = [
      [
        { text: 'Feature', options: { bold: true, color: 'FFFFFF', fill: '1e40af' } },
        { text: 'Responsável', options: { bold: true, color: 'FFFFFF', fill: '1e40af' } },
        { text: 'Período', options: { bold: true, color: 'FFFFFF', fill: '1e40af' } },
      ],
    ];
    
    phase.features.slice(0, 5).forEach((feature) => {
      const responsibles = [...new Set(feature.weeks.map((w) => w.responsible))].join(', ');
      const months = [...new Set(feature.weeks.map((w) => w.month))];
      const period = months.length > 0 ? `${months[0]} - ${months[months.length - 1]}` : 'N/A';
      
      tableData.push([feature.name, responsibles, period]);
    });
    
    if (tableData.length > 1) {
      slide.addTable(tableData, {
        x: 0.5,
        y: yPos,
        w: 9,
        h: Math.min(2.5, tableData.length * 0.4),
        fontSize: 12,
        border: { pt: 1, color: 'CCCCCC' },
      });
      yPos += Math.min(2.5, tableData.length * 0.4) + 0.3;
    }
    
    if (yPos > 6) return;
  });
}

function addTimelineSlide(pptx: pptxgen, data: TimelineData) {
  const slide = pptx.addSlide();
  
  slide.addText('Linha do Tempo - 2026', {
    x: 0.5,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: '1e40af',
  });
  
  // Desenhar linha do tempo
  const startX = 0.5;
  const startY = 1.5;
  const width = 9;
  const monthWidth = width / data.months.length;
  
  // Linha principal
  slide.addShape(pptx.ShapeType.rect, {
    x: startX,
    y: startY,
    w: width,
    h: 0.05,
    fill: { color: '1e40af' },
  });
  
  // Marcadores de meses
  data.months.forEach((month, index) => {
    const x = startX + index * monthWidth;
    
    // Marcador
    slide.addShape(pptx.ShapeType.rect, {
      x: x,
      y: startY - 0.1,
      w: 0.05,
      h: 0.25,
      fill: { color: '1e40af' },
    });
    
    // Nome do mês
    slide.addText(month.name.substring(0, 3), {
      x: x - 0.2,
      y: startY + 0.2,
      w: 0.5,
      h: 0.3,
      fontSize: 10,
      align: 'center',
      color: '333333',
    });
  });
  
  // Projetos na timeline
  let projectY = startY + 1;
  const colors = ['FF6B6B', '4ECDC4', 'FFE66D', '95E1D3', 'F38181'];
  
  data.projects.slice(0, 5).forEach((project, pIndex) => {
    const color = colors[pIndex % colors.length];
    
    slide.addText(project.name, {
      x: 0.5,
      y: projectY,
      w: 2,
      h: 0.3,
      fontSize: 10,
      color: '333333',
      valign: 'middle',
    });
    
    // Calcular período do projeto
    const allWeeks = project.phases.flatMap((p) => p.features.flatMap((f) => f.weeks));
    const projectMonths = [...new Set(allWeeks.map((w) => w.month))];
    
    if (projectMonths.length > 0) {
      const firstMonthIndex = data.months.findIndex((m) => m.name === projectMonths[0]);
      const lastMonthIndex = data.months.findIndex(
        (m) => m.name === projectMonths[projectMonths.length - 1]
      );
      
      if (firstMonthIndex !== -1 && lastMonthIndex !== -1) {
        const barX = startX + firstMonthIndex * monthWidth;
        const barW = (lastMonthIndex - firstMonthIndex + 1) * monthWidth;
        
        slide.addShape(pptx.ShapeType.rect, {
          x: barX,
          y: projectY,
          w: barW,
          h: 0.25,
          fill: { color, transparency: 30 },
          line: { color, width: 1 },
        });
      }
    }
    
    projectY += 0.4;
  });
}

export function generateReport(data: TimelineData): string {
  let report = '# Relatório de Cronograma - 2026\n\n';
  report += '## Tecnologia e Inteligência Educacional - SME/SUPEB\n\n';
  
  report += '## Resumo Executivo\n\n';
  report += `Total de Projetos: ${data.projects.length}\n\n`;
  
  const totalFeatures = data.projects.reduce(
    (sum, p) => sum + p.phases.reduce((pSum, phase) => pSum + phase.features.length, 0),
    0
  );
  report += `Total de Features: ${totalFeatures}\n\n`;
  
  report += '---\n\n';
  
  data.projects.forEach((project) => {
    report += `## ${project.name}\n\n`;
    
    project.phases.forEach((phase) => {
      report += `### ${phase.name}\n\n`;
      
      if (phase.features.length > 0) {
        report += '| Feature | Responsáveis | Período |\n';
        report += '|---------|--------------|----------|\n';
        
        phase.features.forEach((feature) => {
          const responsibles = [...new Set(feature.weeks.map((w) => w.responsible))].join(', ');
          const months = [...new Set(feature.weeks.map((w) => w.month))];
          const period = months.length > 0 ? `${months[0]} - ${months[months.length - 1]}` : 'N/A';
          
          report += `| ${feature.name} | ${responsibles} | ${period} |\n`;
        });
        
        report += '\n';
      }
    });
    
    report += '---\n\n';
  });
  
  return report;
}
