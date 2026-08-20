import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../Style/interview.scss'

const demoReport = {
	score: 88,
	technicalQuestions: [
		{
			question: 'In ProjectCamp, you modeled document-based data structures in MongoDB. How did you handle relationships between projects, tasks, and subtasks, and how would you optimize queries for deeply nested tasks to avoid performance degradation?',
			intention: 'To test MongoDB schema design skills, aggregation pipelines, referencing vs. embedding strategies, and scaling database design.',
			answer: 'Explain the decision-making process behind embedding vs. referencing. For highly dynamic, deeply nested tasks, referencing is often preferred to avoid the 16MB document size limit. Talk about compound indexes and aggregation pipelines using $lookup.'
		},
		{
			question: 'In your Credit Card Management project, you integrated Spring Security. How does Spring Security handle authentication and authorization under the hood?',
			intention: 'To evaluate your understanding of backend security architecture and role-based access control.',
			answer: 'Describe the SecurityFilterChain, AuthenticationManager, SecurityContextHolder, and how GrantedAuthority is used to enforce roles on protected routes.'
		},
		{
			question: 'How would you optimize a high-frequency backend API endpoint that calculates dependent task schedules?',
			intention: 'Tests algorithmic thinking, optimization strategies, and practical graph theory.',
			answer: 'Model the task dependencies as a DAG and use topological sort in O(V + E). Add caching with Redis for recurrent queries while keeping invalidation tied to dependency changes.'
		}
	],
	behavioralQuestions: [
		{
			question: 'Tell me about a time during a high-pressure project when you faced a major technical disagreement with a teammate, and how you resolved it.',
			intention: 'Assess leadership, conflict resolution, communication, and decision-making.',
			answer: 'Use the STAR method. Explain the disagreement, compare options objectively, and show how you reached a practical compromise while protecting team momentum.'
		},
		{
			question: 'How did you self-manage the learning curve when working outside your core technical domain?',
			intention: 'To test learning agility, self-motivation, and adaptability.',
			answer: 'Discuss a systematic approach: start with documentation, build a small experiment, isolate bottlenecks, and turn the result into a clean reusable implementation.'
		}
	],
	skillGaps: [
		{ skill: 'Cloud Platforms (AWS/Azure/GCP)', severity: 'medium' },
		{ skill: 'Containerization & DevOps', severity: 'medium' },
		{ skill: 'TypeScript', severity: 'low' },
		{ skill: 'Unit and Integration Testing', severity: 'medium' }
	],
	preparationPlan: [
		{ day: 1, focus: 'Cloud Platforms and AWS Basics', tasks: ['Learn EC2, S3, RDS, and IAM permissions.', 'Deploy a simple Express.js or Spring Boot application.'] },
		{ day: 2, focus: 'Containerization with Docker', tasks: ['Study images, containers, volumes, and ports.', 'Write a Dockerfile and run the system with Docker Compose.'] },
		{ day: 3, focus: 'TypeScript Integration', tasks: ['Learn the syntax and benefits of TypeScript.', 'Refactor controllers and routes with types and interfaces.'] },
		{ day: 4, focus: 'Unit & Integration Testing', tasks: ['Understand the testing pyramid and TDD.', 'Implement unit and integration tests for API endpoints.'] },
		{ day: 5, focus: 'Advanced DB Query Optimization', tasks: ['Study execution plans and index types.', 'Practice MongoDB aggregation and query profiling.'] },
		{ day: 6, focus: 'System Design Fundamentals', tasks: ['Study load balancing, caching, and rate limiting.', 'Review your end-to-end system architecture.'] },
		{ day: 7, focus: 'Behavioral Preparation & Mock Interviewing', tasks: ['Draft STAR method answers.', 'Perform a mock SDE-I interview simulation.'] }
	]
}

const sections = [
	{ id: 'technicalQuestions', label: 'Technical questions', icon: '⌘' },
	{ id: 'behavioralQuestions', label: 'Behavioral questions', icon: '◌' },
	{ id: 'preparationPlan', label: 'Road Map', icon: '↗' }
]

