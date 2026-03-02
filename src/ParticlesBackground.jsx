import Particles from "react-tsparticles";

export default function ParticlesBackground() {
  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
           opacity: { value: 0.18, random: { enable: true, minimumValue: 0.10 } },
          size: { value: 2, random: { enable: true, minimumValue: 3 } },
           shadow: {
             enable: true,
             color: "#ff5e00",
             blur: 1
           },
          links: {
            enable: false
          },
          move: {
            enable: true,
            speed: 0.7,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            attract: { enable: false }
          }
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: false },
            resize: true
          },
          modes: {
            grab: {
              distance: 280,
              line_linked: { opacity: 0.5 }
            }
          }
        },
        retina_detect: true
      }}
      className="particles-canvas"
    />
  );
}