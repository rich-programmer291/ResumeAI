import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast, Toaster } from 'react-hot-toast';
import Results from "./Results";
import './resumewithJD.css';

const ResumewithJD = () => {
    const [file, setFile] = useState(null);
    const [jd, setJd] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);

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

    const handleSubmit = async (event) =>{

        if (!file || !jd.trim()) {
            toast("Please upload a resume and enter a Job Description!");
            return;
          }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDesc", jd);

        try {
            const response = await fetch(`${backend_url}/analyze-with-jd`, {
              method: "POST",
              body: formData,
            });
            console.log(response);
            const data = await response.json();
            setAnalysis(data.data);
            setLoading(false);
            toast.success("Scroll Down to view the analysis.");
          } catch (error) {
            console.error("Error analyzing resume:", error);
            toast.error("Issue in analyzing the resume!");
          }

    }

    return (
        <div className="app__page">
            <h2 className="app__title">Resume Analyzer with JD</h2>
            <div className='app__container'>
                <div className="app__columns">
                    <div>
                        <textarea 
                        placeholder="Paste the Job Description here..." 
                        className={`app__JDinput ${isActive ? "active" : ""}`}
                        type="text" 
                        name="jd" 
                        onChange={(event) => setJd(event.target.value)} 
                        onFocus={()=>setIsActive(true)}
                        onBlur={() => setIsActive(false)}
                        />
                    </div>
                    <div>
                        <div {...getRootProps()} className={`app__dropzone ${isDragActive ? "active" : ""}`}>
                            <input {...getInputProps()} />
                            {isDragActive ? <p>Drop the file here...</p> : <p>Drag & drop a PDF, or click to select</p>}
                        </div>
                        <div className="app__file-space">
                            {file ? (<p className="app__file-info">Selected file: <img src="/file.png" className="file-icon" />
                                {file.name}</p>) : (<p className="app__file-info">Selected file: None</p>)}
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleSubmit} className="submit-btn app__btn" disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

            {error && <p className="error">{error}</p>}

            <div>
                {analysis && <Results analysis={analysis} file={file.name} />}
            </div>
            <Toaster />
        </div>

    )
}

export default ResumewithJD;