// --- DATA ---
    const PROJECTS = [
      { 
        id: 1, category: 'Infographics', year: '2026', client: 'School Project',
        services: ['Annual Report, Editorial, Printing, Infographics'],
        img: 'Images/Infographics_annualreport_firstpage.png',
        description: 'This project focused on designing an annual report for the fictional fashion brand Aurea Group using a provided financial dataset. The goal was to translate complex information into a visually engaging and brand-aligned publication.\n\nTo reflect the fashion identity of the brand, I created many of the charts and graphs using fabric textures in Photoshop. A structured grid, refined typography, and clear hierarchy ensured readability while maintaining a strong visual concept.\n\nThe result is a balance between creativity and functionality, where data becomes part of the brand’s visual language rather than just supporting content.',
        images: [
          'Images/Infographics_annualreport_overview_landscape.jpg',
          'Images/Infographics_fabric.jpg',
          'Images/Infographics_pictures.jpg'
        ]
      },
      { 
        id: 2, category: 'Brand identity', year: '2026', client: 'Gastromario',
        services: ['Brand Identity, Logo design'],
        img: 'Images/Gastromario/BrandIdentity_Gastromario.png',
        description: 'Gastromario is a high-quality café based in Rome. For this project, I developed a cohesive brand identity rooted in the brand’s tone of voice, translating its refined yet welcoming personality into a distinctive visual system.\n\nI created a series of custom illustrations to elevate the brand’s storytelling and highlight its artisanal character. Combined with thoughtful typography and a balanced layout, the illustrations form a cohesive visual language that reflects the café’s quality and atmosphere while ensuring consistency across all touchpoints.',
        images: [
          'Images/Gastromario/BrandIdentity_Gastromario.png',
          'unknown',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
        ]
      },
      { 
        id: 3, category: 'Web design', year: '2026', client: 'Maison Margiela',
        services: ['brand identity', 'copywriting', 'animations'],
        img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
        description: 'Digital portfolio and e-commerce platform designed for an independent fashion label. The interface relies on horizontal scrolling and hidden navigation to let the photography lead the user experience.',
        images: [
          'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop'
        ]
      },
      { 
        id: 4, category: 'Photography', year: '2026', client: 'Cereal Magazine',
        services: ['brand identity', 'copywriting', 'animations'],
        img: 'https://images.unsplash.com/photo-1554046920-90dcac824b43?q=80&w=1200&auto=format&fit=crop',
        description: 'An editorial series capturing brutalist and modernist architecture around Europe. Shot entirely on medium format film, focusing on shadows, leading lines, and concrete textures.',
        images: [
          'https://images.unsplash.com/photo-1554046920-90dcac824b43?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
        ]
      },
      { 
        id: 5, category: 'Movie posters', year: '2026', client: 'A24 Films',
        services: ['brand identity', 'copywriting', 'animations'],
        img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
        description: 'A series of conceptual posters designed for an independent film festival. Heavily inspired by 1960s international typographic style, relying on strong diagonal lines and bold color blocking.',
        images: [
          'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop'
        ]
      }
    ];

    // --- STATE ---
    let currentRoute = 'home';
    let selectedProjectIndex = null;
    let lastScrollY = 0;
    
    // Observers
    let revealObserver;
    let scrollObserver;

    // --- INIT ---
    document.addEventListener('DOMContentLoaded', () => {
      renderProjectsList();
      setupIntersectionObservers();
      setupScrollListener();
      updateNavState();
    });

    // --- RENDERING ---
    function renderProjectsList() {
      const container = document.getElementById('projects-container');
      container.innerHTML = '';

      PROJECTS.forEach((project, index) => {
        const projectHTML = `
          <div data-index="${index}" class="project-item w-full px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-[10px] mb-[10px] last:mb-0 pointer-events-auto items-center group">
            <!-- Mobile text -->
            <div class="md:hidden flex justify-between items-center mb-4 text-[10px] font-medium font-dm normal-case px-2 w-full">
              <div class="flex gap-2">
                <span class="text-zinc-500">Category</span>
                <span>${project.category}</span>
              </div>
              <div class="flex gap-2">
                <span class="text-zinc-500">Year</span>
                <span>${project.year}</span>
              </div>
            </div>

            <!-- Image -->
            <div 
              class="col-span-1 md:col-start-3 md:col-span-4 aspect-[4/5] w-full bg-zinc-200 overflow-hidden relative shadow-sm cursor-pointer reveal-item"
              onclick="openProject(${index})"
            >
              <img src="${project.img}" alt="${project.category}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div class="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/10"></div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', projectHTML);
      });
    }

    function renderProjectDetail(project) {
      const container = document.getElementById('view-project-detail');
      
      const servicesHTML = project.services.map(s => `<span>${s}</span>`).join('');
      const imagesHTML = project.images.map((img, idx) => {
        // Specifically for the second and third images of the Infographics project (ID 1, index 1 & 2)
        // we remove the height constraint to allow them to be 1920x1080 (16:9)
        const isTarget = project.id === 1 && (idx === 1 || idx === 2);
        const heightClass = isTarget ? 'h-auto' : 'md:h-[90vh]';
        
        return `
          <img src="${img}" alt="${project.category} view ${idx + 1}" class="w-full ${heightClass} object-cover bg-zinc-200 reveal-item" loading="lazy" />
        `;
      }).join('');

      container.innerHTML = `
        <!-- Top Information Grid -->
        <div class="w-full grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-[10px] mb-16 md:mb-24 text-[10px] font-medium font-dm normal-case">
          <!-- Category & Description -->
          <div class="col-span-1 md:col-span-4 flex gap-4 items-start">
            <span class="text-zinc-500">Category</span>
            <div class="flex flex-col gap-4">
              <span class="text-zinc-900">${project.category}</span>
              <p class="text-zinc-500 leading-relaxed max-w-[280px] whitespace-pre-line">${project.description}</p>
            </div>
          </div>
          <!-- Services -->
          <div class="col-span-1 md:col-span-3 flex gap-4 items-start">
            <span class="text-zinc-500">Services</span>
            <div class="flex flex-col gap-1 text-zinc-900">${servicesHTML}</div>
          </div>
          <!-- Client -->
          <div class="col-span-1 md:col-span-3 flex gap-4 items-start">
            <span class="text-zinc-500">Client</span>
            <span class="text-zinc-900">${project.client}</span>
          </div>
          <!-- Year -->
          <div class="col-span-1 md:col-span-2 flex gap-4 items-start">
            <span class="text-zinc-500">Year</span>
            <span class="text-zinc-900">${project.year}</span>
          </div>
        </div>

        <!-- Vertical Image Sequence -->
        <div class="w-full flex flex-col gap-[10px] pb-8 md:pb-12">
          ${imagesHTML}
        </div>
      `;
    }

    // --- NAVIGATION LOGIC ---
    window.navigate = function(route) {
      selectedProjectIndex = null;
      currentRoute = route;
      
      // Toggle Views
      document.getElementById('view-home').className = route === 'home' ? 'block' : 'hidden';
      document.getElementById('view-about').className = route === 'about' ? 'block' : 'hidden';
      document.getElementById('view-project-detail').className = 'hidden flex-col';

      // Reset scroll & nav visibility
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('main-nav').classList.replace('-translate-y-full', 'translate-y-0');
      
      updateNavState();
      triggerReveals();
    };

    window.openProject = function(index) {
      selectedProjectIndex = index;
      const project = PROJECTS[index];
      
      // Toggle Views
      document.getElementById('view-home').className = 'hidden';
      document.getElementById('view-about').className = 'hidden';
      
      const detailView = document.getElementById('view-project-detail');
      detailView.className = 'flex min-h-screen w-full bg-[#f4f4f2] pt-32 pb-0 px-6 md:px-8 flex-col';
      
      renderProjectDetail(project);
      updateNavState();
      triggerReveals();
      
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    function updateNavState() {
      const btnHome = document.getElementById('nav-btn-home');
      const btnAbout = document.getElementById('nav-btn-about');
      
      if (selectedProjectIndex !== null) {
        btnHome.className = 'transition-colors text-zinc-500 hover:text-zinc-900';
        btnAbout.className = 'transition-colors text-zinc-500 hover:text-zinc-900';
      } else {
        btnHome.className = currentRoute === 'home' ? 'transition-colors text-zinc-900' : 'transition-colors text-zinc-500 hover:text-zinc-900';
        btnAbout.className = currentRoute === 'about' ? 'transition-colors text-zinc-900' : 'transition-colors text-zinc-500 hover:text-zinc-900';
      }
    }

    // --- OBSERVERS & SCROLL ---
    function setupIntersectionObservers() {
      // 1. Reveal Observer
      revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      triggerReveals();

      // 2. Active Project Sticky Info Observer (Home page)
      scrollObserver = new IntersectionObserver((entries) => {
        if (selectedProjectIndex !== null || currentRoute !== 'home') return;
        
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            updateStickyInfo(index);
          }
        });
      }, { 
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0 
      });

      document.querySelectorAll('.project-item').forEach(el => scrollObserver.observe(el));
    }

    function triggerReveals() {
      setTimeout(() => {
        document.querySelectorAll('.reveal-item:not(.is-revealed)').forEach(el => revealObserver.observe(el));
      }, 100);
    }

    function updateStickyInfo(index) {
      const project = PROJECTS[index];
      if (!project) return;
      document.getElementById('sticky-index').innerText = String(index + 1).padStart(2, '0');
      document.getElementById('sticky-category').innerText = project.category;
      document.getElementById('sticky-year').innerText = project.year;
    }

    function setupScrollListener() {
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Navbar visibility logic
        const nav = document.getElementById('main-nav');
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          nav.classList.add('-translate-y-full');
          nav.classList.remove('translate-y-0');
        } else {
          nav.classList.add('translate-y-0');
          nav.classList.remove('-translate-y-full');
        }
        lastScrollY = currentScrollY;

        // Scroll percentage logic
        if (docHeight > 0) {
          let progress = (currentScrollY / docHeight) * 100;
          progress = Math.min(100, Math.max(0, progress));
          
          document.getElementById('scroll-perc-text').innerText = Math.round(progress) + '%';
          document.getElementById('scroll-perc-container').style.transform = `translateY(calc((50vh - 48px) * ${1 - progress / 100}))`;
        }
      }, { passive: true });
    }