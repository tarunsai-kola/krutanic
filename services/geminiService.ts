import { GoogleGenAI } from "@google/genai";
import { Course } from '../types';

// NOTE: In a real production app, you would proxy this through a backend 
// to avoid exposing the API Key, or use a short-lived token.
// For this demo, we assume the environment variable is set or we instruct the user.

const apiKey = process.env.API_KEY || ''; 
// Fallback logic for demo purposes if key isn't present to prevent crash, 
// though functionality will limit.

let ai: GoogleGenAI | null = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
}

export const generateCourseInsights = async (course: Course, query: string): Promise<string> => {
  if (!ai) {
    return "AI Assistant is not configured (Missing API Key). Please contact support.";
  }

  try {
    const prompt = `
      You are an helpful educational assistant for the online learning platform Krutanic.
      
      Context: The user is looking at a course titled "${course.title}".
      Description: ${course.shortDescription}
      Syllabus topics: ${course.syllabus.map(m => m.title).join(', ')}.
      
      User Question: "${query}"
      
      Answer briefly and encouragingly. Focus on how this course helps their career.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I couldn't generate an answer right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI service right now.";
  }
};
