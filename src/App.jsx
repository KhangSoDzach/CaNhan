import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, ExternalLink, Layout, Database, Terminal,
  Menu, X, Download, MessageCircle, Send, Bot, User, Loader2, Sparkles,
  Server, GraduationCap, Trophy, Briefcase
} from 'lucide-react';

// --- DATA CONFIGURATION (ENGLISH) ---

const PERSONAL_INFO = {
  name: "Dang Bao Khang",
  role: "Fullstack Developer Intern",
  tagline: "Final-year Software Engineering student specializing in MERN stack development and RESTful API design.",
  about: "I am a final-year Software Engineering student at Ton Duc Thang University. Experienced in building fullstack applications with authentication (JWT), role-based access control (RBAC), and scalable database architectures (MongoDB, PostgreSQL). I also have hands-on experience with Dockerized deployment and modern frontend development using React.",
  email: "exal799@gmail.com",
  github: "https://github.com/KhangSoDzach",
  linkedin: "https://www.linkedin.com/in/khang-dang-282293374/",
  // resumeLink: "#"
};

const SKILLS = [
  {
    category: "Frontend",
    icon: <Layout className="w-6 h-6" />,
    items: ["React.js", "Tailwind CSS", "TypeScript", "JavaScript (ES6+)", "HTML/CSS"]
  },
  {
    category: "Backend",
    icon: <Server className="w-6 h-6" />,
    items: ["Node.js", "Express.js", "FastAPI", "Java 17", "Spring Boot 3"]
  },
  {
    category: "Database",
    icon: <Database className="w-6 h-6" />,
    items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"]
  },
  {
    category: "DevOps & Tools",
    icon: <Terminal className="w-6 h-6" />,
    items: ["Git", "Docker", "Postman", "CI/CD (GitHub Actions)"]
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "TechShop E-commerce Platform",
    description: "An e-commerce platform for computer parts featuring secure checkout, real-time inventory, and admin management. Architected scalable MongoDB schema, containerized with Docker, and established CI/CD pipelines via GitHub Actions.",
    techStack: ["NodeJS", "ExpressJS", "MongoDB Atlas", "Redis", "Docker", "GitHub Actions"],
    demoLink: "#",
    repoLink: "https://github.com/KhangSoDzach/Final_NodeJS",
    image: "https://placehold.co/600x400/1e3a5f/white?text=TechShop+Platform"
  },
  {
    id: 2,
    title: "Apartment Management System",
    description: "An apartment management platform automating building operations. Engineered a pro-rata billing engine reducing manual accounting by 80%, and developed a responsive React frontend with 15+ dynamic dashboards.",
    techStack: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Supabase"],
    demoLink: "https://finalsoareact1.vercel.app",
    repoLink: "https://github.com/KhangSoDzach/finalsoa_react",
    image: "https://placehold.co/600x400/134e4a/white?text=Apartment+Manager"
  },
  {
    id: 3,
    title: "Manga Reader Website",
    description: "Developing a high-performance manga reader platform integrating MangaDex API. Focused on delivering a seamless reading experience with modern UI/UX. (In Progress)",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MangaDex API"],
    demoLink: "#",
    repoLink: "https://github.com/KhangSoDzach",
    image: "https://placehold.co/600x400/3b1f6e/white?text=Manga+Reader"
  }
];

const TIMELINE = [
  {
    id: 1,
    role: "Fullstack Developer Intern",
    organization: "RikkeiSoft HCM",
    period: "01/2026 - Present",
    description: "Engineered scalable RESTful APIs using Spring Boot. Designed PostgreSQL schema with JPA Auditing. Integrated OpenAPI/Swagger and containerized backend using Docker.",
    type: "experience"
  },
  {
    id: 2,
    role: "Bachelor of Software Engineering",
    organization: "Ton Duc Thang University",
    period: "Expected Graduation: 2026",
    description: "Major in Software Engineering. Core coursework: Data Structures & Algorithms, Web Development, Database Systems, Software Architecture.",
    type: "education"
  },
  {
    id: 3,
    role: "Certifications",
    organization: "British Council & Google",
    period: "2024 - Present",
    description: "Aptis General: 166 (CEFR Level B2) | Gemini Certified University Student",
    type: "achievement"
  }
];

