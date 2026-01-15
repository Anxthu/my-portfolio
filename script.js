// Scroll Animations using Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  // Fade in body
  document.body.style.opacity = "1";

  // Navbar scroll effect
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Section reveal animation
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: Stop observing once visible if you want it to only animate once
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    observer.observe(section);
  });

  // Smooth page transition for links
  const links = document.querySelectorAll("a[href]");
  links.forEach(link => {
    const url = link.getAttribute("href");
    if (url && !url.startsWith("http") && !url.startsWith("mailto") && !url.startsWith("#")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location.href = url;
        }, 500);
      });
    }
  });
});
