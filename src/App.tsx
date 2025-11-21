import React, { useState, useCallback, useEffect } from 'react';
import { INITIAL_SCENES } from './constants';
import { SceneData } from './types';
import SceneCard from './components/SceneCard';
import { generateSceneImage } from './services/geminiService';

const App: React.FC = () => {
  const [scenes, setScenes] = useState<SceneData[]>(INITIAL_SCENES);
  const [activeTab, setActiveTab] = useState<number>(0); // 0 = All
  const [apiKey, setApiKey] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  
  // Queue State
  const [isQueueRunning, setIsQueueRunning] = useState<boolean>(false);
  const [queueStatus, setQueueStatus] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);

  // Load API key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_user_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_user_api_key', key);
    setShowSettings(false);
  };

  // Extract unique sections for tabs
  const sections: string[] = Array.from(new Set(INITIAL_SCENES.map((s) => s.sectionTitle)));

  const handleGenerate = useCallback(async (id: number) => {
    setScenes(prev => prev.map(scene => 
      scene.id === id ? { ...scene, isGenerating: true, error: undefined } : scene
    ));

    const sceneToGenerate = scenes.find(s => s.id === id);
    if (!sceneToGenerate) return;

    try {
      const imageUrl = await generateSceneImage(sceneToGenerate.prompt, apiKey);
      setScenes(prev => prev.map(scene => 
        scene.id === id ? { ...scene, isGenerating: false, imageUrl } : scene
      ));
    } catch (error: any) {
      setScenes(prev => prev.map(scene => 
        scene.id === id ? { ...scene, isGenerating: false, error: error.message || "Failed to generate image." } : scene
      ));
    }
  }, [scenes, apiKey]);

  // Smart Queue System for Sequential Generation
  const runGenerationQueue = async (scenesToGen: SceneData[]) => {
      setIsQueueRunning(true);
      
      for (let i = 0; i < scenesToGen.length; i++) {
          const scene = scenesToGen[i];
          
          // Skip if already has image or is currently generating
          if (scene.imageUrl || scene.isGenerating) continue;

          setQueueStatus(`Generating Scene ${scene.id}... (${i + 1}/${scenesToGen.length})`);
          
          // Trigger generation
          await handleGenerate(scene.id);

          // If it's not the last one, cool down to avoid 429
          if (i < scenesToGen.length - 1) {
              for (let c = 6; c > 0; c--) {
                  setCountdown(c);
                  setQueueStatus(`Cooling down... ${c}s`);
                  await new Promise(r => setTimeout(r, 1000));
              }
          }
      }

      setQueueStatus('All tasks completed!');
      setCountdown(0);
      setTimeout(() => {
          setIsQueueRunning(false);
          setQueueStatus('');
      }, 2000);
  };

  const generateAllVisible = async () => {
    if (!apiKey && !process.env.API_KEY) {
        setShowSettings(true);
        alert("Please enter your Gemini API Key first.");
        return;
    }

     const visibleScenes = activeTab === 0 
        ? scenes 
        : scenes.filter(s => s.sectionTitle === sections[activeTab - 1]);
     
     // Filter only those that need generation
     const targetScenes = visibleScenes.filter(s => !s.imageUrl && !s.isGenerating);

     if (targetScenes.length === 0) {
         alert("All scenes in this section are already generated!");
         return;
     }

     runGenerationQueue(targetScenes);
  };

  const handlePrint = () => {
    // Check if we are in an iframe (Preview mode)
    const isInIframe = window.self !== window.top;

    if (!isInIframe) {
        // Standard print for standalone usage
        window.print();
    } else {
        // "Pop-out" print for Preview/Iframe usage
        const printWindow = window.open('', '_blank', 'width=1200,height=800');
        
        if (!printWindow) {
            alert("Please allow popups for this site to download the PDF.");
            return;
        }

        // Clone the necessary parts of the document
        const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
        const content = document.getElementById('root')?.innerHTML || '';
        
        // Specific Tailwind CDN (ensure it's included in the new window)
        const tailwindScript = '<script src="https://cdn.tailwindcss.com"></script>';

        // Custom print CSS to ensure background consistency
        const customPrintStyle = `
            <style>
                @media print {
                    @page { margin: 1cm; size: A4 portrait; }
                    body { -webkit-print-color-adjust: exact; background-color: white !important; }
                    .no-print { display: none !important; }
                    .print-only { display: block !important; }
                    .scene-grid { 
                        display: grid !important; 
                        grid-template-columns: 1fr 1fr !important; 
                        gap: 1rem !important;
                        page-break-inside: auto;
                    }
                    /* Hide scrollbars in print */
                    ::-webkit-scrollbar { display: none; }
                }
                /* Default view in the popup before printing */
                body { background-color: white; font-family: sans-serif; }
                /* Ensure images are visible */
                img { max-width: 100%; }
            </style>
        `;

        let styleTags = '';
        styles.forEach(node => {
            styleTags += node.outerHTML;
        });

        printWindow.document.write(`
            <html>
                <head>
                    <title>두 세계의 약속 - Storyboard PDF</title>
                    ${tailwindScript}
                    ${styleTags}
                    ${customPrintStyle}
                </head>
                <body>
                    <div id="root" class="bg-white text-black">
                        ${content}
                    </div>
                    <script>
                        // Wait for Tailwind and images to load before printing
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                                // Optional: close window after print
                                // window.close();
                            }, 1000);
                        };
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
    }
  };

  const filteredScenes = activeTab === 0 
    ? scenes 
    : scenes.filter(s => s.sectionTitle === sections[activeTab - 1]);

  return (
    <div className="min-h-screen flex flex-col pb-12 bg-slate-950 print:bg-white print:pb-0">
      
      {/* Global Print Styles (In-page fallback) */}
      <style>{`
        @media print {
          @page { margin: 1cm; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .scene-grid { 
             display: grid !important; 
             grid-template-columns: 1fr 1fr !important; 
             gap: 1rem !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-2xl no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-cyan-500/20 shadow-lg">
                S
             </div>
             <div>
                <h1 className="text-lg font-bold text-slate-100 leading-tight">두 세계의 약속</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Director's Storyboard</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
                onClick={() => setShowSettings(true)}
                className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                title="API Settings"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
            <button 
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
            </button>
            {isQueueRunning ? (
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 text-cyan-400 text-sm font-medium rounded-lg border border-cyan-900/50">
                     <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                     {countdown > 0 ? `Cooling down (${countdown}s)` : 'Processing...'}
                </div>
            ) : (
                <button 
                    onClick={generateAllVisible}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {apiKey ? 'Visualize Section' : 'Setup API Key'}
                </button>
            )}
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-2">API Configuration</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Enter your Google Gemini API Key to bypass quota limits. 
                    The key is stored locally in your browser.
                </p>
                <input 
                    type="password" 
                    placeholder="Enter your API Key (AIza...)" 
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 mb-4"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => setShowSettings(false)}
                        className="px-4 py-2 text-slate-400 hover:text-white text-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => saveApiKey(apiKey)}
                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium shadow-lg shadow-cyan-500/20"
                    >
                        Save API Key
                    </button>
                </div>
                <div className="mt-4 text-xs text-slate-500 border-t border-slate-800 pt-3">
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-cyan-500 hover:underline">Get a free API key here</a>
                </div>
            </div>
        </div>
      )}

      {/* Print Header (Only visible when printing) */}
      <div className="hidden print:block p-8 border-b-2 border-black mb-6">
          <h1 className="text-3xl font-bold text-black uppercase mb-2">Project: 두 세계의 약속 (Promise of Two Worlds)</h1>
          <div className="flex justify-between text-sm text-gray-600">
              <span>Director's Visualization Board</span>
              <span>Generated: {new Date().toLocaleDateString()}</span>
          </div>
      </div>

      {/* Main Layout */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full print:p-0 print:max-w-none">
        
        {/* Navigation Tabs (Hidden on print) */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar no-print">
          <button
            onClick={() => setActiveTab(0)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === 0 
                ? 'bg-slate-100 text-slate-900' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
            disabled={isQueueRunning}
          >
            All Scenes
          </button>
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => setActiveTab(index + 1)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === index + 1
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
              disabled={isQueueRunning}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Info Banner (Hidden on print) */}
        <div className="mb-8 p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
            <div>
                <h2 className="text-slate-200 font-semibold mb-1">Storyboard Sequence</h2>
                <p className="text-slate-400 text-xs">
                    Reviewing: <span className="text-cyan-400">{activeTab === 0 ? 'Full Script (24 Scenes)' : sections[activeTab-1]}</span>
                </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
                <div className="flex gap-4 text-xs text-slate-500">
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-slate-300 text-lg">{scenes.filter(s => s.imageUrl).length}</span>
                        <span>Completed</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-slate-300 text-lg">{scenes.length}</span>
                        <span>Total Scenes</span>
                    </div>
                </div>
                {queueStatus && (
                    <div className="text-xs font-mono text-cyan-400 animate-pulse">
                        {queueStatus}
                    </div>
                )}
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 scene-grid">
          {filteredScenes.map((scene) => (
            <SceneCard 
              key={scene.id} 
              scene={scene} 
              onGenerate={isQueueRunning ? () => {} : handleGenerate} 
            />
          ))}
        </div>

        {filteredScenes.length === 0 && (
            <div className="text-center py-20 text-slate-500 no-print">
                <p>No scenes found in this section.</p>
            </div>
        )}
      </main>
      
      {/* Mobile FAB */}
      <button
        onClick={isQueueRunning ? () => {} : generateAllVisible}
        className={`md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white z-50 active:scale-95 transition-transform no-print ${isQueueRunning ? 'bg-slate-700 cursor-not-allowed' : 'bg-cyan-600'}`}
      >
        {isQueueRunning ? (
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )}
      </button>

    </div>
  );
};

export default App;