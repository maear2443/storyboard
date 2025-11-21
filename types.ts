
export interface SceneData {
  id: number;
  sectionTitle: string;
  sectionId: number;
  description: string; // The Korean text from the script
  prompt: string; // Highly detailed English prompt for Gemini acting as the single source of truth
  
  imageUrl?: string;
  isGenerating: boolean;
  error?: string;
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
