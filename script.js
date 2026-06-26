const currentPage = document.body.dataset.page || 'home';
const links = [
  ['index.html', 'Home', 'home'],
  ['about.html', 'About Us', 'about'],
  ['solutions.html', 'Products', 'solutions', true],
  ['industries.html', 'Industries', 'industries'],
  ['contact.html', 'Contact Us', 'contact']
];

const categoryLinks = [
  ['category-textile-auxiliaries.html', 'Textile Auxiliaries'],
  ['category-industrial-detergents.html', 'Household Detergents & Cleaners'],
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
  "Household Detergents & Cleaners": [
    "CHEMA STRIL",
    "CHEMA BOOST",
    "CHEMA STAIN EXTRA",
    "CHEMA BRIGHT",
    "CHEMA CHLORINZ",
    "CHEMA BUFF",
    "CHEMA SILK",
    "CHEMASILK ULTRA",
    "CHEMOLINE ALL IN 1",
    "CHEMOLINE ECO",
    "CHEMOLINE FOAM",
    "CHEMASOL HS-300",
    "CHEMASOL HS-500",
    "CHEMASOL CETO 7 IN 1",
    "CHEMATRIL WD-ECO",
    "CHEMAGRIL ULTRA",
    "CHEMASCALE SQ-200",
    "CHEMAGLOSS STL",
    "CHEMASTRIP",
    "CHEMADRY",
    "CHEMASHINE STAR",
    "CHEMASPARK G",
    "CHEMARUST",
    "CHEMAWOOD",
    "CHEMAFRESH",
    "CHEMATTOL 4 IN 1",
    "CHEMALIME",
    "CHEMACARP FOAM",
    "CHEMACARP"
  ],
  "Cosmetics & Personal Care": [
    "CHEMACARE",
    "PROCARE",
    "CHEMALINE ARGAN",
    "CHEMALINE SHEA",
    "CHEMALINE COCOA",
    "CHEMALINE FLOWERS",
    "CHEMALINE OUD",
    "CHEMASILK NORMAL",
    "CHEMASILK MOIST",
    "CHEMASILK GRZ",
    "CHEMASILK DRF"
  ],
  "Sanitizers & Disinfectants": [
    "CHEMA SANT-G",
    "CHEMAGLOSS SSD",
    "CHEMOXIL HYG",
    "CHEMASINZE GT CONC",
    "CHEMASINT CPS",
    "CHEMASURF 3 IN 1",
    "CHEMATTOL",
    "CHEMASINZE 70",
    "CHEMOL"
  ],
  "RO Water Treatment": [
    "Products available upon request"
  ],
  "Raw Materials": [
    "Products available upon request"
  ]
};

const defaultPackagingByCategory = {
  "Textile Auxiliaries": ["Available upon request"],
  "RO Water Treatment": ["Available upon request"],
  "Raw Materials": ["Available upon request"]
};

