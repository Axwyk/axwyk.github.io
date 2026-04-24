import './App.css';
import { useState, useEffect } from 'react';
// import HeroWisps from './HeroWisps'; // --- IGNORE ---
import ParticlesBackground from './ParticlesBackground';
import ParticlesBackgroundStatic from './ParticlesBackgroundStatic';
import { FaGithub, FaLinkedin, FaEnvelope, FaLightbulb } from "react-icons/fa";
import { MdDataObject, MdEditNote, MdLightbulbOutline, MdBrightness5, MdBrightness7 } from "react-icons/md";
// Ruta pública del icono Vialtros
const vialtrosIcon = process.env.PUBLIC_URL + '/vialtros_icon.svg';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  // Animación de puntos en el fondo del hero
  const [showWisps, setShowWisps] = useState(true);

  const proyectos = [
      {
        id: 1,
        titulo: 'Vialtros',
        descripcion: 'Proyecto Vialtros publicado en GitHub Pages',
        tecnologias: ['HTML', 'CSS', 'JavaScript'],
        imagen: <img src={vialtrosIcon} alt="Vialtros icon" style={{width: 42, height: 42}} />, // Usar SVG
        link: 'https://axwyk.github.io/Vialtros/'
      },
    {
      id: 2,
      titulo: 'Generador de grafos',
      descripcion: 'Generador de diferentes algoritmos de grafos',
      tecnologias: ['Phyton'],
      imagen: <MdDataObject />,
      link: 'https://github.com/Axwyk/Grafos'
    },
    {
      id: 3,
      titulo: 'Portfolio Personal',
      descripcion: 'Primer proyecto de portfolio con HTML, CSS y React',
      tecnologias: ['HTML', 'CSS', 'React'],
      imagen: <MdEditNote />,
      link: 'https://axwykfirstportfolio.netlify.app'
    },
  ];

  const habilidades = [
    { nombre: 'React', nivel: 25 },
    { nombre: 'Python', nivel: 27 },
    { nombre: 'CSS', nivel: 24 },
    { nombre: 'HTML', nivel: 23 },
    { nombre: 'Git', nivel: 43 }
  ];

  const scrollToAbout = () => {
    const el = document.getElementById('sobre');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('sobre');
    }
  };

  useEffect(() => {
  function handleScroll() {
    const hero = document.getElementById('inicio');

    if (!hero) return;

    const heroBottom = hero.offsetTop + hero.offsetHeight;

    if (window.scrollY < heroBottom - 80) {
      setActiveSection('inicio'); // ocultar navbar
    } else {
      setActiveSection('other'); // mostrar navbar
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  handleScroll();

  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (

  <>
    <main className={`App ${activeSection !== 'inicio' ? 'has-navbar' : ''}`}>
      {/* Navbar */}
      <nav className={`navbar ${activeSection !== 'inicio' ? 'visible' : 'hidden'}`}>
        <header className="nav-container">
          <a href="#inicio" className="logo" onClick={() => { setActiveSection('inicio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Axwyk</a>
          <ul className="nav-menu">
            <li><a href="#inicio" onClick={() => { setActiveSection('inicio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Inicio</a></li>
            <li><a href="#sobre" onClick={() => setActiveSection('sobre')}>Sobre mí</a></li>
            <li><a href="#proyectos" onClick={() => setActiveSection('proyectos')}>Proyectos</a></li>
            <li><a href="#contacto" onClick={() => setActiveSection('contacto')}>Contacto</a></li>
          </ul>
        </header>
      </nav>

      {/* Hero Section*/}
      <section id="inicio" className="hero hero-centered">
        {showWisps && <ParticlesBackground />}
        <div className="hero-centered-inner">
          <h1 className="title-main">Hola, soy Patrick</h1>
          <p className="subtitle">Estudiante de Tecnologia de Desarrollo de Software y futuro desarrollador.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('sobre');
              if (el) {
                const navbarHeight = 80;
                const targetY = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                const startY = window.pageYOffset;
                const distance = targetY - startY;
                const duration = 600;
                let start = null;

                function step(timestamp) {
                  if (!start) start = timestamp;
                  const progress = Math.min((timestamp - start) / duration, 1);
                  const ease = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;
                  window.scrollTo(0, startY + distance * ease);
                  if (progress < 1) {
                    window.requestAnimationFrame(step);
                  }
                }
                window.requestAnimationFrame(step);
              }
            }}>Ver más</button>
          </div>
        </div>

        <button
          className={`toggle-light-btn ${showWisps ? 'on' : 'off'}`}
          aria-pressed={showWisps}
          onClick={() => setShowWisps((s) => !s)}
        >
          {showWisps ? <MdBrightness5 /> : <MdBrightness7 />}
        </button>
      </section>

      <section className="particles-static">
        <ParticlesBackgroundStatic />
        {/* About Section */}
        <section id="sobre" className="about" style={{position: 'relative', overflow: 'hidden'}}>
          
          <section className="container">
            <h2 className="section-title">Sobre mí</h2>
            <section className="about-content">
              <article className="about-text">
                <p>
                  Estudiante de Desarrollo de Software con interés en programación, desarrollo de videojuegos y creación de soluciones eficientes.
                  Enfocado en aprendizaje continuo, resolución de problemas y buenas prácticas para construir proyectos funcionales y escalables.
                </p>
                <p>
                  Mi enfoque es escribir código limpio, eficiente y mantenible. Estoy en proceso de aprendizaje 
                  de las últimas tecnologías del ecosistema Phyton, JavaScript y React.
                </p>
              </article>
              <aside className="skills-section">
                <h3>Habilidades Técnicas</h3>
                <ul>
                  {habilidades.map((skill) => (
                    <li key={skill.nombre} className="skill-item">
                      <span className="skill-name">{skill.nombre}</span>
                      <span className="skill-bar"><span className="skill-progress" style={{ width: `${skill.nivel}%` }}></span></span>
                      <span className="skill-level">{skill.nivel}%</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </section>
          </section>
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="projects" style={{position: 'relative', overflow: 'hidden'}}>
          
          <section className="container">
            <h2 className="section-title">Mis Proyectos</h2>
            <section className="projects-grid">
              {proyectos.map((proyecto) => (
                <article key={proyecto.id} className="proyecto-card">
                  <span className="proyecto-icon">{typeof proyecto.imagen === 'string' ? proyecto.imagen : proyecto.imagen}</span>
                  <h3>{proyecto.titulo}</h3>
                  <p className="proyecto-desc">{proyecto.descripcion}</p>
                  <section className="proyecto-tech">
                    {proyecto.tecnologias.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </section>
                  <a href={proyecto.link} target="_blank" rel="noopener noreferrer" className="proyecto-link">Ver más →</a>
                </article>
              ))}
            </section>
          </section>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="contact" style={{position: 'relative', overflow: 'hidden'}}>
          
          <section className="container">
            <h2 className="section-title">¡Contacta conmigo!</h2>
            <p className="contact-subtitle">Siempre estoy abierto a nuevas oportunidades y proyectos interesantes</p>
            
            <section className="contact-methods">
              <a href="mailto:jpmay1117@gmail.com" className="contact-card">
                <span className="contact-icon"><FaEnvelope /></span>
                <h3>Email</h3>

              </a>
              <a href="https://www.linkedin.com/in/axwyk" className="contact-card" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon"><FaLinkedin /></span>
                <h3>LinkedIn</h3>

              </a>
              <a href="https://github.com/Axwyk" className="contact-card" target="_blank" rel="noopener noreferrer">
                <span className="contact-icon"><FaGithub /></span>
                <h3>GitHub</h3>

              </a>
            </section>
          </section>
        </section>
      </section>         
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Patrick Marquez. Todos los derechos reservados.</p>
      </footer>
    </main>
  </>
  );
}

export default App;
