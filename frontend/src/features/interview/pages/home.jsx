import '../Style/home.scss'
import {useInterview} from '../hooks/useinterview.js'
import { useEffect, useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
const Home = () => {

    const {loading, generateReport, reports, getAllReports} = useInterview();
    const navigate = useNavigate();
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [error, setError] = useState('');
    const [historyError, setHistoryError] = useState('');
    const resumeInputRef = useRef(null);

    useEffect(() => {
        getAllReports().catch((requestError) => {
            setHistoryError(requestError.message || 'Unable to load your report history.');
        });
    }, [getAllReports]);

    const handleGenerateReport = async () => {
       setError('');

       if (!jobDescription.trim() || !selfDescription.trim() || !resumeFile) {
           setError('Please provide the job description, self description, and a PDF resume.');
           return;
       }

       try {
           const data = await generateReport({ jobDescription, selfDescription, resumeFile });
           if (data?._id) {
               navigate(`/interview/${data._id}`);
           }
       } catch (requestError) {
           setError(requestError.message || 'Unable to generate your interview report.');
       }
    };

    if (loading) {
        return (
            <main className="loading-screen">
                <h1>Generating Interview Report...</h1>
            </main>
        );
    }

    return (
        <div className="home-page">
            <header className="topbar">
                <a className="brand" href="/" aria-label="InterviewAI home">
                    <span className="brand-mark" aria-hidden="true">◈</span>
                    <span>Interview<span>AI</span></span>
                </a>
                <nav className="main-nav" aria-label="Primary navigation">
                    <a className="nav-link is-active" href="/">⌂ <span>Home</span></a>
                    <a className="nav-link" href="#history">◷ <span>History</span></a>
                    <a className="nav-link" href="#tips">♧ <span>Tips</span></a>
                </nav>
                <button className="profile-button" type="button" aria-label="Open profile menu">
                    <span aria-hidden="true">●</span>
                    <span className="profile-chevron" aria-hidden="true">⌄</span>
                </button>
            </header>

            <main>
                <section className="hero" aria-labelledby="page-title">
                    <div className="hero-copy">
                        <span className="hero-spark hero-spark-left" aria-hidden="true">✧</span>
                        <h1 id="page-title">Create Your Custom<br /><strong>Interview Plan</strong></h1>
                        <span className="hero-spark hero-spark-right" aria-hidden="true">✦</span>
                        <p>Let our AI analyze the job requirements and your unique profile to build a<br className="desktop-only" /> winning strategy.</p>
                    </div>
                    <div className="hero-art" aria-hidden="true">
                        <div className="art-sheet"><span>●</span><i></i><i></i><i></i></div>
                        <div className="art-briefcase"><b></b></div>
                    </div>
                </section>

                <form className="planner-card">
                    <div className="job-panel panel-block">
                        <div className="section-heading">
                            <span className="section-icon" aria-hidden="true">▣</span>
                            <div>
                                <label htmlFor="jobDescription">Job Description</label>
                                <p>Paste the full job description here...</p>
                            </div>
                            <span className="character-count">{jobDescription.length} / 5000 characters</span>
                        </div>
                        <textarea 
                            name="jobDescription" 
                            id="jobDescription" 
                            maxLength="5000" 
                            placeholder="e.g. Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="candidate-panel panel-block">
                        <div className="section-heading">
                            <span className="section-icon" aria-hidden="true">▤</span>
                            <div>
                                <label htmlFor="resume">Resume Upload</label>
                                <p>Upload your resume in PDF format</p>
                            </div>
                        </div>
                        <label className="upload-zone" htmlFor="resume">
                            <span className="upload-icon" aria-hidden="true">↑</span>
                            <strong>{resumeFile ? resumeFile.name : 'Click to upload or drag & drop'}</strong>
                            <small>{resumeFile ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB selected` : 'PDF only (Max 3MB)'}</small>
                            <input
                                ref={resumeInputRef}
                                type="file"
                                name="resume"
                                id="resume"
                                accept=".pdf,application/pdf"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    if (!file) return;
                                    if (file.type !== 'application/pdf') {
                                        setResumeFile(null);
                                        setError('Please select a PDF file.');
                                        event.target.value = '';
                                        return;
                                    }
                                    if (file.size > 3 * 1024 * 1024) {
                                        setResumeFile(null);
                                        setError('The PDF must be smaller than 3 MB.');
                                        event.target.value = '';
                                        return;
                                    }
                                    setError('');
                                    setResumeFile(file);
                                }}
                            />
                        </label>
                        <div className="field-divider"></div>
                        <div className="section-heading self-heading">
                            <span className="section-icon" aria-hidden="true">●</span>
                            <div>
                                <label htmlFor="selfDescription">Self Description</label>
                                <p>Briefly describe your experience, key skills, and years of experience...</p>
                            </div>
                        </div>
                        <textarea 
                        onChange={(e) => setSelfDescription(e.target.value)}
                        name="selfDescription" id="selfDescription" placeholder="e.g. I am a software engineer with 4 years of experience in building scalable web applications using React and Node.js..."></textarea>
                    </div>

                    <button 
                    className="generate-button" type="button" onClick={handleGenerateReport}>
                        <span aria-hidden="true">✦</span>
                        Generate My Interview Strategy
                        <span aria-hidden="true">→</span>
                    </button>
                    {error && <p className="form-error" role="alert">{error}</p>}
                </form>

                <div className="benefits" aria-label="Interview plan benefits">
                    <span><b aria-hidden="true">ϟ</b> Personalized Prep Plan</span>
                    <i aria-hidden="true"></i>
                    <span><b aria-hidden="true">◎</b> Focus on Key Skills</span>
                    <i aria-hidden="true"></i>
                    <span><b aria-hidden="true">♕</b> Boost Your Confidence</span>
                </div>

                <section className="report-history" id="history" aria-labelledby="history-title">
                    <div className="history-heading">
                        <div>
                            <span className="history-kicker">YOUR WORKSPACE</span>
                            <h2 id="history-title">Previous interview reports</h2>
                        </div>
                        <span className="history-count">{reports.length} {reports.length === 1 ? 'report' : 'reports'}</span>
                    </div>

                    {historyError ? (
                        <p className="history-message form-error-static" role="alert">{historyError}</p>
                    ) : reports.length === 0 ? (
                        <div className="history-empty">
                            <span aria-hidden="true">◷</span>
                            <p>Your generated reports will appear here.</p>
                        </div>
                    ) : (
                        <div className="report-list">
                            {reports.map((item) => (
                                <button
                                    className="report-item"
                                    type="button"
                                    key={item._id}
                                    onClick={() => navigate(`/interview/${item._id}`)}
                                >
                                    <span className="report-icon" aria-hidden="true">✦</span>
                                    <span className="report-details">
                                        <strong>Interview preparation report</strong>
                                        <small>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently generated'}</small>
                                    </span>
                                    <span className="report-score"><b>{item.score ?? '--'}</b><small>/100</small></span>
                                    <span className="report-arrow" aria-hidden="true">→</span>
                                </button>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Home
