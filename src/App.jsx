import { useEffect, useState } from "react";
import "./App.css";
import profile from "./assets/profile.png";
import closetloopIcon from "./assets/closetloop/closetloopIcon.png";

const videoResumeUrl = "https://youtu.be/PvIJS1rrU34";
const videoResumeEmbedUrl =
  "https://www.youtube-nocookie.com/embed/PvIJS1rrU34?rel=0";
const linkedinUrl = "https://www.linkedin.com/in/thea-mallare/";
const githubUrl = "https://github.com/TheaAnneMaeMallare";
const emailAddress = "theaannemae.mallare@gmail.com";
const phoneNumber = "09216850223";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certifications" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const blogPosts = [
  {
    title: "Living the IT Student Life in the New Era",
    date: "2025-04-02",
    excerpt:
      "Being an IT student today means learning in the same digital environments that already shape the industry. From cloud-based labs to virtual collaboration, college feels less like traditional coursework and more like preparation for real technical work.",
    body:
      "Being an IT student today is nothing like it was a decade ago. In this digital-first age, we're not just studying technology; we're immersed in it. Every day in college feels like a hands-on workshop. It prepares us for a future that's already arriving. From cloud computing labs to virtual simulations, the tools we use reflect real-world IT environments. Our assignments often look more like freelance gigs: configuring networks, building websites, deploying apps, rather than traditional homework. With AI, cybersecurity, and remote systems growing fast, our courses adapt quickly to what's happening in the tech industry. Being a student now also means learning how to filter information, manage digital overload, and find focus in an endless stream of online tools. The pressure to keep up is real. Still, the excitement of working with emerging tech, experimenting with code, and seeing real results from what we learn is what keeps most of us going. College today is more than just a degree. It's a launchpad. It's where late nights debugging code and collaborating over Discord become part of the process. It's where IT becomes more than a subject. It becomes a mindset. I wouldn't trade that experience for anything.",
  },
  {
    title: "From Newscaster Dreams to Building a Future in IT",
    date: "2025-05-05",
    excerpt:
      "A shift from wanting to tell stories in front of a camera to building systems behind the screen. The same drive to communicate and make an impact simply found a new direction through technology.",
    body:
      "Growing up, I had one dream: to be a newscaster. I loved the spotlight, the storytelling, and the power of voice and presence. I imagined myself delivering the news, connecting with people, and shaping how they saw the world. But somewhere along the way, that dream started to shift. It began with small things. Helping classmates fix their computers, exploring tech forums, getting curious about how websites worked. I slowly realized I was more excited about learning how data moves through networks than preparing news scripts. The big moment came when I saw how technology could make just as much of an impact. It wasn’t just behind the scenes anymore. Tech was shaping the world. I found I could still connect with people and tell stories, but in a different way. I could solve problems, build systems, and help others navigate the digital space. So I changed direction, enrolled in an IT program, and started building a new kind of future. My early dream taught me how to communicate and stay composed under pressure. That still helps me today. Now, I’m writing a different story. One made of code, systems, and purpose.",
  },
];

const featuredProject = {
  title: "ClosetLoop",
  subtitle: "Mobile Platform for Swapping, Giveaway, and DIY Upcycling",
  description:
    "ClosetLoop is a hyperlocal mobile application designed to promote sustainable clothing practices through organized clothing swaps, giveaways, and DIY upcycling. The platform allows users to upload unused clothing items, discover nearby listings through location-based filtering, arrange exchanges, participate in community swap events, and explore creative upcycling tutorials through an integrated DIY Hub.",
  features: [
    "Clothing swap and giveaway system",
    "Location-based item discovery and filtering",
    "Transaction management and coordination",
    "Upcycling DIY Hub",
    "Community swap events",
    "User reporting and moderation",
    "Notifications and inbox system",
    "Web-based admin dashboard",
  ],
  stack: [
    "React Native",
    "TypeScript",
    "Firebase",
    "Cloud Firestore",
    "Firebase Authentication",
    "Firebase Cloud Messaging",
    "Cloudinary",
    "React",
    "Vite",
  ],
  role:
    "Part of a three-member capstone team. I contributed to the overall paper, system planning, and selected parts of the ClosetLoop mobile application, while taking the main responsibility for designing and developing the full web-based Admin Dashboard. My admin-side work included report management, event management, user monitoring, item and DIY post moderation, transaction viewing, analytics, and administrative controls.",
  links: [
    {
      label: "View Admin Dashboard",
      href: "https://closetloopapp.web.app/",
    },
    {
      label: "Download APK",
      href: "https://drive.google.com/file/d/1XB3WEPCz06UQxjDTS83Sh39bFio_GxEX/view?usp=sharing",
    },
  ],
  gallery: [
    {
      title: "Mobile Login & Swapping Preview",
      label: "Mobile App",
      summary:
        "The onboarding and trading flow introduces the platform clearly while keeping swapping and item discovery approachable.",
    },
    {
      title: "Mobile Home & DIY Hub Preview",
      label: "Mobile App",
      summary:
        "A content-rich home screen that blends discovery, community activity, and upcycling inspiration in one place.",
    },
    {
      title: "Admin Dashboard Analytics",
      label: "Admin Dashboard",
      summary:
        "A high-level monitoring view for trends, activity, and platform health across the ClosetLoop ecosystem.",
    },
    {
      title: "Admin Reports & Monitoring",
      label: "Admin Dashboard",
      summary:
        "Moderation-focused tools for handling reports, reviewing users, and keeping marketplace activity safe.",
    },
  ],
};

