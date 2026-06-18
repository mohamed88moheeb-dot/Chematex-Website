const currentPage = document.body.dataset.page || 'home';
const links = [
  ['index.html', 'Home', 'home'],
  ['about.html', 'About Us', 'about'],
  ['solutions.html', 'Solutions', 'solutions'],
  ['categories.html', 'Categories', 'categories', true],
  ['industries.html', 'Industries', 'industries'],
  ['contact.html', 'Contact Us', 'contact']
];

const categoryLinks = [
  ['category-textile-auxiliaries.html', 'Textile Auxiliaries'],
  ['category-industrial-detergents.html', 'Industrial Detergents'],
  ['category-cosmetics-personal-care.html', 'Cosmetics & Personal Care'],
  ['category-ro-water-treatment.html', 'RO Water Treatment'],
  ['category-sanitizers-disinfectants.html', 'Sanitizers & Disinfectants'],
  ['category-raw-materials.html', 'Raw Materials']
];

const productsByCategory = {
  "Textile Auxiliaries": [
    "CHEMASOLY SR CONC OIL REMOVER AGENT",
    "CHEMAWET GBR OIL REMOVER AND WETTING AGENT",
    "CHEMASTAB CIF/N PEROXIDE STABILIZER",
    "CHEMAWET MRF-400 WETTING AGENT",
    "CHEMAFOAM CM-100 ANTIFOAM AGENT",
    "CHEMAFOAM SY-150 ANTIFOAM AGENT",
    "CHEMACID CO BUFFER FOR COTTON",
    "CHEMAQUEST LP - 500 SEQUESTERING AGENT",
    "CHEMAQUEST PNL-200 SEQUESTERING AGENT",
    "CHEMACID RED CONC REDUCTION CLEANING AGENT",
    "CHEMAREDUCT RDL REDUCTION CLEARING AGENT",
    "CHEMACARRIER ECO",
    "CHEMACARRIER HT-CONC HIGH TEMPERATURE CARRIER",
    "CHEMAZYME HO HYDROGEN PEROXIDE KILLER ENZYME",
    "CHEMAZYME PL ANTIPILLING AND BIOPOLISH ENZYME",
    "CHEMAFIX RC-700 FIXING AGENT",
    "CHEMALEV LCR - 945 LEVELING DISPERSING AGENT FOR POLYESTER",
    "CHEMALEV RL LEVELING AND WASHING OFF FOR COTTON",
    "CHEMALEV RPD - 999 RAPID TEMPERATURE LEVELING AGENT FOR POLYESTER",
    "CHEMALEV SH-500 LEVELING DISPERSING AGENT FOR POLYESTER",
    "CHEMAWASH R CONC WASHING AGENT FOR REACTIVE DYE",
    "CHEMASTATE XH ANTISTATIC AGENT",
    "CHEMASTATE ZX ANTISTATIC AGENT",
    "CHEMASIL 600 MICRO SILICON",
    "CHEMASIL MC 55 MACRO SILICON",
    "BLOCK MACRO SILICON LC-930 SMOOTH SLIPPERY FEELING",
    "CHEMASIL BK 480 BLOCK MACRO SILICON",
    "CHEMASIL MAC 380 BLOCK MACRO SILICON",
    "BLOCK MICRO SILICON LC-845 BLOCK MICRO SILICON",
    "CHEMASIL BK 725 BLOCK MICRO SILICON",
    "CHEMADEEP SIL \u2013 541 DEEP SILICON",
    "CHEMASIL HYDRO 446 CONC HYDROPHILIC SILICON AGENT",
    "CHEMASIL ICE 330 ICE SILICON AGENT",
    "CHEMASOFT CST RAISING AGENT",
    "CHEMASOFT MRD SOFT AGENT",
    "CHEMAGURD PFC-64 WATER REPELLENT"
  ],
  "Industrial Detergents": [
    "Products available upon request"
  ],
  "Cosmetics & Personal Care": [
    "Products available upon request"
  ],
  "RO Water Treatment": [
    "Products available upon request"
  ],
  "Sanitizers & Disinfectants": [
    "Products available upon request"
  ],
  "Raw Materials": [
    "Products available upon request"
  ]
};

