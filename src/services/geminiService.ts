import { GoogleGenAI } from "@google/genai";

export const generateSceneImage = async (prompt: string, customApiKey?: string): Promise<string> => {
  // Use custom key if provided, otherwise fallback to env (though env might be rate limited)
  const keyToUse = customApiKey || process.env.API_KEY;

  if (!keyToUse) {
    throw new Error("API Key is missing. Please click 'Setup API Key' to add your own Google Gemini API Key.");
  }

  const ai = new GoogleGenAI({ apiKey: keyToUse });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      }
    });

    // Robust Error Handling: Check if candidates exist
    if (!response.candidates || response.candidates.length === 0) {
       throw new Error("The AI did not return any images. It might be a safety block or a server error.");
    }

    const firstCandidate = response.candidates[0];
    
    // Check if content and parts exist
    if (!firstCandidate.content || !firstCandidate.content.parts) {
       throw new Error("Incomplete response structure from API.");
    }

    // Iterate through parts to find the inline image data
    for (const part of firstCandidate.content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }

    throw new Error("No image data found in the response parts.");
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    
    // Improve error message for the user
    if (error.toString().includes("429")) {
        throw new Error("Quota Exceeded (429). You are generating too fast. Please wait a moment or use a paid API Key.");
    }
    throw error;
  }
};