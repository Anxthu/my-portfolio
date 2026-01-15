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

  // --- Magnetic Button Logic ---
  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic strength
      const strength = 0.5;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
      // Add a quick transition for snap back, then remove it so it's instant on mousemove
      el.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      setTimeout(() => {
        el.style.transition = '';
      }, 300);
    });
  });

  // --- Interactive Hero Content ---
  const heroText = document.querySelector('.hero-text');
  const audienceOptions = document.querySelectorAll('.audience-list span');

  const contentData = {
    anyone: {
      html: `I design and build digital experiences with the belief that technology should feel <span>thoughtful</span>, <span>expressive</span>, and <span>human</span>.`
    },
    recruiters: {
      html: `I bridge the gap between <span>design</span> and <span>engineering</span> to ship pixel-perfect products that <span>scale</span>.`
    },
    directors: {
      html: `I craft scalable <span>design systems</span> and <span>micro-interactions</span> that elevate brand value and drive <span>user engagement</span>.`
    },
    designers: {
      html: `I obsess over <span>details</span>, <span>prototyping</span>, and the <span>hand-off</span> process to ensure the vision remains intact in code.`
    },
    managers: {
      html: `I bring end-to-end product acumen, from vision and strategy to discovery and delivery. I’ll partner closely with you to generate the highest impact possible.`
    },
    engineers: {
      html: `I’m {highly_technical} and while (I’m = engineer) I know my way /around & can speak “fluently” with you; I built <a href="index.html" style="color: var(--text-primary); text-decoration: underline;">(this.site)</a> from scratch.`
    }
  };

  const defaultSuffix = `<br><br>Currently exploring the intersection of design and AI at <a href="https://www.amrita.edu/program/btech-in-artificial-intelligence-and-data-science/" target="_blank">Amrita Vishwa Vidyapeetham</a>.`;

  audienceOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Update active state
      audienceOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      // Get target key
      const target = option.getAttribute('data-target');
      const newContent = contentData[target];

      if (newContent) {
        // Animate content switch
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(10px)';

        setTimeout(() => {
          heroText.innerHTML = newContent.html + defaultSuffix;
          heroText.style.opacity = '1';
          heroText.style.transform = 'translateY(0)';
        }, 300);
      }
    });
  });

});
