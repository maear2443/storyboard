import { SceneData } from '../types';

/**
 * Download the storyboard as an HTML file with embedded images
 */
export const downloadStoryboardAsHTML = (scenes: SceneData[], title: string = '두 세계의 약속 - Storyboard') => {
  const html = generateStoryboardHTML(scenes, title);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `storyboard-${Date.now()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Download storyboard data as JSON
 */
export const downloadStoryboardAsJSON = (scenes: SceneData[]) => {
  const data = scenes.map(scene => ({
    id: scene.id,
    sectionTitle: scene.sectionTitle,
    sectionId: scene.sectionId,
    description: scene.description,
    prompt: scene.prompt,
    imageUrl: scene.imageUrl,
  }));

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `storyboard-data-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate complete HTML document with embedded images
 */
const generateStoryboardHTML = (scenes: SceneData[], title: string): string => {
  const scenesHTML = scenes.map(scene => {
    const imageHTML = scene.imageUrl
      ? `<img src="${scene.imageUrl}" alt="Scene ${scene.id}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 12px;" />`
      : `<div style="width: 100%; height: 200px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; color: #64748b; font-size: 14px;">이미지 없음</div>`;

    return `
      <div style="page-break-inside: avoid; margin-bottom: 32px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="margin: 0; color: #0f172a; font-size: 16px; font-weight: 700;">Scene ${scene.id}</h3>
          <span style="background: #0ea5e9; color: white; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${scene.sectionTitle.split('.')[1]?.split('(')[0] || 'Part'}</span>
        </div>
        ${imageHTML}
        <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
          <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${scene.description}</p>
        </div>
        <div style="background: #ecfeff; border-left: 3px solid #06b6d4; border-radius: 4px; padding: 12px;">
          <p style="margin: 0; color: #0e7490; font-size: 12px; line-height: 1.5; font-family: monospace;"><strong>Prompt:</strong> ${scene.prompt}</p>
        </div>
      </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @page {
      margin: 1cm;
      size: A4 portrait;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans KR', sans-serif;
      background: #f1f5f9;
      padding: 40px 20px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    header {
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
      color: white;
      padding: 32px;
      border-radius: 16px;
      margin-bottom: 32px;
      box-shadow: 0 10px 25px rgba(14, 165, 233, 0.2);
      text-align: center;
    }

    header h1 {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    header p {
      font-size: 12px;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
    }

    .metadata {
      background: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 32px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .metadata p {
      color: #64748b;
      font-size: 13px;
      margin-bottom: 8px;
    }

    .metadata p:last-child {
      margin-bottom: 0;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      header {
        background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
        page-break-after: avoid;
      }

      .metadata {
        page-break-after: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${title}</h1>
      <p>Director's Storyboard</p>
    </header>

    <div class="metadata">
      <p><strong>생성 일시:</strong> ${new Date().toLocaleString('ko-KR')}</p>
      <p><strong>총 씬 개수:</strong> ${scenes.length}개</p>
      <p><strong>이미지 생성 완료:</strong> ${scenes.filter(s => s.imageUrl).length}개</p>
    </div>

    <main>
      ${scenesHTML}
    </main>

    <footer style="margin-top: 48px; padding-top: 24px; border-top: 2px solid #e2e8f0; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px;">Generated by Nanobanana Storyboard Tool</p>
      <p style="color: #cbd5e1; font-size: 11px; margin-top: 8px;">Powered by Google Gemini AI</p>
    </footer>
  </div>
</body>
</html>`;
};