const packagingByProduct = {
  "CHEMA STRIL": ["20 L"],
  "CHEMA BOOST": ["20 L"],
  "CHEMA STAIN EXTRA": ["20 L"],
  "CHEMA BRIGHT": ["20 L"],
  "CHEMA CHLORINZ": ["20 L"],
  "CHEMA BUFF": ["20 L"],
  "CHEMA SILK": ["20 L"],
  "CHEMASILK ULTRA": ["20 L"],
  "CHEMA SANT-G": ["20 L"],
  "CHEMOLINE ALL IN 1": ["5 L", "20 L"],
  "CHEMOLINE ECO": ["5 L", "20 L"],
  "CHEMOLINE FOAM": ["5 L", "20 L"],
  "CHEMASOL HS-300": ["5 L", "20 L"],
  "CHEMASOL HS-500": ["5 L", "20 L"],
  "CHEMASOL CETO 7 IN 1": ["5 L", "20 L"],
  "CHEMATRIL WD-ECO": ["5 L", "20 L"],
  "CHEMAGRIL ULTRA": ["5 L", "20 L"],
  "CHEMASCALE SQ-200": ["5 L", "20 L"],
  "CHEMAGLOSS SSD": ["5 L", "20 L"],
  "CHEMAGLOSS STL": ["5 L", "20 L"],
  "CHEMASTRIP": ["5 L", "20 L"],
  "CHEMADRY": ["5 L", "20 L"],
  "CHEMOXIL HYG": ["5 L", "20 L"],
  "CHEMASINZE GT CONC": ["5 L", "20 L"],
  "CHEMASINT CPS": ["1 kg", "5 kg"],
  "CHEMASHINE STAR": ["1 kg", "5 kg"],
  "CHEMASURF 3 IN 1": ["5 L", "20 L"],
  "CHEMASPARK G": ["5 L", "20 L"],
  "CHEMARUST": ["5 L", "20 L"],
  "CHEMAWOOD": ["5 L", "20 L"],
  "CHEMAFRESH": ["5 L", "20 L"],
  "CHEMATTOL 4 IN 1": ["5 L", "20 L"],
  "CHEMALIME": ["5 L", "20 L"],
  "CHEMACARP FOAM": ["5 L", "20 L"],
  "CHEMACARP": ["5 L", "20 L"],
  "CHEMATTOL": ["5 L", "20 L"],
  "CHEMACARE": ["5 L", "20 L"],
  "PROCARE": ["5 L", "20 L"],
  "CHEMALINE ARGAN": ["5 L", "20 L"],
  "CHEMALINE SHEA": ["5 L", "20 L"],
  "CHEMALINE COCOA": ["5 L", "20 L"],
  "CHEMALINE FLOWERS": ["5 L", "20 L"],
  "CHEMALINE OUD": ["5 L", "20 L"],
  "CHEMASILK NORMAL": ["5 L", "20 L"],
  "CHEMASILK MOIST": ["5 L", "20 L"],
  "CHEMASILK GRZ": ["5 L", "20 L"],
  "CHEMASILK DRF": ["5 L", "20 L"],
  "CHEMASINZE 70": ["5 L", "20 L"],
  "CHEMOL": ["50 g", "500 g", "20 kg"]
};

const logoImg = `<img src="assets/logo/chematex-standalone-logo.png" alt="Chematex logo mark" class="brand-logo" />`;

