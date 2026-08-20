import '../Style/home.scss'

const Home = () => {
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
                            <span className="character-count">0 / 5000 characters</span>
                        </div>
                        <textarea name="jobDescription" id="jobDescription" maxLength="5000" placeholder="e.g. Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."></textarea>
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
                            <strong>Click to upload or drag &amp; drop</strong>
                            <small>PDF only (Max 5MB)</small>
                            <input type="file" name="resume" id="resume" accept=".pdf,application/pdf" />
                        </label>
                        <div className="field-divider"></div>
                        <div className="section-heading self-heading">
                            <span className="section-icon" aria-hidden="true">●</span>
                            <div>
                                <label htmlFor="selfDescription">Self Description</label>
                                <p>Briefly describe your experience, key skills, and years of experience...</p>
                            </div>
                        </div>
                        <textarea name="selfDescription" id="selfDescription" placeholder="e.g. I am a software engineer with 4 years of experience in building scalable web applications using React and Node.js..."></textarea>
                    </div>

                    <button className="generate-button" type="button">
                        <span aria-hidden="true">✦</span>
                        Generate My Interview Strategy
                        <span aria-hidden="true">→</span>
                    </button>
                </form>

                <div className="benefits" aria-label="Interview plan benefits">
                    <span><b aria-hidden="true">ϟ</b> Personalized Prep Plan</span>
                    <i aria-hidden="true"></i>
                    <span><b aria-hidden="true">◎</b> Focus on Key Skills</span>
                    <i aria-hidden="true"></i>
                    <span><b aria-hidden="true">♕</b> Boost Your Confidence</span>
                </div>
            </main>
        </div>
    )
}

export default Home
