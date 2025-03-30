import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeResumewithJD(resumeText, jobDescription) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    You are an AI resume analyzer. Analyze the following resume text and extract key skills, technologies, and professional highlights from the text and match it accordingly with 
    the given job description.

    **Resume Text:** 
    ${resumeText}

    **Job Description**
    ${jobDescription}

    JD refers to Job Description given.

    Return a structured JSON response with:
    - ATS Score according to the match with JD
    - Skills that match from resume and JD
    - Key technologies that match from resume and JD
    - Professional strengths or key takeaways according to the JD/role requirement
    - do's to improve the resume
    - don't or things to avoid

    Example output:
    {
      "ats_score": 65.3/100,
      "skills": ["React.js", "Node.js", "MongoDB", "Docker"],
      "technologies": ["AWS", "Kubernetes", "GraphQL"],
      "strengths": ["Strong problem-solving skills", "Experience in full-stack development"],
      "do_suggestions": ["Add CI/CD pipelines in your resume"](list the skills that are present in JD but not in the resume),
      "dont_suggestions":["Remove profile from the resume","Avoid adding personal information in the projects section"](suggest to remove irrelevant content)
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
        console.log(finalRes);
        return finalRes;

    } catch (error) {
        return { error: "Invalid AI response format" };
    }
}
