const  Resume=`
Rohan Deshmukh
B.E. Computer Engineering, Pune University (Expected 2026)

Skills: JavaScript, Node.js, Express, MongoDB, React, Java, C++, Git, REST APIs, JWT Authentication

Projects:

ATS Resume Checker (MERN) — Built a full-stack app with React frontend and Express backend, JWT-based cookie authentication, and a Gemini-powered resume analysis service using structured JSON output.
Task Manager API — Designed a RESTful backend with Mongoose schemas for nested sub-documents, role-based access control, and pagination.
Competitive Programming — Solved 300+ problems on LeetCode/Codeforces in Java and C++, focused on DSA fundamentals.

Experience:

Member, College R&D Club — Contributed to a team project prototyping IoT-based sensor data collection with a Node.js backend.

Education:

Diploma in Electronics & Telecommunication, followed by B.E. in Computer Engineering, SPPU-affiliated college, Pune
`
const SelfDescription=`
I'm a final-year engineering student who's spent the last year building full-stack projects on my own, mostly MERN stack. I like backend work the most — designing schemas, structuring APIs, and debugging tricky integration issues, like getting an LLM to actually respect a JSON schema instead of freestyling its output. I'm still building depth in testing and system design, but I learn fast and don't mind digging through SDK docs or error stacks until something works`

const JobDescription=`We're hiring a Full Stack Developer (MERN) to join our small product team. You'll build and maintain REST APIs with Node.js/Express, design MongoDB schemas, and work on a React frontend. Experience with JWT authentication, clean API design, and integrating third-party APIs (payment gateways, AI services, etc.) is a plus. This role suits someone comfortable working independently and picking up new tools quickly`

module.exports ={
    Resume,
    SelfDescription,
    JobDescription
}