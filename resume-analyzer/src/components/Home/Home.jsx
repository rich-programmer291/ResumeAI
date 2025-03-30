import React from "react";
import "./home.css";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to ResumeAi <sup><img width="24" height="24" src="https://img.icons8.com/ios-filled/50/FFFFFF/sparkling--v1.png" alt="sparkling"/></sup></h1>
        <p>Enhance your resume with AI-powered analysis and job description matching.</p>
        <a href="/scan" className="cta-button">Get Started</a>
      </header>

      <section className="features">
        <h2 className="hero-description">Why Choose ResumeAI?</h2>
        <div className="features-grid">
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/128/17218/17218162.png" alt="AI Analysis" />
            <h3>AI Resume Analysis</h3>
            <p>Get an ATS-friendly score and recommendations to improve your resume.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/128/4288/4288211.png" alt="JD Match" />
            <h3>Job Description Matching</h3>
            <p>Compare your resume with a job description and get tailored suggestions.</p>
          </div>
          <div className="feature">
            <img src="https://cdn-icons-png.flaticon.com/128/12489/12489467.png" alt="Resume Tips" />
            <h3>Improvement Suggestions</h3>
            <p>Receive AI-driven tips to make your resume stand out.</p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default Home;