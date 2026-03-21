// Generate stars
    function createStars() {
      const container = document.getElementById('stars');
      const starCount = 150;
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 2 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDuration = Math.random() * 3 + 2 + 's';
        star.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(star);
      }

      // Create floating particles
      // Create high-speed Regolith Dust Storm
      for (let i = 0; i < 120; i++) { // Increased from 20 to 120 particles
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Start them mostly on the right side of the screen
        particle.style.left = Math.random() * 100 + 50 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Vary the size of the dust grains
        particle.style.width = Math.random() * 5 + 1 + 'px';
        particle.style.height = particle.style.width;
        
        // Faster animation: 2 to 7 seconds instead of 10 to 25
        particle.style.animationDuration = Math.random() * 5 + 2 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Occasionally make a dust particle glowing orange
        if (Math.random() > 0.8) {
            particle.style.background = '#ff9800';
            particle.style.boxShadow = '0 0 10px #ff9800';
        }
        
        container.appendChild(particle);
      }
    }

    // Navbar scroll effect
    function handleScroll() {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Animate stats on scroll
    function animateStats() {
      const stats = document.querySelectorAll('.stat-value');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const numericValue = parseInt(finalValue);
            let current = 0;
            const increment = numericValue / 50;
            const suffix = finalValue.includes('+') ? '+' : '';
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= numericValue) {
                target.textContent = numericValue + suffix;
                clearInterval(timer);
              } else {
                target.textContent = Math.floor(current) + suffix;
              }
            }, 30);
            
            observer.unobserve(target);
          }
        });
      }, { threshold: 0.5 });

      stats.forEach(stat => observer.observe(stat));
    }

    // Smooth scroll for navigation links
    function setupSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    }

    // Card hover parallax effect
    function setupCardEffects() {
      const cards = document.querySelectorAll('.glass-card, .project-card, .team-card');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
      });
    }

    // Initialize everything
    document.addEventListener('DOMContentLoaded', () => {
      createStars();
      handleScroll();
      animateStats();
      setupSmoothScroll();
      setupCardEffects();
      typeWriterEffect();

      window.addEventListener('scroll', handleScroll);
    });
    // High-tech terminal typing effect
function typeWriterEffect() {
  const subtitle = document.querySelector('.hero-subtitle');
  const text = subtitle.textContent.trim(); // Get the current text
  subtitle.textContent = ''; // Clear it out instantly
  
  let i = 0;
  // Type a letter every 30 milliseconds
  const typing = setInterval(() => {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing); // Stop when done
    }
  }, 30);
}