const logoImg = `<img src="assets/logo/chematex-icon.png" alt="Chematex logo mark" class="brand-logo" />`;

function renderHeader(){
  const categoryDropdown = categoryLinks.map(([href,label]) => `<a href="${href}">${label}</a>`).join('');
  const nav = links.map(([href,label,key,hasDropdown]) => {
    if(hasDropdown){
      return `<div class="nav-dropdown"><a href="${href}" class="${currentPage===key?'active':''}">${label} <span aria-hidden="true">⌄</span></a><div class="dropdown-menu">${categoryDropdown}</div></div>`;
    }
    return `<a href="${href}" class="${currentPage===key?'active':''}">${label}</a>`;
  }).join('');
  const mobile = links.map(([href,label,key,hasDropdown]) => {
    if(hasDropdown){
      return `
        <button class="mobile-dropdown-toggle ${currentPage===key?'active':''}" type="button" aria-expanded="false" aria-controls="mobile-category-submenu">
          ${label} <span aria-hidden="true">⌄</span>
        </button>
        <div id="mobile-category-submenu" class="mobile-submenu mobile-submenu-collapsible">
          ${categoryDropdown}
        </div>
      `;
    }
    return `<a href="${href}" class="${currentPage===key?'active':''}">${label}</a>`;
  }).join('');
  document.getElementById('site-header').innerHTML = `
    <header class="site-header">
      <div class="container navbar">
        <a class="brand" href="index.html" aria-label="Chematex home">${logoImg}<span>Chematex</span></a>
        <nav class="nav-links" aria-label="Main navigation">${nav}</nav>
        <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">☰</button>
      </div>
      <div id="mobile-menu" class="mobile-menu">${mobile}</div>
    </header>`;
}

