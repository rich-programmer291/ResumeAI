import express from "express";
import cors from "cors";
import multer from "multer";
import pdfParse from "pdf-parse";
import dotenv from "dotenv";
import { analyzeResume } from "./functions/analyseResume.js";
import { analyzeResumewithJD } from "./functions/analyzeResumewithJD.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for file upload
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("resume"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("Uploaded File Details:", req.file); // Debugging

    try {
        const pdfData = await pdfParse(req.file.buffer);
        console.log("Extracted Text:", pdfData.text.slice(0, 100)); // Debugging (showing first 100 chars)
        res.json({ extractedText: pdfData.text });
    } catch (error) {
        console.error("Error parsing PDF:", error); // Debugging
        res.status(500).json({ error: "Error parsing PDF" });
    }
});

app.post('/analyze', upload.single("resume"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const pdfText = await pdfParse(req.file.buffer);
        // console.log(pdfText);
        const aiAnalysis = await analyzeResume(pdfText.text);
        console.log(aiAnalysis, "SERVER RESPONSE");
        res.status(200).json({ data: aiAnalysis });
    } catch (error) {
        res.status(500).json({ error: "Error processing AI analysis" });
    }
});

app.post('/analyze-with-jd', upload.single("resume"), async (req, res) => {
    console.log(req.body);
    const {jobDesc} = req.body;

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    if (!jobDesc) return res.status(400).json({ error: "No Job Description provided" });
    console.log(jobDesc);

    try{
        const pdfText = await pdfParse(req.file.buffer);
        const aiAnalysis = await analyzeResumewithJD(pdfText.text,jobDesc);
        console.log(aiAnalysis);
        res.status(200).json({ data: aiAnalysis });
    }
    catch(error){
        res.status(500).json({error: "Error processing AI analysis with Job Description."})
    }
})

app.listen(5000, () => console.log("Server running on port 5000"));