// --- AI CHATBOT COMPONENT ---

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: `Hi! I'm ${PERSONAL_INFO.name}'s AI Assistant. Ask me about his projects, skills, or experience at RikkeiSoft!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const contextData = `
        You are an AI assistant for a developer portfolio website. Here is the candidate's information:

        Name: ${PERSONAL_INFO.name}
        Role: ${PERSONAL_INFO.role}
        About: ${PERSONAL_INFO.about}

        Current Experience:
        - Fullstack Developer Intern at RikkeiSoft HCM (01/2026 - Present)
        - Working with Spring Boot, PostgreSQL (JPA Auditing), OpenAPI/Swagger, and Docker.

        Education:
        - Bachelor of Software Engineering at Ton Duc Thang University (Expected 2026)

        Certifications:
        - Aptis General English: 166 points (CEFR Level B2) — issued by British Council
        - Gemini Certified University Student — issued by Google

        Technical Skills:
        - Frontend: React.js, Tailwind CSS, TypeScript, JavaScript (ES6+), HTML/CSS
        - Backend: Node.js, Express.js, FastAPI, Java 17, Spring Boot 3
        - Database: MongoDB, MySQL, PostgreSQL, Redis
        - DevOps & Tools: Git, Docker, Postman, CI/CD (GitHub Actions)

        Projects: ${JSON.stringify(PROJECTS)}
        Contact: ${PERSONAL_INFO.email}

        Instructions:
        1. Answer questions as if you represent the candidate, referring to him in the third person (e.g., "Khang has experience in...").
        2. Be professional, concise, and enthusiastic about his Fullstack Developer profile.
        3. Highlight his real-world internship at RikkeiSoft, his B2 English proficiency, and his MERN/Spring Boot skills.
        4. If asked about .NET or Unity, clarify that his current focus is Fullstack (MERN + Spring Boot), not .NET/Unity.
        5. If the answer isn't in the data, say "I don't have that specific information, but you can contact him directly at exal799@gmail.com."
        6. Keep answers concise (under 3 sentences) unless asked for details.
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
            systemInstruction: { parts: [{ text: contextData }] }
          })
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";

      setMessages(prev => [...prev, { role: 'model', text: botResponseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Oops! My brain is offline right now. Please try again later." }]);
      console.error("Gemini API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 sm:w-96 mb-4 overflow-hidden flex flex-col animate-fade-in-up" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-yellow-300" />
              <span className="font-bold">Portfolio AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                  <span className="text-xs text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400">Powered by Google Gemini</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center group"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />}
      </button>
    </div>
  );
};

// --- MAIN PORTFOLIO COMPONENTS ---

const NavLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
  >
    {children}
  </a>
);

const SectionTitle = ({ children, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{children}</h2>
    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
    {subtitle && <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
    <div className="relative overflow-hidden h-48">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-blue-600 hover:text-white transition-colors" title="View Demo">
          <ExternalLink size={20} />
        </a>
        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-gray-900 hover:text-white transition-colors" title="View Code">
          <Github size={20} />
        </a>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4 flex-1 text-sm leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.techStack.map((tech, index) => (
          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Timeline icon helper
const TimelineIcon = ({ type }) => {
  if (type === 'experience') return <Briefcase size={20} />;
  if (type === 'education') return <GraduationCap size={20} />;
  return <Trophy size={20} />;
};

// Timeline dot color helper
const timelineDotColor = (type) => {
  if (type === 'experience') return 'bg-blue-600';
  if (type === 'education') return 'bg-emerald-500';
  return 'bg-purple-500';
};

// Timeline icon bg color helper
const timelineIconBg = (type) => {
  if (type === 'experience') return 'bg-blue-100 text-blue-600';
  if (type === 'education') return 'bg-emerald-100 text-emerald-600';
  return 'bg-purple-100 text-purple-600';
};

// --- MAIN APP ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 selection:bg-blue-100 selection:text-blue-900">

      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Portfolio.
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#timeline">Experience & Education</NavLink>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
            >
              Contact Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col space-y-4">
            <NavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</NavLink>
            <NavLink href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</NavLink>
            <NavLink href="#timeline" onClick={() => setIsMenuOpen(false)}>Experience & Education</NavLink>
            <NavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Currently Interning at RikkeiSoft HCM
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Hi, I'm <span className="text-blue-600">{PERSONAL_INFO.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.role}
            </p>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-2xl">
              {PERSONAL_INFO.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects" className="px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 text-center">
                View Projects
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-white text-gray-700 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Github size={20} />
                GitHub Profile
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-20 right-0 -mr-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-40 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="/Profile.jpg"
                alt="Profile"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {PERSONAL_INFO.about}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-2xl mb-1">4th</h4>
                  <p className="text-sm text-gray-500">Year Student</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-2xl mb-1">B2</h4>
                  <p className="text-sm text-gray-500">English (Aptis)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="The tools and technologies I use to build fullstack web applications">
            Professional Skills
          </SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skillGroup, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  {skillGroup.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Notable fullstack applications showcasing backend architecture and frontend development">
            Featured Projects
          </SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
              View more on GitHub <ExternalLink size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCE & EDUCATION SECTION */}
      <section id="timeline" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionTitle subtitle="My professional experience, academic background, and certifications">
            Experience & Education
          </SectionTitle>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-8">
              {TIMELINE.map((item) => (
                <div key={item.id} className="relative pl-16">
                  {/* Icon dot on the line */}
                  <div className={`absolute left-0 top-5 w-12 h-12 rounded-full flex items-center justify-center shadow-md ${timelineIconBg(item.type)}`}>
                    <TimelineIcon type={item.type} />
                  </div>

                  {/* Card */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${timelineIconBg(item.type)}`}>
                        {item.type === 'experience' ? 'Experience' : item.type === 'education' ? 'Education' : 'Achievement'}
                      </span>
                      <span className="text-sm font-medium text-blue-600">{item.period}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mt-2">{item.role}</h3>
                    <h4 className="text-gray-500 font-medium mb-3">{item.organization}</h4>
                    {item.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something Together</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              I am actively looking for Fullstack Developer Intern or Fresher opportunities. I am ready to contribute with real-world experience from RikkeiSoft and a strong foundation in MERN + Spring Boot.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Send Email
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold text-white mb-1">{PERSONAL_INFO.name}</p>
            <p className="text-sm text-gray-400">{PERSONAL_INFO.role}</p>
            <p className="text-sm text-gray-500 mt-1">© 2026. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={24} /></a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={24} /></a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-colors"><Mail size={24} /></a>
          </div>
        </div>
      </footer>

      {/* AI CHATBOT WIDGET */}
      <AIChatWidget />
    </div>
  );
}