import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeRepo(repoData: any) {
  const prompt = `Analyze this GitHub repository:
  Name: ${repoData.name}
  Description: ${repoData.description}
  Stars: ${repoData.stars}
  Language: ${repoData.language}
  README Content: ${repoData.readme?.substring(0, 5000)}

  Provide a structured analysis. If a README is provided, use it to give a detailed, technical summary of what the repo does and its core value proposition.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "1-2 sentence summary" },
          category: { type: Type.STRING, description: "Primary category" },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          useCases: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Best for use cases" },
          integrationNotes: { type: Type.ARRAY, items: { 
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              note: { type: Type.STRING },
              match: { type: Type.STRING, description: "Perfect Match, High Compat, etc." }
            }
          }}
        },
        required: ["summary", "category", "tags", "useCases", "integrationNotes"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function getRecommendations(projectBrief: string, availableRepos: any[], constraints?: any) {
  const prompt = `Project Brief: ${projectBrief}
  Constraints: ${constraints ? JSON.stringify(constraints) : 'None'}
  Available Repositories: ${JSON.stringify(availableRepos.map(r => ({ id: r.id, desc: r.description, score: r.score })))}
  
  Recommend the best 3 repositories for this project, taking into account the brief and the technical constraints.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            repoId: { type: Type.STRING },
            rationale: { type: Type.STRING },
            fitScore: { type: Type.NUMBER },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["repoId", "rationale", "fitScore"]
        }
      }
    }
  });

  return JSON.parse(response.text);
}
