import React from "react";
import MacWindow from "./MacWindow";
import "./cli.scss";

import TerminalModule from "react-console-emulator";
const Terminal = TerminalModule.default;

const Cli = ({ windowName, setWindowsState }) => {

  const commands = {

    about: {
      description: "About me",
      usage: "about",
      fn: () =>
        "Devashish Sharma — GenAI-focused Full Stack Engineer building AI-powered developer tools, intelligent document systems, and agentic platforms.",
    },

    skills: {
      description: "List technical skills",
      usage: "skills",
      fn: () => `
Programming:
  C++, Java, Python, JavaScript

Frontend:
  React.js, TailwindCSS, GSAP, Framer Motion, Three.js

Backend:
  Node.js, Express.js, MongoDB, Supabase

GenAI:
  LangChain, RAG Architectures, Agent SDK, Vector Databases
  OpenAI API, Gemini API, Multi-modal LLMs

Data/ML:
  Scikit-learn, Pandas, NumPy, Matplotlib

Tools:
  Git, Docker, AWS, Linux
`,
    },

    projects: {
      description: "View my projects",
      usage: "projects",
      fn: () => `
1️⃣ GenAI Version Control System
   Stack: MERN, OpenAI API, Supabase, Three.js, Recharts
   → AI-powered code reviews + repository analytics platform

2️⃣ Policy Checker – AI PDF Query Platform
   Stack: Node.js, Express, MongoDB, Supabase, Gemini API
   → Ask questions on legal/insurance PDFs using RAG
`,
    },

    experience: {
      description: "Display work experience",
      usage: "experience",
      fn: () => `
Full Stack Web Development Intern
CodeAlpha (Remote) | Nov 2024 – Jan 2025

• Built backend for a Food Reel App using Node.js, Express, MongoDB
• Implemented JWT authentication and bcrypt security
• Designed modular Mongoose models
• Developed production-ready MVP supporting reels + uploads
`,
    },

    education: {
      description: "Show education background",
      usage: "education",
      fn: () => `
B.Tech Computer Science Engineering
Parul Institute of Engineering and Technology

Program: IEP with Oracle
CGPA: 7.4
Last Semester SGPA: 8.0
Expected Graduation: 2027
`,
    },

    contact: {
      description: "Get contact information",
      usage: "contact",
      fn: () => `
Name: Devashish Sharma

Email:
devashishsharma2157@gmail.com

Phone:
+91 6358006255

Location:
India
`,
    },

    github: {
      description: "Open GitHub profile",
      usage: "github",
      fn: () => {
        window.open(
          "https://github.com/DevashishSharma-codes",
          "_blank"
        );
        return "Opening GitHub...";
      },
    },

    linkedin: {
      description: "Open LinkedIn profile",
      usage: "linkedin",
      fn: () => {
        window.open(
          "https://www.linkedin.com/in/devashish-sharma-aa470832a",
          "_blank"
        );
        return "Opening LinkedIn...";
      },
    },

    certificates: {
      description: "View certifications",
      usage: "certificates",
      fn: () => `
• Oracle Java SE 17 Developer — Oracle
• SQL on Oracle Cloud — Oracle
`,
    },

    social: {
      description: "View social media links",
      usage: "social",
      fn: () => `
GitHub:
github.com/DevashishSharma-codes

LinkedIn:
linkedin.com/in/devashish-sharma-aa470832a
`,
    },

    echo: {
      description: "Echo a passed string",
      usage: "echo <string>",
      fn: (...args) => args.join(" "),
    },
  };

  const welcomeMessage = `
╔══════════════════════════════════════════════════╗
║        Devashish Sharma Portfolio CLI            ║
╚══════════════════════════════════════════════════╝

GenAI + Full Stack Developer

Welcome to my interactive developer terminal.

You can explore my work using commands.

Try these:

  about        → Who I am
  skills       → Tech stack
  projects     → AI + Full Stack projects
  experience   → Internship experience
  education    → Academic background
  contact      → Get in touch
  github       → Open GitHub
  linkedin     → Open LinkedIn

Type 'help' to see all commands.

Happy exploring 🚀
`;

  return (
    <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
      <div className="cli-window">
        <Terminal
          commands={commands}
          welcomeMessage={welcomeMessage}
          promptLabel={"devashish@portfolio:~$"}
          promptLabelStyle={{ color: "#00ff00" }}
        />
      </div>
    </MacWindow>
  );
};

export default Cli;