const Interview = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const report = location.state?.report ?? demoReport
	const [activeSection, setActiveSection] = useState('technicalQuestions')
	const [activeQuestion, setActiveQuestion] = useState(0)

	const questions = useMemo(() => report[activeSection] ?? [], [report, activeSection])
	const currentQuestion = questions[activeQuestion]

	const selectSection = (section) => {
		setActiveSection(section)
		setActiveQuestion(0)
	}

	return (
		<div className="interview-page">
			<header className="interview-topbar">
				<button className="interview-brand" type="button" onClick={() => navigate('/')}>
					<span className="brand-mark" aria-hidden="true">◈</span>
					<span>Interview<span>AI</span></span>
				</button>
				<div className="report-title">
					<span className="eyebrow">PERSONALIZED REPORT</span>
					<strong>Interview preparation plan</strong>
				</div>
				<div className="score-chip"><span>Overall score</span><strong>{report.score}<small>/100</small></strong></div>
			</header>

			<main className="interview-workspace">
				<aside className="interview-sidebar" aria-label="Report sections">
					<div className="sidebar-intro"><span className="sidebar-kicker">YOUR PLAN</span><h1>Interview<br /><em>roadmap</em></h1><p>Use your report to focus your preparation where it matters most.</p></div>
					<nav>
						{sections.map((section) => (
							<button className={activeSection === section.id ? 'side-link is-active' : 'side-link'} type="button" key={section.id} onClick={() => selectSection(section.id)}>
								<span className="side-icon" aria-hidden="true">{section.icon}</span><span>{section.label}</span><span className="side-arrow" aria-hidden="true">→</span>
							</button>
						))}
					</nav>
					<div className="sidebar-note"><span aria-hidden="true">✦</span><p>Small, focused practice sessions compound into confident interviews.</p></div>
				</aside>

				<section className="interview-main" aria-live="polite">
					<div className="content-heading"><div><span className="section-kicker">{activeSection === 'preparationPlan' ? 'SEVEN DAY PLAN' : 'QUESTION BANK'}</span><h2>{activeSection === 'preparationPlan' ? 'Your preparation roadmap' : activeSection === 'technicalQuestions' ? 'Technical questions' : 'Behavioral questions'}</h2></div><span className="question-count">{activeSection === 'preparationPlan' ? `${report.preparationPlan.length} days` : `${questions.length} questions`}</span></div>

					{activeSection === 'preparationPlan' ? (
						<div className="roadmap-list">
							{report.preparationPlan.map((day) => <article className="roadmap-item" key={day.day}><span className="day-number">{String(day.day).padStart(2, '0')}</span><div><span className="day-label">DAY {day.day}</span><h3>{day.focus}</h3><ul>{day.tasks.map((task) => <li key={task}>{task}</li>)}</ul></div><span className="roadmap-check" aria-hidden="true">○</span></article>)}
						</div>
					) : currentQuestion ? (
						<article className="question-card">
							<div className="question-meta"><span>QUESTION {String(activeQuestion + 1).padStart(2, '0')}</span><span className="meta-dot"></span><span>{activeSection === 'technicalQuestions' ? 'TECHNICAL' : 'BEHAVIORAL'}</span></div>
							<h3>{currentQuestion.question}</h3>
							<div className="insight-block"><span className="insight-label">WHAT THIS TESTS</span><p>{currentQuestion.intention}</p></div>
							<div className="answer-block"><span className="answer-label">STRONG ANSWER DIRECTION</span><p>{currentQuestion.answer}</p></div>
							<div className="question-controls"><button type="button" disabled={activeQuestion === 0} onClick={() => setActiveQuestion((value) => value - 1)}>← Previous</button><div className="progress-dots">{questions.map((question, index) => <button type="button" aria-label={`Question ${index + 1}`} className={index === activeQuestion ? 'is-active' : ''} key={question.question} onClick={() => setActiveQuestion(index)}></button>)}</div><button type="button" disabled={activeQuestion === questions.length - 1} onClick={() => setActiveQuestion((value) => value + 1)}>Next →</button></div>
						</article>
					) : <div className="empty-state">No questions are available in this report yet.</div>}
				</section>

				<aside className="interview-insights">
					<section className="insight-panel skill-panel"><div className="panel-title"><div><span className="section-kicker">FOCUS AREAS</span><h2>Skill gaps</h2></div><span className="panel-icon" aria-hidden="true">◎</span></div><div className="skill-list">{report.skillGaps.map((item) => <div className="skill-row" key={item.skill}><span>{item.skill}</span><b className={`severity-${item.severity}`}>{item.severity}</b></div>)}</div></section>
					<section className="insight-panel score-panel"><span className="section-kicker">READINESS SNAPSHOT</span><div className="score-ring"><strong>{report.score}</strong><span>readiness</span></div><p>Your fundamentals are strong. Put your next practice hours into the focus areas above.</p></section>
					<button className="back-home" type="button" onClick={() => navigate('/')}><span aria-hidden="true">←</span> Back to dashboard</button>
				</aside>
			</main>
		</div>
	)
}

export default Interview
