import './App.css';
import { useState, useEffect } from 'react';
// import HeroWisps from './HeroWisps'; // --- IGNORE ---
import ParticlesBackground from './ParticlesBackground';
import ParticlesBackgroundStatic from './ParticlesBackgroundStatic';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  // Animación de puntos en el fondo del hero
  const [showWisps, setShowWisps] = useState(true);

  const proyectos = [
    {
      id: 1,
      titulo: 'Portfolio Personal',
      descripcion: 'Primer proyecto de portfolio con HTML, CSS y React',
      tecnologias: ['HTML', 'CSS', 'React'],
      imagen: '🌐',
      link: 'https://axwykfirstportfolio.netlify.app'
    },
    {
      id: 2,
      titulo: 'Generador de grafos',
      descripcion: 'Generador de diferentes algoritmos de grafos',
      tecnologias: ['Phyton'],
      imagen: '✓',
      link: 'https://github.com/Axwyk/Grafos'
    },
  ];

  const habilidades = [
    { nombre: 'React', nivel: 25 },
    { nombre: 'Python', nivel: 27 },
    { nombre: 'CSS', nivel: 24 },
    { nombre: 'HTML', nivel: 23 },
    { nombre: 'Git', nivel: 22 }
  ];

  const scrollToAbout = () => {
    const el = document.getElementById('sobre');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('sobre');
    }
  };

  useEffect(() => {
    function updateSectionOnScroll() {
      const mid = window.scrollY + window.innerHeight / 2;
      const about = document.getElementById('sobre');
      const hero = document.getElementById('inicio');
      const proyectos = document.getElementById('proyectos');
      const contacto = document.getElementById('contacto');

      if (about) {
        const top = about.offsetTop;
        const bottom = top + about.offsetHeight;
        if (mid >= top && mid < bottom) {
          setActiveSection('sobre');
          return;
        }
      }

      if (hero) {
        const top = hero.offsetTop;
        const bottom = top + hero.offsetHeight;
        if (mid >= top && mid < bottom) {
          setActiveSection('inicio');
          return;
        }
      }

      if (proyectos) {
        const top = proyectos.offsetTop;
        const bottom = top + proyectos.offsetHeight;
        if (mid >= top && mid < bottom) {
          setActiveSection('proyectos');
          return;
        }
      }

      if (contacto) {
        const top = contacto.offsetTop;
        const bottom = top + contacto.offsetHeight;
        if (mid >= top && mid < bottom) {
          setActiveSection('contacto');
          return;
        }
      }

      setActiveSection('inicio');
    }

    let ticking = false;
    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateSectionOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    
    updateSectionOnScroll();
    return () => window.removeEventListener('scroll', handler);
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
          aria-label={showWisps ? 'Desactivar partículas' : 'Activar partículas'}
          title={showWisps ? 'Desactivar partículas' : 'Activar partículas'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="rgb(255, 214, 187)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v10"/>
            <path d="M6.2 17.8a7 7 0 1 0 11.6 0"/>
          </svg>
        </button>
      </section>

      {/* About Section */}
      <section id="sobre" className="about" style={{position: 'relative', overflow: 'hidden'}}>
        <ParticlesBackgroundStatic />
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
        <ParticlesBackgroundStatic />
        <section className="container">
          <h2 className="section-title">Mis Proyectos</h2>
          <section className="projects-grid">
            {proyectos.map((proyecto) => (
              <article key={proyecto.id} className="proyecto-card">
                <span className="proyecto-icon">{proyecto.imagen}</span>
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
        <ParticlesBackgroundStatic />
        <section className="container">
          <h2 className="section-title">¡Contacta conmigo!</h2>
          <p className="contact-subtitle">Siempre estoy abierto a nuevas oportunidades y proyectos interesantes</p>
          
          <section className="contact-methods">
            <a href="mailto:hello@example.com" className="contact-card">
              <span className="contact-icon">✉️</span>
              <h3>Email</h3>
              <p>jpmay1117@gmail.com</p>
            </a>
            <a href="#/" className="contact-card">
              <span className="contact-icon">💼</span>
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/Axwyk</p>
            </a>
            <a href="#/" className="contact-card">
              <span className="contact-icon">💻</span>
              <h3>GitHub</h3>
              <p>github.com/Axwyk</p>
            </a>
          </section>

          <form className="contact-form">
            <input type="text" placeholder="Tu nombre" required />
            <input type="email" placeholder="Tu email" required />
            <textarea placeholder="Tu mensaje" rows="5" required></textarea>
            <button type="submit" className="btn btn-primary">Enviar mensaje</button>
          </form>
        </section>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Axwyk. Todos los derechos reservados.</p>
      </footer>
    </main>
  </>
  );
}

export default App;
