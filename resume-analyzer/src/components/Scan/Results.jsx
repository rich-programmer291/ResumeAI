import React from 'react'

const Results = ({analysis, file}) => {
  return (
    <div>
        <div className="results">
                    <h2>Analysis Results <span className='filename'>for {file}</span></h2>
                    <hr className='divide'/>
                    <div>
                        <h3 >ATS Score:<span style={{color: (analysis?.ats_score ?? 0) < 50 ? "#9a262d" : "#3F7D58"}} className='score'>{analysis?.ats_score || "Couldn't Calculate"}</span></h3>
                    </div>

                    <div>
                        <h3>Extracted Skills:</h3>
                        <p>{analysis?.extracted_skills?.join(", ") || "No data"}</p>
                    </div>

                    <div>
                        <h3>Technologies:</h3>
                        <p>{analysis?.technologies?.join(", ") || "No data"}</p>
                    </div>

                    <div>
                        <h3>Strengths:</h3>
                        <p>{analysis?.strengths?.join(", ") || "No data"}</p>
                    </div>

                    <div>
                        <h3>Improvement Suggestions:</h3>
                        <h4>Do's</h4>
                            {analysis?.do_suggestions?.map((suggestion, index) => (
                                <p key={index}>✅ {suggestion}</p>
                            )) || "No suggestions"}
                        <h4>Don'ts</h4>
                        {analysis?.dont_suggestions?.map((suggestion, index) => (
                                <p key={index}>❌ {suggestion}</p>
                            )) || "No suggestions"}
    
                    </div>
                </div>
    </div>
  )
}

export default Results