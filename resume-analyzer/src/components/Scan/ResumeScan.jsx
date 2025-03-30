import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast, Toaster } from 'react-hot-toast';
import './resumeScan.css';
import Results from "./Results";

export default function ResumeScan() {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000" ;

    // Handle file drop
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ".pdf",
        multiple: false,
    });

    // Handle file upload and analyze
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            toast("⨁ Please Select or Drop a File!");
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("resume", file);

        try {
            const response = await fetch(`${backend_url}/analyze`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to analyze resume. Please try again.");
            }

            const responseData = await response.json();
            setAnalysis(responseData.data);
        } catch (err) {
            console.error("Error analyzing resume:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <h1 className="title">Resume Analyzer</h1>

                <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
                    <input {...getInputProps()} />
                    {isDragActive ? <p>Drop the file here...</p> : <p>Drag & drop a PDF, or click to select</p>}
                </div>

                {file && <p className="file-info">Selected file: <img src="/file.png" className="file-icon" />
                    {file.name}</p>}

                <button onClick={handleSubmit} className="submit-btn" disabled={loading}>
                    {loading ? "Analyzing..." : "Upload & Analyze"}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            
            <div>
            {analysis && <Results analysis={analysis} file={file.name} />}

            </div>
            <Toaster />
        </>

    );
}
