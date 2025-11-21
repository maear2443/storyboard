import React, { useState, useCallback, useEffect, useRef } from 'react';
import { INITIAL_SCENES } from './constants';
import { SceneData } from './types';
import SceneCard from './components/SceneCard';
import { generateSceneImage } from './services/geminiService';

const App: React.FC = () => {
  const [scenes, setScenes] = useState<SceneData[]>(INITIAL_SCENES);
  const [activeTab, setActiveTab] = useState<number>(0); // 0 = All
  const [apiKey, setApiKey] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [tempKey, setTempKey] = useState<string>('');
  
  // Queue State
  const [isBulkGenerating, setIsBulkGenerating] = useState<boolean>(false);
  const [queueStatus, setQueueStatus] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load API key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_user_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setTempKey(storedKey);
    }
  }, []);

  const saveApiKey = () => {
    setApiKey(tempKey);
    localStorage.setItem('gemini_user_api_key', tempKey);
    setShowSettings(false);
  };

  // Extract unique sections for tabs
  const sections = Array.from(new Set(INITIAL_SCENES.map(s => s.sectionTitle)));

  const handleGenerate = useCallback(async (id: number) => {
    // Update state to loading
    setScenes(prev => prev.map(scene => 
      scene.id === id ? { ...scene, isGenerating: true, error: undefined } : scene
    ));

    const sceneToGenerate = scenes.find(s => s.id === id);
    if (!sceneToGenerate) return;

    try {
      // Pass the user's API key to the service
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

  const handleMainButtonClick = async () => {
      if (!apiKey) {
          setTempKey('');
          setShowSettings(true);
          return;
      }
      
      if (isBulkGenerating) {
          // Cancel functionality
          if (abortControllerRef.current) {
              abortControllerRef.current.abort();
          }
          setIsBulkGenerating(false);
          setQueueStatus('Generation stopped by user.');
          return;
      }

      await generateAllVisible();
  };

  const generateAllVisible = async () => {
     setIsBulkGenerating(true);
     abortControllerRef.current = new AbortController();
     const signal = abortControllerRef.current.signal;

     const visibleScenes = activeTab === 0 
        ? scenes 
        : scenes.filter(s => s.sectionTitle === sections[activeTab - 1]);
     
     const toGenerate = visibleScenes.filter(s => !s.imageUrl);
     
     if (toGenerate.length === 0) {
        setQueueStatus('All visible scenes already have images.');
        setTimeout(() => {
            setIsBulkGenerating(false);
            setQueueStatus('');
        }, 2000);
        return;
     }

     let completedCount = 0;

     for (const scene of toGenerate) {
         if (signal.aborted) break;

         // 1. Generate
         setQueueStatus(`Generating Scene ${scene.id} (${completedCount + 1}/${toGenerate.length})...`);
         await handleGenerate(scene.id);
         completedCount++;

         // 2. Cooldown (Only if not the last one)
         if (completedCount < toGenerate.length && !signal.aborted) {
             for (let i = 6; i > 0; i--) {
                 if (signal.aborted) break;
                 setQueueStatus(`Cooling down API (Free Tier Limit)... Resuming in ${i}s`);
                 await new Promise(r => setTimeout(r, 1000));
             }
         }
     }

     if (!signal.aborted) {
        setQueueStatus('Sequence completed successfully.');
        setTimeout(() => setQueueStatus(''), 3000);
     }
     setIsBulkGenerating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredScenes = activeTab === 0 
    ? scenes 
    : scenes.filter(s => s.sectionTitle === sections[activeTab - 1]);

  return (
    <div className="min-h-screen flex flex-col pb-12 bg-slate-950 print:bg-white print:pb-0">
      
      {/* Global Print Styles */}
      <style>{`
        @media print {
          @page { margin: 0.5cm; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .scene-grid { 
             display: grid !important; 
             grid-template-columns: 1fr 1fr !important; 
             gap: 1.5rem !important;
             page-break-inside: auto;
          }
          .break-inside-avoid { page-break-inside: avoid; }
        }
      `}</style>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print">
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl max-w-md w-full overflow-hidden">
                <div className="p-4 bg-slate-900 border-b border-slate-700">
                    <h3 className="text-lg font-bold text-white">Settings</h3>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Google Gemini API Key
                        </label>
                        <input 
                            type="password" 
                            value={tempKey}
                            onChange={(e) => setTempKey(e.target.value)}
                            placeholder="Enter your AI Studio API Key"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                        <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                            A valid API Key is required to generate images. 
                            <br/>
                            Get one for free at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">Google AI Studio</a>.
                            <br/>
                            (Your key is stored locally in your browser).
                        </p>
                    </div>
                </div>
                <div className="p-4 bg-slate-900 border-t border-slate-700 flex justify-end gap-3">
                    <button 
                        onClick={() => setShowSettings(false)}
                        className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={saveApiKey}
                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition-all"
                    >
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
      )}

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
                onClick={() => { setTempKey(apiKey); setShowSettings(true); }}
                className={`p-2 transition-colors ${apiKey ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                title={apiKey ? "API Key Configured" : "Configure API Key"}
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
                Print / PDF
            </button>
            <button 
                onClick={handleMainButtonClick}
                className={`hidden sm:flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-lg transition-all shadow-lg active:scale-95 ${
                    isBulkGenerating
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : apiKey 
                        ? 'bg-cyan-600 hover:bg-cyan-500 hover:shadow-cyan-500/25' 
                        : 'bg-rose-600 hover:bg-rose-500 hover:shadow-rose-500/25 animate-pulse'
                }`}
            >
                {isBulkGenerating ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Stop Queue
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {apiKey ? "Visualize Section" : "Setup API Key"}
                    </>
                )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex gap-6 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab(0)}
                    className={`pb-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === 0 
                        ? 'border-cyan-500 text-white' 
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                >
                    Full Storyboard
                </button>
                {sections.map((section: string, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveTab(idx + 1)}
                        className={`pb-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-colors ${
                            activeTab === idx + 1
                            ? 'border-cyan-500 text-white' 
                            : 'border-transparent text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        {section.split('.')[1]?.split('(')[0] || `Part ${idx + 1}`}
                    </button>
                ))}
            </nav>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scene-grid print:block">
          {filteredScenes.map((scene) => (
            <SceneCard 
                key={scene.id} 
                scene={scene} 
                onGenerate={handleGenerate} 
            />
          ))}
        </div>
      </main>

      {/* Footer Status Bar (Visible during generation) */}
      <div className={`fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 transition-transform duration-300 z-40 no-print ${queueStatus ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-cyan-400">{queueStatus}</span>
              </div>
              {isBulkGenerating && (
                  <button onClick={() => {
                      if (abortControllerRef.current) abortControllerRef.current.abort();
                      setIsBulkGenerating(false);
                      setQueueStatus('Stopped.');
                  }} className="text-xs text-slate-400 hover:text-white underline">
                      Cancel
                  </button>
              )}
          </div>
      </div>

    </div>
  );
};

export default App;