function renderHeader(){
  const categoryDropdown = categoryLinks.map(([href,label]) => `<a href="${href}">${label}</a>`).join('');
  const nav = links.map(([href,label,key,hasDropdown]) => {
    const isActive = currentPage === key || (hasDropdown && currentPage === 'categories');
    if(hasDropdown){
      return `<div class="nav-dropdown"><a href="${href}" class="${isActive?'active':''}">${label} <span aria-hidden="true">⌄</span></a><div class="dropdown-menu">${categoryDropdown}</div></div>`;
    }
    return `<a href="${href}" class="${isActive?'active':''}">${label}</a>`;
  }).join('');
  const mobile = links.map(([href,label,key,hasDropdown]) => {
    const isActive = currentPage === key || (hasDropdown && currentPage === 'categories');
    if(hasDropdown){
      return `
        <div class="mobile-dropdown-row">
          <a href="${href}" class="${isActive?'active':''}">${label}</a>
          <button class="mobile-dropdown-toggle" type="button" aria-label="Toggle product categories" aria-expanded="false" aria-controls="mobile-category-submenu">
            <span aria-hidden="true">⌄</span>
          </button>
        </div>
        <div id="mobile-category-submenu" class="mobile-submenu mobile-submenu-collapsible">
          ${categoryDropdown}
        </div>
      `;
    }
    return `<a href="${href}" class="${isActive?'active':''}">${label}</a>`;
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
          <p>Egypt-based chemical manufacturer and supplier of textile auxiliaries, cleaning products, personal care products, sanitizers, water treatment chemicals, and raw materials.</p>
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
          <a href="category-industrial-detergents.html">Household Detergents & Cleaners</a>
          <a href="category-cosmetics-personal-care.html">Cosmetics & Personal Care</a>
          <a href="category-ro-water-treatment.html">RO Water Treatment</a>
          <a href="category-sanitizers-disinfectants.html">Sanitizers & Disinfectants</a>
          <a href="category-raw-materials.html">Raw Materials</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="tel:+201005430909">01005430909</a>
          <a href="tel:+201026622321">01026622321</a>
          <a href="tel:+20225734582">0225734582</a>
          <a href="mailto:chematex.gp@gmail.com">chematex.gp@gmail.com</a>
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
  document.getElementById('whatsapp').innerHTML = `
    <div class="floating-actions" aria-label="Contact Chematex">
      <a class="floating-action floating-action-email" aria-label="Email Chematex" title="Email Chematex" href="mailto:chematex.gp@gmail.com">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h16v16H4zM4 7l8 6 8-6"/></svg>
      </a>
      <a class="floating-action floating-action-call" aria-label="Call Chematex" title="Call Chematex" href="tel:+201026622321">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8.01 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.9Z"/></svg>
      </a>
      <a class="floating-action whatsapp" aria-label="Contact Chematex on WhatsApp" title="WhatsApp Chematex" href="https://wa.me/201005430909?text=${msg}" target="_blank" rel="noopener">✆</a>
    </div>`;
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

function setupInquiryForm(){
  const inquiryType = document.getElementById('inquiryType');
  const inquiryMessage = document.getElementById('inquiryMessage');

  if (!inquiryType || !inquiryMessage) return;

  const params = new URLSearchParams(window.location.search);
  const inquiryTypeParam = params.get('inquiryType');
  const messageParam = params.get('message');

  if (inquiryTypeParam && Array.from(inquiryType.options).some(option => option.value === inquiryTypeParam)) {
    inquiryType.value = inquiryTypeParam;
  }

  if (messageParam) {
    inquiryMessage.value = messageParam;
  }
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
  const packagingSelect = document.getElementById("quotePackaging");

  if (quantitySelect && quantitySelect.options.length <= 1) {
    for (let i = 1; i <= 100; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      quantitySelect.appendChild(option);
    }
  }

  if (packagingSelect) {
    const resetPackaging = function (message) {
      packagingSelect.innerHTML = "";
      const option = document.createElement("option");
      option.value = "";
      option.textContent = message;
      packagingSelect.appendChild(option);
    };

    resetPackaging("Select a product first");
  }

  if (categorySelect && productSelect) {
    const populatePackaging = function () {
      if (!packagingSelect) return;

      const selectedProduct = productSelect.value;
      const selectedCategory = categorySelect.value;
      packagingSelect.innerHTML = "";

      if (!selectedProduct) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Select a product first";
        packagingSelect.appendChild(option);
        return;
      }

      const baseOptions = packagingByProduct[selectedProduct] || defaultPackagingByCategory[selectedCategory] || ["Available upon request"];
      const options = Array.from(new Set([...baseOptions, "Sample"]));

      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = "Select Packaging";
      packagingSelect.appendChild(placeholderOption);

      options.forEach(function (packaging) {
        const option = document.createElement("option");
        option.value = packaging;
        option.textContent = packaging;
        packagingSelect.appendChild(option);
      });
    };

    const populateProducts = function () {
      const selectedCategory = categorySelect.value;
      const products = productsByCategory[selectedCategory] || [];

      productSelect.innerHTML = "";
      populatePackaging();

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

      populatePackaging();
    };

    categorySelect.addEventListener("change", populateProducts);
    productSelect.addEventListener("change", populatePackaging);

    const params = new URLSearchParams(window.location.search);
    const productParam = params.get("product");
    const categoryParam = params.get("category");
    const packagingParam = params.get("packaging");

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
          populatePackaging();

          if (packagingParam && packagingSelect) {
            const matchingPackagingOption = Array.from(packagingSelect.options).find(function (option) {
              return option.value === packagingParam || option.textContent === packagingParam;
            });
            if (matchingPackagingOption) {
              packagingSelect.value = matchingPackagingOption.value;
            }
          }
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
  setupInquiryForm();
  setupQuoteForm();
  setupLinkedInButton();
  setupLogoCarouselPause();
});
