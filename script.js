const translations = {
  en: {
    nav_home:'Home',nav_services:'Services',nav_projects:'Projects',nav_about:'About',nav_contact:'Contact',
    eyebrow:'WEB DEVELOPMENT • SOROCABA, BRAZIL',hero_kicker:"Hi, I'm Otávio.",hero_title:'I turn ideas into <span class="highlight">digital experiences.</span>',hero_p:'I build modern, responsive websites to showcase your business, strengthen your brand and make it easier for customers to reach you.',hero_projects:'Explore my projects',hero_talk:"Let's talk",hero_meta:'Websites • Systems • Web solutions',scroll:'SCROLL TO EXPLORE',
    services_eyebrow:'HOW I CAN HELP',services_title:'Digital solutions to <span class="highlight">bring ideas to life.</span>',services_intro:'Every project is designed to be useful, easy to navigate and work beautifully on any screen.',service1_title:'Business websites',service1_text:'Showcase your company, services and strengths with a professional online presence.',service2_title:'Landing pages',service2_text:'Focused pages to promote products, campaigns or services and encourage people to get in touch.',service3_title:'Web systems',service3_text:'Tailored solutions to organize information, simplify tasks and support business processes.',service_link:'Discuss your project',
    projects_eyebrow:'SELECTED WORK',projects_title:'Projects that show <span class="highlight">how I build.</span>',projects_intro:'Get to know my process, the technologies I use and my attention to detail.',project_type:'PERSONAL PROJECT',project_status:'Live',project_name:'Personal portfolio',project_desc:'A website built to present my background, skills and projects. It features a responsive layout, theme and language switching, animations and quick access to contact channels.',project_live:'Visit project',project_code:'View source',van_project_type:'OWN PROJECT',van_project_status:'Functional • in progress',van_project_name:'School Van Manager',van_project_desc:'A web app designed to simplify the routine of school transportation drivers, bringing together student records, monthly payment tracking, financial overview and communication with guardians in a mobile-friendly interface.',van_feature_1:'Student records and individual profiles',van_feature_2:'Monthly fees, payments and outstanding balances',van_feature_3:'Payment history and receipt attachments',van_feature_4:'Personalized WhatsApp messages',van_project_cta:'Request a demo',van_project_note:'Project in development, with a working version.',projects_note:'New projects and experiments will be added here. In the meantime, I would be happy to discuss a solution for your idea.',
    about_eyebrow:'A LITTLE ABOUT ME',about_title:'Technology with a <span class="highlight">people-first perspective.</span>',about_1:"I'm Otávio Henrique, a software development student and technology enthusiast. I enjoy turning real problems into simple, organized and accessible digital solutions.",about_2:'My professional experience includes customer service, technical support and corporate environments, with hands-on exposure to systems, reporting, data analysis and process improvement. It helps me look beyond the code: what matters most is solving the needs of the people who will use the product.',about_3:"I'm currently studying Software Engineering and continuously improving my skills in web development, programming logic and software systems.",cv_label:'Download English resume',linkedin:'My LinkedIn',skills_caption:'TECHNOLOGIES & TOOLS',
    contact_eyebrow:'HAVE AN IDEA?',contact_title:'Shall we build something <span class="highlight">together?</span>',contact_text:"Tell me what you need. Let's talk about turning your idea into a digital solution.",contact_button:'Message me on WhatsApp',footer_text:'Building ideas, one line of code at a time.'
  }
};

const i18nElements = document.querySelectorAll('[data-i18n]');
i18nElements.forEach(element => { element.dataset.pt = element.innerHTML; });
const langButton = document.getElementById('lang-toggle');
const themeButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function setLanguage(language) {
  i18nElements.forEach(element => {
    const key = element.dataset.i18n;
    element.innerHTML = language === 'en' ? (translations.en[key] ?? element.dataset.pt) : element.dataset.pt;
  });
  document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  document.title = language === 'en' ? 'Otávio Henrique | Web Developer' : 'Otávio Henrique | Desenvolvedor Web';
  langButton.textContent = language === 'en' ? 'PT' : 'EN';
  try { localStorage.setItem('portfolio-language', language); } catch (error) { /* storage may be unavailable */ }
  refreshIcons();
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

langButton.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'en' ? 'pt' : 'en');
});

let savedLanguage = 'pt';
try { savedLanguage = localStorage.getItem('portfolio-language') || 'pt'; } catch (error) { /* use default */ }
if (savedLanguage === 'en') setLanguage('en');

function setTheme(isLight) {
  body.classList.toggle('light-mode', isLight);
  themeIcon.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
  themeButton.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
  try { localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark'); } catch (error) { /* use current theme */ }
  if (window.pJSDom?.[0]?.pJS) {
    const color = isLight ? '#2563eb' : '#4f8cff';
    const particles = window.pJSDom[0].pJS;
    particles.particles.color.value = color;
    particles.particles.line_linked.color = color;
    particles.fn.particlesRefresh();
  }
  refreshIcons();
}

themeButton.addEventListener('click', () => setTheme(!body.classList.contains('light-mode')));
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('portfolio-theme') || 'dark'; } catch (error) { /* use default */ }
if (savedTheme === 'light') setTheme(true);

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
  refreshIcons();
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<i data-lucide="menu"></i>';
  refreshIcons();
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();

if (window.particlesJS && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const isLight = body.classList.contains('light-mode');
  const particleColor = isLight ? '#2563eb' : '#4f8cff';
  window.particlesJS('particles-js', {
    particles: {
      number: { value: 48, density: { enable: true, value_area: 950 } },
      color: { value: particleColor },
      opacity: { value: 0.32, random: true },
      size: { value: 2, random: true },
      line_linked: { enable: true, distance: 145, color: particleColor, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1.1, direction: 'none', random: true, straight: false, out_mode: 'out' }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
    retina_detect: true
  });
}
refreshIcons();
