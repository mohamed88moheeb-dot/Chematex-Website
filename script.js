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

const logoImg = `<img src="assets/logo/chematex-icon.png" alt="ChemaTex logo mark" class="brand-logo" />`;

function renderHeader(){
  const categoryDropdown = categoryLinks.map(([href,label]) => `<a href="${href}">${label}</a>`).join('');
  const nav = links.map(([href,label,key,hasDropdown]) => {
    if(hasDropdown){
      return `<div class="nav-dropdown"><a href="${href}" class="${currentPage===key?'active':''}">${label} <span>⌄</span></a><div class="dropdown-menu">${categoryDropdown}</div></div>`;
    }
    return `<a href="${href}" class="${currentPage===key?'active':''}">${label}</a>`;
  }).join('');
  const mobile = links.map(([href,label,key,hasDropdown]) => {
    if(hasDropdown){
      return `
        <button class="mobile-dropdown-toggle ${currentPage===key?'active':''}" type="button">
          ${label} <span>⌄</span>
        </button>
        <div class="mobile-submenu mobile-submenu-collapsible">
          ${categoryDropdown}
        </div>
      `;
    }
    return `<a href="${href}" class="${currentPage===key?'active':''}">${label}</a>`;
  }).join('');
  document.getElementById('site-header').innerHTML = `
    <header class="site-header">
      <div class="container navbar">
        <a class="brand" href="index.html" aria-label="ChemaTex home">${logoImg}<span>ChemaTex</span></a>
        <nav class="nav-links" aria-label="Main navigation">${nav}</nav>
        <button class="menu-btn" aria-label="Open menu" onclick="document.querySelector('.mobile-menu').classList.toggle('open')">☰</button>
      </div>
      <div class="mobile-menu">${mobile}</div>
    </header>`;
}

function renderFooter(){
  document.getElementById('site-footer').innerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html" style="color:white;font-size:1.75rem;margin-bottom:14px">${logoImg}<span>ChemaTex</span></a>
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
          <a href="category-cosmetics-personal-care.html">Personal Care</a>
          <a href="category-ro-water-treatment.html">RO Water Treatment</a>
          <a href="category-sanitizers-disinfectants.html">Sanitizers</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="tel:+20222675966">+2 02 2267 5966</a>
          <a href="tel:+201026622319">+2 0102 6622319</a>
          <a href="tel:+201026622320">+2 0102 6622320</a>
          <a href="mailto:chematex@chematex-eg.com">chematex@chematex-eg.com</a>
          <a 
            href="https://www.google.com/maps/search/?api=1&query=CHEMATEX%20COMPANY%20Textile%20Auxiliaries%20Detergents%20Cosmetics%20Factory" 
            target="_blank" 
            rel="noopener">
            Industrial Area, New Cairo 3, Cairo Governorate 4716015, Egypt
          </a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 ChemaTex. All Rights Reserved.</span>
      </div>
    </div>
  </footer>`;
}

function renderWhatsApp(){
  const msg = encodeURIComponent('Hello ChemaTex, I would like to ask about your chemical solutions.');
  document.getElementById('whatsapp').innerHTML = `<a class="whatsapp" aria-label="Contact ChemaTex on WhatsApp" href="https://wa.me/201026622319?text=${msg}" target="_blank" rel="noopener">✆</a>`;
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
        note.textContent = 'Thank you. This demo form is ready visually. Connect it to Formspree, Netlify Forms, EmailJS, or your backend to receive messages.';
        note.style.color = '#365d63';
        note.style.fontWeight = '800';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderWhatsApp();
  setupTabs();
  setupForms();
});


/* Floating LinkedIn button */
document.addEventListener("DOMContentLoaded", function () {
  const linkedinButton = document.createElement("a");

  linkedinButton.className = "linkedin-float";
  linkedinButton.href = "PASTE_YOUR_LINKEDIN_LINK_HERE";
  linkedinButton.target = "_blank";
  linkedinButton.rel = "noopener";
  linkedinButton.setAttribute("aria-label", "Open LinkedIn");

  linkedinButton.innerHTML = "in";

  document.body.appendChild(linkedinButton);
});

/* Quote form dynamic product dropdown + quantity options */
document.addEventListener("DOMContentLoaded", function () {
  const productsByCategory = {
    "Textile Auxiliaries": [
      "Pretreatment Product 01",
      "Pretreatment Product 02",
      "Pretreatment Product 03",
      "Pretreatment Product 04",
      "Pretreatment Product 05",
      "Pretreatment Product 06",
      "Pretreatment Product 07",
      "Pretreatment Product 08",
      "Dyeing Product 01",
      "Dyeing Product 02",
      "Dyeing Product 03",
      "Dyeing Product 04",
      "Dyeing Product 05",
      "Dyeing Product 06",
      "Dyeing Product 07",
      "Dyeing Product 08",
      "Printing Product 01",
      "Printing Product 02",
      "Printing Product 03",
      "Printing Product 04",
      "Printing Product 05",
      "Printing Product 06",
      "Printing Product 07",
      "Printing Product 08",
      "Finishing Product 01",
      "Finishing Product 02",
      "Finishing Product 03",
      "Finishing Product 04",
      "Finishing Product 05",
      "Finishing Product 06",
      "Finishing Product 07",
      "Finishing Product 08"
    ],
    "Industrial Detergents": [
      "All-in-One Sanitizer and Disinfectant - CHEMASURF 3 in 1",
      "Multi-Surface Glass Cleaner - CHEMASPARK G",
      "Lime Scale Remover - CHEMARUST"
    ],
    "Cosmetics & Personal Care": [
      "Mild hand-wash for frequent use - CHEMACARE",
      "Foaming antibacterial hand wash - PROCARE",
      "Shower gel with Argan oil - CHEMALINE (Argan)"
    ],
    "RO Water Treatment": [
      "RO 1",
      "RO 2",
      "RO 3"
    ],
    "Sanitizers & Disinfectants": [
      "Alcohol Gel Hand Sanitizer - Chemol",
      "Alcohol Rub for Hand Disinfection - CHEMASINZE (70)",
      "Sanitizer for all Fabrics - CHEMA SANITIZER",
      "Cleanser, Disinfectant, and Antiseptic - CHEMATOL"
    ],
    "Raw Materials": [
      "RM 1",
      "RM 2",
      "RM 3",
      "RM 4",
      "RM 5",
      "RM 6",
      "RM 7",
      "RM 8"
    ]
  };

  const categorySelect = document.getElementById("quoteCategory");
  const productSelect = document.getElementById("quoteProduct");
  const quantitySelect = document.getElementById("quoteQuantity");

  if (quantitySelect) {
    for (let i = 1; i <= 100; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      quantitySelect.appendChild(option);
    }
  }

  if (categorySelect && productSelect) {
    categorySelect.addEventListener("change", function () {
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
    });
  }
});


/* Auto-select quote product and category from product pages */
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const productParam = params.get("product");
  const categoryParam = params.get("category");
  const categorySelect = document.getElementById("quoteCategory");
  const productSelect = document.getElementById("quoteProduct");

  if (categorySelect && productSelect && categoryParam) {
    categorySelect.value = categoryParam;
    categorySelect.dispatchEvent(new Event("change"));

    if (productParam) {
      setTimeout(function () {
        const matchingOption = Array.from(productSelect.options).find(function (option) {
          return option.value === productParam || option.textContent === productParam;
        });
        if (matchingOption) {
          productSelect.value = matchingOption.value;
        }
      }, 50);
    }
  }
});