const closetloopModules = import.meta.glob(
  "./assets/closetloop/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const projectGallery = Object.entries(closetloopModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .filter(([path]) => !path.toLowerCase().includes("closetloopicon"))
  .map(([path, src], index) => ({
    src,
    alt: featuredProject.gallery[index]?.title ?? `ClosetLoop screenshot ${index + 1}`,
    title:
      featuredProject.gallery[index]?.title ?? `ClosetLoop screenshot ${index + 1}`,
    label: featuredProject.gallery[index]?.label ?? "ClosetLoop",
    summary:
      featuredProject.gallery[index]?.summary ??
      "A closer look at one part of the ClosetLoop experience.",
    filename: path.split("/").pop() ?? `ss${index + 1}`,
  }));

const certificationModules = import.meta.glob(
  "./assets/certifications/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const certifications = Object.entries(certificationModules)
  .map(([path, src]) => {
    const filename = path.split("/").pop()?.replace(/\.[^/.]+$/, "") ?? "";
    const label = filename
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\s+/g, " ")
      .trim();

    return {
      src,
      title: label,
      filename,
      category: filename.toLowerCase().startsWith("tesda") ? "TESDA" : "Certificate",
      description: filename.toLowerCase().startsWith("tesda")
        ? "A practical skills certification focused on applied creative or digital training through TESDA coursework."
        : "A learning milestone that reflects continued training in cloud platforms, databases, AI, and technical foundations.",
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

function GitHubMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56 0-.28-.01-1.2-.02-2.17-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.71 1.27 3.37.97.1-.75.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.18a11 11 0 0 1 5.81 0c2.21-1.49 3.18-1.18 3.18-1.18.64 1.59.24 2.77.12 3.06.74.8 1.19 1.83 1.19 3.09 0 4.44-2.69 5.41-5.25 5.69.41.36.78 1.08.78 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56a11.53 11.53 0 0 0 7.84-10.92C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedProjectShot, setSelectedProjectShot] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [certificatePage, setCertificatePage] = useState(0);
  const [certificatesPerPage, setCertificatesPerPage] = useState(3);
  const [certificateDirection, setCertificateDirection] = useState("forward");

  const activeProjectShot = projectGallery[activeProjectIndex] ?? projectGallery[0];

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("tm-portfolio-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      return;
    }

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("tm-portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && navItems.some((item) => item.id === hash)) {
        setActiveSection(hash);
      }
    };

    const syncActiveSection = () => {
      const offset = window.scrollY + 160;
      const currentSection =
        sections.findLast((section) => section.offsetTop <= offset) ?? sections[0];

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    syncHash();
    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  useEffect(() => {
    const syncCertificatesPerPage = () => {
      if (window.innerWidth <= 650) {
        setCertificatesPerPage(1);
        return;
      }

      if (window.innerWidth <= 1100) {
        setCertificatesPerPage(2);
        return;
      }

      setCertificatesPerPage(3);
    };

    syncCertificatesPerPage();
    window.addEventListener("resize", syncCertificatesPerPage);

    return () => window.removeEventListener("resize", syncCertificatesPerPage);
  }, []);

  const totalCertificatePages = Math.ceil(
    certifications.length / certificatesPerPage,
  );
  const visibleCertificates = certifications.slice(
    certificatePage * certificatesPerPage,
    certificatePage * certificatesPerPage + certificatesPerPage,
  );

  useEffect(() => {
    setCertificatePage((currentPage) =>
      Math.min(currentPage, Math.max(totalCertificatePages - 1, 0)),
    );
  }, [totalCertificatePages]);

  const changeCertificatePage = (nextPage) => {
    if (nextPage === certificatePage) {
      return;
    }

    setCertificateDirection(nextPage > certificatePage ? "forward" : "backward");
    setCertificatePage(nextPage);
  };

  return (
    <main className="portfolio-page">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">&lt;/&gt;</span>
          <span className="brand-name">TM.Portfolio</span>
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "active" : ""}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={() =>
            setTheme((currentTheme) =>
              currentTheme === "dark" ? "light" : "dark",
            )
          }
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>

      </nav>

      <section className="hero" id="home">
        <div className="side-line">
          <span></span>
          <p>BSIT • Portfolio</p>
          <span></span>
        </div>

        <div className="hero-content">
          <p className="eyebrow">Hello, I&apos;m</p>

          <h1 className="hero-name">
            <span className="hero-name-intro">Thea Anne Mae E.</span>
            <span className="hero-name-highlight">Mallare</span>
          </h1>

          <p className="roles">IT Student • Developer • Problem Solver</p>

          <p className="intro">
            I build digital experiences with a passion for clean code, creative
            design, and technology. Turning ideas into impactful solutions.
          </p>

          <div className="hero-actions">
            <a
              href="/Mallare_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-action-btn hero-action-primary"
            >
              View Resume <span>↗</span>
            </a>
            <a href="#contact" className="hero-action-btn hero-action-secondary">
              Contact Me
            </a>
          </div>

          <div className="hero-highlights" aria-label="Quick profile highlights">
            <div className="highlight-card">
              <span className="highlight-label">Focus</span>
              <strong>Frontend and UI-driven builds</strong>
            </div>

            <div className="highlight-card">
              <span className="highlight-label">Style</span>
              <strong>Clean, simple, and easy to use</strong>
            </div>

            <div className="highlight-card">
              <span className="highlight-label">Goal</span>
              <strong>Creating work that feels clear and polished</strong>
            </div>
          </div>

          <div className="socials">
            <p>Find me on</p>
            <div>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub profile"
              >
                <GitHubMark className="icon-mark" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open LinkedIn profile"
              >
                in
              </a>
              <a href={`mailto:${emailAddress}`} aria-label="Send an email">
                @
              </a>
              <a
                href={videoResumeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open video resume"
              >
                VR
              </a>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="pink-orbit"></div>
          <div className="glow-circle"></div>

          <div className="portrait-shell">
            <div className="portrait-aura"></div>
            <img src={profile} alt="Thea Anne Mae E. Mallare" />
          </div>

          <div className="info-card top-card">
            <span className="code-icon">&lt;/&gt;</span>
            <p>
              Passionate about creating solutions that make an{" "}
              <strong>impact.</strong>
            </p>
          </div>

          <div className="info-card code-card">
            <pre>{`function createImpact() {
  let passion = true;
  let ideas = creative;

  return buildSomething(
    passion, ideas
  );
}`}</pre>
          </div>
        </div>
      </section>

      <section className="content-section" id="about">
        <div className="section-heading">
          <p>About</p>
          <h2>Focused on design, logic, and real-world usability.</h2>
        </div>
        <div className="section-card about-card">
          <p>
            I am an IT student who enjoys building interfaces that look refined
            and behave clearly across devices. My work combines visual design,
            frontend structure, and practical problem solving, with a strong
            interest in systems that are organized, usable, and easy to manage.
          </p>

          <div className="about-subsections">
            <div className="about-subsection">
              <h3>Core Areas</h3>
              <div className="about-chip-list">
                <span className="about-chip">Frontend Development</span>
                <span className="about-chip">Admin Dashboard Systems</span>
                <span className="about-chip">UI/UX Design</span>
                <span className="about-chip">Firebase Integration</span>
                <span className="about-chip">Responsive Interfaces</span>
              </div>
            </div>

            <div className="about-subsection">
              <h3>Technologies &amp; Tools</h3>
              <p className="about-tools-line">
                React Native • React • Firebase • JavaScript • TypeScript •
                Vite
              </p>
            </div>
          </div>
        </div>
        <div className="video-resume-card">
          <div className="video-resume-header">
            <div className="video-resume-copy">
              <span className="video-badge">Video Resume</span>
              <h3>Introduction and experience summary</h3>
            </div>
          </div>

          <div className="video-resume-frame">
            <iframe
              src={videoResumeEmbedUrl}
              title="Video resume"
              className="video-resume-embed"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>      </section>

      <section className="content-section" id="projects">
        <div className="section-heading">
          <p>Projects</p>
          <h2>Selected work and portfolio-ready outputs.</h2>
        </div>
        <article className="section-card featured-project">
          <div className="project-head">
            <div>
              <p className="project-label">Featured Project</p>
              <h3>{featuredProject.title}</h3>
              <p className="project-subtitle">{featuredProject.subtitle}</p>
              <a
                href="https://drive.google.com/file/d/1XB3WEPCz06UQxjDTS83Sh39bFio_GxEX/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="project-app-icon"
                aria-label="Download ClosetLoop APK"
              >
                <img src={closetloopIcon} alt="ClosetLoop app icon" />
              </a>
            </div>
            <div className="project-links">
              {featuredProject.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link-chip"
                >
                  {link.label} <span>↗</span>
                </a>
              ))}
            </div>
          </div>

          <p className="project-description">{featuredProject.description}</p>

          <div className="project-detail-grid">
            <div className="project-detail-card">
              <h4>Key Features</h4>
              <div className="project-tag-list">
                {featuredProject.features.map((feature) => (
                  <span key={feature} className="project-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-detail-card">
              <h4>Tech Stack</h4>
              <div className="project-tag-list">
                {featuredProject.stack.map((item) => (
                  <span key={item} className="project-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="project-role-card">
            <h4>Role</h4>
            <p>{featuredProject.role}</p>
          </div>

          <div className="project-gallery-card">
            <div className="project-gallery-heading">
              <div>
                <h4>Project Gallery</h4>
                <p>Mobile and admin-side views from the ClosetLoop experience.</p>
              </div>
              <div className="project-gallery-meta">
                <span>{projectGallery.length} screens</span>
                <span>Tap a thumbnail to switch</span>
              </div>
            </div>

            {activeProjectShot ? (
              <div className="project-gallery-showcase">
                <button
                  type="button"
                  className="project-gallery-spotlight"
                  onClick={() => setSelectedProjectShot(activeProjectShot)}
                >
                  <img
                    src={activeProjectShot.src}
                    alt={activeProjectShot.alt}
                    className="project-gallery-hero-image"
                  />
                  <span className="project-gallery-open">Open full preview</span>
                </button>

                <div className="project-gallery-panel">
                  <span className="project-gallery-type">
                    {activeProjectShot.label}
                  </span>
                  <h5>{activeProjectShot.title}</h5>
                  <p>{activeProjectShot.summary}</p>

                  <div className="project-gallery-actions">
                    <button
                      type="button"
                      className="project-gallery-nav"
                      onClick={() =>
                        setActiveProjectIndex((currentIndex) =>
                          currentIndex === 0
                            ? projectGallery.length - 1
                            : currentIndex - 1,
                        )
                      }
                      aria-label="Show previous project screenshot"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="project-gallery-nav"
                      onClick={() =>
                        setActiveProjectIndex((currentIndex) =>
                          currentIndex === projectGallery.length - 1
                            ? 0
                            : currentIndex + 1,
                        )
                      }
                      aria-label="Show next project screenshot"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="project-gallery-list">
              {projectGallery.map((item, index) => (
                <button
                  key={item.filename}
                  type="button"
                  className={
                    index === activeProjectIndex
                      ? "project-gallery-shot active"
                      : "project-gallery-shot"
                  }
                  onClick={() => setActiveProjectIndex(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="project-gallery-image"
                  />
                  <span className="project-gallery-caption">
                    <strong>{item.title}</strong>
                    <small>{item.label}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="content-section" id="certificates">
        <div className="section-heading">
          <p>Certifications</p>
          <h2>Training, design, and technical learning milestones.</h2>
        </div>

        <div className="certifications-intro">
          <p>
            A selected view of my completed certificates across cloud,
            databases, design, and applied technology learning.
          </p>
          <div className="certifications-controls">
            <button
              type="button"
              className="certifications-nav"
              onClick={() =>
                changeCertificatePage(Math.max(certificatePage - 1, 0))
              }
              disabled={certificatePage === 0}
              aria-label="Previous certifications"
            >
              ←
            </button>
            <button
              type="button"
              className="certifications-nav"
              onClick={() =>
                changeCertificatePage(
                  Math.min(certificatePage + 1, totalCertificatePages - 1),
                )
              }
              disabled={certificatePage === totalCertificatePages - 1}
              aria-label="Next certifications"
            >
              →
            </button>
          </div>
        </div>

        <div className="certifications-carousel">
          <div
            key={`${certificatePage}-${certificatesPerPage}`}
            className={`certifications-grid certifications-grid-${certificateDirection}`}
            style={{
              gridTemplateColumns: `repeat(${visibleCertificates.length}, minmax(240px, 320px))`,
            }}
          >
            {visibleCertificates.map((certificate) => (
              <button
                key={certificate.filename}
                type="button"
                className="certificate-card"
                onClick={() => setSelectedCertificate(certificate)}
              >
                <img
                  src={certificate.src}
                  alt={certificate.title}
                  className="certificate-image"
                />
                <span className="certificate-overlay">
                  <span className="certificate-badge">{certificate.category}</span>
                  <span className="certificate-title">{certificate.title}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="certifications-dots" aria-label="Certification pages">
          {Array.from({ length: totalCertificatePages }, (_, index) => (
            <button
              key={index}
              type="button"
              className={
                index === certificatePage
                  ? "certifications-dot active"
                  : "certifications-dot"
              }
              onClick={() => changeCertificatePage(index)}
              aria-label={`Go to certification page ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="content-section" id="blog">
        <div className="section-heading">
          <p>Blog</p>
          <h2>Personal reflections on learning, technology, and direction.</h2>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.title} className="section-card blog-card">
              <div className="blog-meta">
                <span className="blog-date">{post.date}</span>
              </div>
              <h3>{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <p className="blog-body">{post.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section contact-section" id="contact">
        <div className="section-heading">
          <p>Contact</p>
          <h2>Let&apos;s talk about your next project.</h2>
        </div>

        <div className="contact-intro">
          <p>
            Open to collaborations, creative projects, and meaningful ideas.
            Let&apos;s create something thoughtful, functional, and impactful.
          </p>
        </div>

        <div className="section-card contact-panel">
          <div className="contact-copy">
            <div className="contact-copy-block">
              <span className="contact-mini-label">Reach Out</span>
              <h3>Best for collaborations, internships, and project discussions.</h3>
              <p>
                If you have an opportunity, idea, or role in mind, email is the
                best place to start and LinkedIn is the quickest way to connect.
              </p>
            </div>
            <div className="contact-actions">
              <a className="primary-btn" href={`mailto:${emailAddress}`}>
                <span className="contact-inline-icon">✉</span>
                Send Email
              </a>
              <a
                className="secondary-btn"
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-inline-icon">in</span>
                LinkedIn <span>↗</span>
              </a>
            </div>
          </div>

          <div className="contact-connect-card">
            <p className="contact-connect-label">Connect with me</p>
            <div className="contact-links">
              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                <span className="contact-link-main">
                  <span className="contact-link-icon">in</span>
                  <span>LinkedIn</span>
                </span>
                <span>↗</span>
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <span className="contact-link-main">
                  <span className="contact-link-icon">
                    <GitHubMark className="icon-mark" />
                  </span>
                  <span>GitHub</span>
                </span>
                <span>↗</span>
              </a>
              <a href={`tel:${phoneNumber}`}>
                <span className="contact-link-main">
                  <span className="contact-link-icon">☎</span>
                  <span>Phone</span>
                </span>
                <span>{phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedCertificate ? (
        <div
          className="certificate-modal"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="certificate-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="certificate-modal-close"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close certificate preview"
            >
              ×
            </button>
            <div className="certificate-modal-body">
              <img
                src={selectedCertificate.src}
                alt={selectedCertificate.title}
                className="certificate-modal-image"
              />
              <div className="certificate-modal-copy">
                <span className="certificate-badge">
                  {selectedCertificate.category}
                </span>
                <h3>{selectedCertificate.title}</h3>
                <p>{selectedCertificate.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedProjectShot ? (
        <div
          className="certificate-modal"
          onClick={() => setSelectedProjectShot(null)}
        >
          <div
            className="certificate-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="certificate-modal-close"
              onClick={() => setSelectedProjectShot(null)}
              aria-label="Close project screenshot preview"
            >
              ×
            </button>
            <div className="certificate-modal-body">
              <img
                src={selectedProjectShot.src}
                alt={selectedProjectShot.alt}
                className="certificate-modal-image"
              />
              <div className="certificate-modal-copy">
                <span className="certificate-badge">Project Gallery</span>
                <h3>{selectedProjectShot.title}</h3>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default App;


