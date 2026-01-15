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
  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById('theme-toggle');
  const preferDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Set initial theme based on localStorage or OS preference
  const currentTheme = localStorage.getItem('theme') || (preferDark.matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --- Copy Email Logic ---
  const emailLink = document.querySelector('a[href^="mailto:"]');

  if (emailLink) {
    emailLink.addEventListener('click', function (e) {
      e.preventDefault();
      const email = this.getAttribute('href').replace('mailto:', '');

      navigator.clipboard.writeText(email).then(() => {
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Copied!';
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'var(--accent)';
        tooltip.style.color = '#000';
        tooltip.style.padding = '4px 8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '12px';
        tooltip.style.fontFamily = 'var(--font-mono)';
        tooltip.style.top = '-40px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.2s';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.fontWeight = '500';

        // Ensure relative positioning on the container/link for absolute tooltip
        this.style.position = 'relative';
        this.appendChild(tooltip);

        // Animate tooltip
        requestAnimationFrame(() => {
          tooltip.style.opacity = '1';
        });

        // Remove after 2 seconds
        setTimeout(() => {
          tooltip.style.opacity = '0';
          setTimeout(() => tooltip.remove(), 200);
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy email: ', err);
        window.location.href = this.href; // Fallback to mailto
      });
    });
  }

});
