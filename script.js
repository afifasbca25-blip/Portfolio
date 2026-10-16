const loader = document.getElementById("loader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Loading screen
function hideLoader() {
  loader.classList.add("hidden");
}

if (document.readyState === "complete") {
  setTimeout(hideLoader, 500);
} else {
  window.addEventListener("load", () => {
    setTimeout(hideLoader, 500);
  }, { once: true });
}

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Typing animation
const typingElement = document.getElementById("typing");
const phrases = [
  "digital world.",
  "world of web.",
  "future of tech.",
  "next big idea."
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeText() {
  const currentPhrase = phrases[phraseIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typingElement.textContent =
    currentPhrase.substring(0, characterIndex);

  let delay = deleting ? 45 : 90;

  if (!deleting && characterIndex === currentPhrase.length) {
    deleting = true;
    delay = 1300;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 350;
  }

  setTimeout(typeText, delay);
}

typeText();

// Reveal elements while scrolling
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Active navigation link
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navigationLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, {
    rootMargin: "-25% 0px -60% 0px"
  });

  sections.forEach(section => sectionObserver.observe(section));
}

// Animated background particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let canvasWidth = 0;
let canvasHeight = 0;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(
    65,
    Math.floor((canvasWidth * canvasHeight) / 18000)
  );

  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 1.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: (Math.random() - 0.5) * 0.35
  }));
}

function animateParticles() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach(particle => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > canvasWidth) {
      particle.speedX *= -1;
    }

    if (particle.y < 0 || particle.y > canvasHeight) {
      particle.speedY *= -1;
    }

    ctx.beginPath();
    ctx.arc(
      particle.x,
      particle.y,
      particle.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(167, 139, 250, 0.65)";
    ctx.fill();
  });

  // Connect nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];

      const distance = Math.hypot(a.x - b.x, a.y - b.y);

      if (distance < 115) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle =
          `rgba(103, 232, 249, ${0.12 * (1 - distance / 115)})`;

        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}

resizeCanvas();
animateParticles();

window.addEventListener("resize", resizeCanvas);

// Interactive 3D profile card on desktop
const profileCard = document.querySelector(".profile-card");
const heroVisual = document.querySelector(".hero-visual");

const supportsFinePointer = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
);

if (supportsFinePointer.matches) {
  heroVisual.addEventListener("mousemove", event => {
    const rect = profileCard.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 12;

    profileCard.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroVisual.addEventListener("mouseleave", () => {
    profileCard.style.transform = "rotateX(0) rotateY(0)";
  });
}