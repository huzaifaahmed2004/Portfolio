// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    updateThemeIcon("dark");
  }
}

function updateThemeIcon(theme) {
  const sunIcon = themeToggle.querySelector(".fa-sun");
  const moonIcon = themeToggle.querySelector(".fa-moon");

  if (theme === "dark") {
    sunIcon.style.display = "inline-block";
    moonIcon.style.display = "none";
  } else {
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline-block";
  }
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

// Initialize theme on load
initializeTheme();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 60;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header Scroll Effect
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

// Form Submission
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const mailtoLink = `mailto:huzaifaahmedwork@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(
    name
  )}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(
    message
  )}`;

  window.location.href = mailtoLink;
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

// Single observer for all elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".skill__card, .tool__item, .section__title, .project__card"
  )
  .forEach((el, index) => {
    if (el.classList.contains("project__card")) {
      el.style.animationDelay = `${index * 0.2}s`;
    }
    observer.observe(el);
  });

// Project Links Hover Effect
document.querySelectorAll(".project__link").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.transform = "translateY(-2px)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "translateY(0)";
  });
});