function renderFooter(){
  document.getElementById('site-footer').innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html" style="color:white;font-size:1.75rem;margin-bottom:14px">${logoImg}<span>Chematex</span></a>
          <p>Specialized chemical solutions for textile processing, industrial cleaning, personal care, disinfection, RO water treatment, and raw material needs.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="about.html">About Us</a>
          <a href="solutions.html">Solutions</a>
          <a href="categories.html">Categories</a>
          <a href="industries.html">Industries</a>
          <a href="contact.html">Contact Us</a>
        </div>
        <div>
          <h4>Categories</h4>
          <a href="category-textile-auxiliaries.html">Textile Auxiliaries</a>
          <a href="category-industrial-detergents.html">Industrial Detergents</a>
          <a href="category-cosmetics-personal-care.html">Cosmetics & Personal Care</a>
          <a href="category-ro-water-treatment.html">RO Water Treatment</a>
          <a href="category-sanitizers-disinfectants.html">Sanitizers & Disinfectants</a>
          <a href="category-raw-materials.html">Raw Materials</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="tel:+20222675966">+2 02 2267 5966</a>
          <a href="tel:+201026622319">+2 0102 6622319</a>
          <a href="tel:+201026622320">+2 0102 6622320</a>
          <a href="mailto:Chematex@Chematex-eg.com">Chematex@Chematex-eg.com</a>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Chematex%20COMPANY%20Textile%20Auxiliaries%20Detergents%20Cosmetics%20Factory" 
            target="_blank" 
            rel="noopener">
            Industrial Area, New Cairo 3, Cairo Governorate 4716015, Egypt
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 Chematex. All Rights Reserved.</span>
      </div>
    </div>
  </footer>`;
}

function renderWhatsApp(){
  const msg = encodeURIComponent('Hello Chematex, I would like to ask about your chemical solutions.');
  document.getElementById('whatsapp').innerHTML = `<a class="whatsapp" aria-label="Contact Chematex on WhatsApp" href="https://wa.me/201026622319?text=${msg}" target="_blank" rel="noopener">✆</a>`;
}

function setupTabs(){
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(id)?.classList.add('active');
    });
  });
}

function setupForms(){
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if(note){
        note.textContent = 'Thank you. This form is ready visually. Connect it to Formspree, Netlify Forms, EmailJS, or your backend to receive messages.';
        note.style.color = '#365d63';
        note.style.fontWeight = '800';
      }
    });
  });
}

function setupMobileNavigation(){
  const menuButton = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const submenuToggle = document.querySelector('.mobile-dropdown-toggle');
  const submenu = document.querySelector('.mobile-submenu-collapsible');

  if(menuButton && mobileMenu){
    menuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if(submenuToggle && submenu){
    submenuToggle.addEventListener('click', () => {
      const isOpen = submenu.classList.toggle('open');
      submenuToggle.classList.toggle('open', isOpen);
      submenuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
}

function setupQuoteForm(){
  const categorySelect = document.getElementById("quoteCategory");
  const productSelect = document.getElementById("quoteProduct");
  const quantitySelect = document.getElementById("quoteQuantity");

  if (quantitySelect && quantitySelect.options.length <= 1) {
    for (let i = 1; i <= 100; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      quantitySelect.appendChild(option);
    }
  }

  if (categorySelect && productSelect) {
    const populateProducts = function () {
      const selectedCategory = categorySelect.value;
      const products = productsByCategory[selectedCategory] || [];

      productSelect.innerHTML = "";

      if (!selectedCategory) {
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a category first";
        productSelect.appendChild(defaultOption);
        return;
      }

      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = "Select Product";
      productSelect.appendChild(placeholderOption);

      products.forEach(function (product) {
        const option = document.createElement("option");
        option.value = product;
        option.textContent = product;
        productSelect.appendChild(option);
      });
    };

    categorySelect.addEventListener("change", populateProducts);

    const params = new URLSearchParams(window.location.search);
    const productParam = params.get("product");
    const categoryParam = params.get("category");

    if (categoryParam) {
      categorySelect.value = categoryParam;
      populateProducts();

      if (productParam) {
        const normalizedProduct = productParam.trim();
        const matchingOption = Array.from(productSelect.options).find(function (option) {
          return option.value === normalizedProduct || option.textContent === normalizedProduct;
        });
        if (matchingOption) {
          productSelect.value = matchingOption.value;
        }
      }
    }
  }
}

function setupLinkedInButton(){
  const linkedinUrl = "PASTE_YOUR_LINKEDIN_LINK_HERE";

  if (!linkedinUrl || linkedinUrl === "PASTE_YOUR_LINKEDIN_LINK_HERE") {
    return;
  }

  const linkedinButton = document.createElement("a");
  linkedinButton.className = "linkedin-float";
  linkedinButton.href = linkedinUrl;
  linkedinButton.target = "_blank";
  linkedinButton.rel = "noopener";
  linkedinButton.setAttribute("aria-label", "Open Chematex on LinkedIn");
  linkedinButton.innerHTML = "in";
  document.body.appendChild(linkedinButton);
}

function setupLogoCarouselPause(){
  const logoCarousel = document.querySelector(".logo-carousel");

  if (!logoCarousel) return;

  logoCarousel.addEventListener("click", function (event) {
    event.stopPropagation();
    logoCarousel.classList.add("paused");
  });

  logoCarousel.addEventListener("touchstart", function (event) {
    event.stopPropagation();
    logoCarousel.classList.add("paused");
  }, { passive: true });

  document.addEventListener("click", function () {
    logoCarousel.classList.remove("paused");
  });

  document.addEventListener("touchstart", function (event) {
    if (!logoCarousel.contains(event.target)) {
      logoCarousel.classList.remove("paused");
    }
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  setupMobileNavigation();
  renderFooter();
  renderWhatsApp();
  setupTabs();
  setupForms();
  setupQuoteForm();
  setupLinkedInButton();
  setupLogoCarouselPause();
});
