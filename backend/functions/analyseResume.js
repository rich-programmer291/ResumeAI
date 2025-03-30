import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeResume(resumeText) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    You are an AI resume analyzer. Analyze the following resume text and extract key skills, technologies, and professional highlights.

    **Resume Text:** 
    ${resumeText}

    Return a structured JSON response with:
    - ATS Score in general
    - Extracted skills
    - Key technologies mentioned
    - Professional strengths or key takeaways
    - do's to improve the resume
    - don't or things to avoid

    Example output:
    {
      "ats_score": 65.3/100,
      "extracted_skills": ["React.js", "Node.js", "MongoDB", "Docker"],
      "technologies": ["AWS", "Kubernetes", "GraphQL"],
      "strengths": ["Strong problem-solving skills", "Experience in full-stack development"],
      "do_suggestions": ["Add more quantifiable achievements", "Include a summary section"],
      "dont_suggestions":["Remove profile from the resume","Avoid adding personal information in the projects section"]
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;


    try {
        const responseText = response.text();
        const cleanResponse = responseText
            .replace(/```json/g, '')  // Remove opening code block
            .replace(/```/g, '');

        const finalRes = JSON.parse(cleanResponse);
        return finalRes;

    } catch (error) {
        return { error: "Invalid AI response format" };
    }
}
