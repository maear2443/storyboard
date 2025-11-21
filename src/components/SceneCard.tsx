
import React from 'react';
import { SceneData } from '../types';

interface SceneCardProps {
  scene: SceneData;
  onGenerate: (id: number) => void;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene, onGenerate }) => {
  return (
    <div className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 flex flex-col h-full transition-all hover:shadow-cyan-500/10 hover:border-cyan-500/30 break-inside-avoid print:border-gray-300 print:shadow-none print:bg-white print:break-inside-avoid">
      
      {/* Header / Slate Info */}
      <div className="p-3 bg-slate-900 border-b border-slate-700 flex justify-between items-center print:bg-gray-100 print:border-gray-300">
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 bg-cyan-950 rounded border border-cyan-800 print:bg-black print:text-white print:border-black">
            SCENE {scene.id}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-tight print:text-gray-600">
                {scene.sectionTitle.split('.')[1]?.split('(')[0] || 'Sequence'}
            </span>
        </div>
      </div>

      {/* Image Area */}
      <div className="aspect-video w-full bg-black relative overflow-hidden print:border-b print:border-gray-300">
        {scene.imageUrl ? (
          <img
            src={scene.imageUrl}
            alt={`Scene ${scene.id}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 print:grayscale-0"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-4 text-center bg-slate-900/50 print:bg-gray-100">
            {scene.isGenerating ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin print:hidden"></div>
                <span className="text-xs text-cyan-500 animate-pulse font-mono print:text-black">RENDERING...</span>
              </div>
            ) : (
                <div className="flex flex-col items-center gap-2 opacity-40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] uppercase tracking-widest">Empty Frame</span>
                </div>
            )}
          </div>
        )}
        
        {/* Hover Action (Hidden on Print) */}
        {!scene.isGenerating && (
             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center print:hidden">
                 <button
                    onClick={() => onGenerate(scene.id)}
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-sm text-xs font-bold uppercase tracking-widest shadow-lg transform transition active:scale-95 border border-cyan-400/50"
                 >
                    {scene.imageUrl ? 'Regenerate Shot' : 'Render Shot'}
                 </button>
             </div>
        )}
      </div>

      {/* Director Notes Area */}
      <div className="p-4 flex-grow flex flex-col justify-between bg-slate-800 print:bg-white">
        <div>
          {/* Script Description */}
          <h4 className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-1 print:text-gray-500">Story Board Description</h4>
          <p className="text-slate-200 text-sm font-medium leading-relaxed mb-4 font-sans print:text-black border-b border-slate-700 pb-3 print:border-gray-200">
            {scene.description}
          </p>
          
          {/* Director's Prompt - Always Visible */}
          <div>
             <h4 className="text-[10px] uppercase text-cyan-500 font-bold tracking-wider mb-1 print:text-black">Director's Prompt</h4>
             <div className="bg-slate-900/50 p-3 rounded border border-slate-700 text-[11px] text-slate-300 font-mono leading-relaxed print:bg-gray-50 print:text-gray-800 print:border-gray-200">
                {scene.prompt}
             </div>
          </div>

          {scene.error && (
            <p className="text-red-400 text-xs mt-2 bg-red-900/20 p-2 rounded border border-red-900/50 print:text-red-600">Error: {scene.error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SceneCard;
