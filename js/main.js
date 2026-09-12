document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');

  const setHeader = () => header?.classList.toggle('fixed', window.scrollY > 24);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      document.body.classList.remove('menu-open');
    }));
  }

  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const error = field.parentElement.querySelector('.error');
        let message = '';
        if (!field.value.trim()) message = 'This field is required.';
        else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) message = 'Enter a valid email address.';
        field.classList.toggle('invalid', Boolean(message));
        if (error) error.textContent = message;
        if (message) valid = false;
      });
      const status = form.querySelector('.form-status');
      if (valid) {
        const recipient = form.dataset.mailto || (form.querySelector('#contact-message') ? 'office.vaibhavdrugs@gmail.com' : '');
        status.className = 'form-status success';
        if (recipient) {
          const details = [
            'New website enquiry',
            '',
            `Name: ${form.elements.name?.value.trim() || ''}`,
            `Email: ${form.elements.email?.value.trim() || ''}`,
            `Phone: ${form.elements.phone?.value.trim() || 'Not provided'}`,
            `Company: ${form.elements.company?.value.trim() || 'Not provided'}`,
            '',
            'Message:',
            form.elements.message?.value.trim() || ''
          ].join('\n');
          const subject = `Website enquiry: ${form.elements.subject?.value.trim() || 'General enquiry'}`;
          status.textContent = 'Opening your prefilled email draft…';
          window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
        } else {
          status.textContent = 'Thank you. Your form is ready for secure submission once a server endpoint is connected.';
        }
        form.reset();
      } else {
        status.className = 'form-status fail';
        status.textContent = 'Please correct the highlighted fields.';
        form.querySelector('.invalid')?.focus();
      }
    });
  });

  // Verified details supplied by Vaibhav Drugs Pvt. Ltd.
  const company = {
    address: 'Plot No. 6-121/1, Peddamberpet, Ranga Reddy District, Hyderabad – 501505, Telangana, India',
    mobile: '+91 9246551771', landline: '+91 40 29809771',
    email: 'office.vaibhavdrugs@gmail.com', cin: 'U24230AP1996PTC025387'
  };
  const footerContact = document.querySelector('.site-footer .footer-contact');
  if (footerContact) footerContact.innerHTML = `<span><i class="fa-solid fa-location-dot"></i> ${company.address}</span><span><i class="fa-solid fa-phone"></i> <a href="tel:+919246551771">${company.mobile}</a></span><span><i class="fa-solid fa-phone-volume"></i> <a href="tel:+914029809771">${company.landline}</a></span><span><i class="fa-solid fa-envelope"></i> <a href="mailto:${company.email}">${company.email}</a></span>`;
  const footerBottom = document.querySelector('.site-footer .footer-bottom');
  if (footerBottom) footerBottom.innerHTML = `<span>© ${new Date().getFullYear()} Vaibhav Drugs Pvt. Ltd. · CIN: ${company.cin}</span><span>Trusted pharmaceutical manufacturing partner since 1997.</span>`;

  const contactList = document.querySelector('.contact-list');
  if (contactList) {
    const address = contactList.querySelector('.contact-item span');
    if (address) address.textContent = company.address;
    contactList.insertAdjacentHTML('beforeend', `<div class="contact-item"><i class="fa-solid fa-phone-volume"></i><div><strong>Landline</strong><span><a href="tel:+914029809771">${company.landline}</a></span></div></div><div class="contact-item"><i class="fa-solid fa-building"></i><div><strong>CIN</strong><span>${company.cin}</span></div></div>`);
    document.querySelectorAll('.map-placeholder span').forEach(item => { item.textContent = company.address; });
  }

  // Only verified tablet and capsule offerings are shown.
  document.querySelectorAll('.teaser-card').forEach((card, index) => { if (index > 1) card.remove(); });
  const grid = document.querySelector('.product-grid');
  if (grid) {
    const products = [
      ['tablet', 'Tablets', 'Aceclofenac and Paracetamol Tablets'], ['tablet', 'Tablets', 'Aceclofenac, Paracetamol and Chlorzoxazone Tablets'],
      ['tablet', 'Tablets', 'Aceclofenac, Paracetamol and Serratiopeptidase Tablets'], ['tablet', 'Tablets', 'Aceclofenac SR Tablets'],
      ['tablet', 'Tablets', 'Paracetamol Tablets'], ['tablet', 'Tablets', 'Diclofenac Sodium and Paracetamol Tablets'],
      ['tablet', 'Tablets', 'Diclofenac Sodium, Paracetamol and Chlorzoxazone Tablets'], ['tablet', 'Tablets', 'Diclofenac Potassium, Paracetamol and Chlorzoxazone Tablets'],
      ['tablet', 'Tablets', 'Prednisolone Tablets'], ['tablet', 'Tablets', 'Betamethasone Sodium Phosphate Tablets'],
      ['tablet', 'Tablets', 'Dexamethasone Tablets'], ['tablet', 'Tablets', 'B-Complex Sugar Coated Tablets'],
      ['tablet', 'Tablets', 'Paracetamol and Caffeine Tablets'], ['tablet', 'Tablets', 'Paracetamol and Dicyclomine HCL Tablets'],
      ['capsule', 'Capsules', 'Loperamide HCL Capsules'], ['capsule', 'Capsules', 'Chlorpheniramine Maleate Capsules'],
      ['capsule', 'Capsules', 'Rabeprazole Sodium and Domperidone SR Capsules'], ['capsule', 'Capsules', 'Pantoprazole Gastro-Resistant and Domperidone SR Capsules'],
      ['capsule', 'Capsules', 'Diclofenac Sodium and Paracetamol Capsules'], ['capsule', 'Capsules', 'Paracetamol and Dicyclomine HCL Capsules']
    ];
    const prototype = grid.querySelector('.product-card');
    while (grid.querySelectorAll('.product-card').length < products.length) grid.append(prototype.cloneNode(true));
    [...grid.querySelectorAll('.product-card')].forEach((card, index) => {
      const product = products[index]; if (!product) return card.remove();
      const [category, type, name] = product;
      Object.assign(card.dataset, { category, name, type, description: `${name}. Manufactured by Vaibhav Drugs Pvt. Ltd.` });
      card.querySelector('.pill').textContent = type; card.querySelector('h3').textContent = name;
      card.querySelector('.product-info p').textContent = `Available dosage form: ${type}.`;
      card.querySelector('.product-art i').className = category === 'tablet' ? 'fa-solid fa-tablets' : 'fa-solid fa-capsules';
    });
    document.querySelectorAll('.filter').forEach(button => { if (!['all', 'tablet', 'capsule'].includes(button.dataset.filter)) button.remove(); });
  }

  const stats = [
    ['29', '+', 'Years of Experience'], ['9264', ' sq. ft.', 'Facility Area'],
    ['2', '', 'Dosage Forms'], ['1997', '', 'Commercial Operations Since']
  ];
  document.querySelectorAll('.stat').forEach((stat, index) => {
    const item = stats[index]; if (!item) return;
    const number = stat.querySelector('.stat-number');
    number.dataset.counter = item[0]; number.dataset.suffix = item[1]; number.textContent = `0${item[1]}`;
    stat.querySelector('.stat-label').textContent = item[2];
  });

  if (location.pathname.endsWith('quality.html')) {
    const note = document.querySelector('.compliance-note');
    if (note) note.innerHTML = '<strong>Manufacturing standards:</strong> Vaibhav Drugs Pvt. Ltd. operates in compliance with cGMP, Schedule M and applicable regulatory requirements, supported by documented procedures, qualified personnel and continual improvement.';
  }
  if (location.pathname.endsWith('manufacturing.html')) {
    const facilities = [
      ['Modern Manufacturing Facility', 'Tablets, film-coated tablets and capsule manufacturing.'],
      ['Infrastructure & Utilities', 'HVAC, AHUs, purified water systems, warehousing and material storage.'],
      ['Controlled Operations', 'Validation, traceability, batch documentation and controlled workflows.']
    ];
    document.querySelectorAll('.facility').forEach((card, index) => {
      if (!facilities[index]) return;
      card.querySelector('h3').textContent = facilities[index][0];
      card.querySelector('p').textContent = facilities[index][1];
    });
  }

  // Hide sections for which no company-specific detail was supplied.
  document.querySelector('.leaders')?.closest('.section')?.remove();
  if (location.pathname.endsWith('careers.html')) {
    document.querySelector('.job-list')?.closest('.section')?.remove();
    document.querySelector('#apply')?.remove();
    document.querySelector('.benefits')?.closest('.section')?.remove();
    document.querySelector('.page-hero h1').textContent = 'People, learning and development.';
  }
  if (location.pathname.endsWith('research.html')) {
    document.querySelector('.page-hero h1').textContent = 'Building a stronger future together.';
    document.querySelector('.page-hero p').textContent = 'Our focus is sustainable growth, operational excellence and long-term value for customers and business partners.';
    const futureIntro = document.querySelector('.rd-grid');
    if (futureIntro) {
      futureIntro.querySelector('.section-label').textContent = 'Future vision & growth';
      futureIntro.querySelector('h2').textContent = 'Investing in technology, people and quality systems.';
      futureIntro.querySelector('.lead').textContent = 'Vaibhav Drugs Pvt. Ltd. is focused on sustainable growth, operational excellence and creating long-term value for customers and business partners.';
    }
    document.querySelector('.research-cards')?.closest('.section')?.remove();
    document.querySelector('.science-strip')?.closest('.section')?.remove();
    document.querySelector('.quality-grid')?.closest('.section')?.remove();
  }
  document.querySelectorAll('.nav-links a[href="research.html"], .footer-links a[href="research.html"]').forEach(link => {
    const item = link.closest('li');
    if (item) item.remove(); else link.remove();
  });
  if (location.pathname.endsWith('research.html')) location.replace('manufacturing.html');

  // Position the company as a pharmaceutical manufacturing partner, not a patient-facing brand.
  if (location.pathname.endsWith('index.html') || location.pathname.endsWith('/')) {
    document.querySelector('.hero h1').textContent = 'Quality Pharmaceutical Manufacturing Through Innovation';
    document.querySelector('.hero-copy').textContent = 'Committed to reliable pharmaceutical formulation manufacturing through quality systems, technical excellence and continuous improvement.';
    document.querySelector('.intro-image .image-note').textContent = 'A dependable pharmaceutical manufacturing partner.';
    document.querySelectorAll('.intro-points div').forEach(item => { if (item.textContent.includes('Patient')) item.textContent = 'Customer-focused partnerships'; });
    document.querySelectorAll('.value-card').forEach(card => { if (card.querySelector('h3')?.textContent.includes('Patient')) card.remove(); });
  }
  if (location.pathname.endsWith('about.html')) {
    const vision = document.querySelectorAll('.vision-card p');
    if (vision[0]) vision[0].textContent = 'To become a trusted and globally recognized pharmaceutical manufacturing company, delivering high-quality, safe and affordable pharmaceutical formulations.';
    if (vision[1]) vision[1].textContent = 'To manufacture quality pharmaceutical formulations in compliance with cGMP and regulatory requirements, with consistent quality and customer satisfaction.';
    document.querySelector('.timeline')?.closest('.section')?.remove();
  }
  if (location.pathname.endsWith('careers.html')) {
    document.querySelectorAll('.culture-point').forEach(point => {
      if (point.querySelector('h3')?.textContent.includes('Meaningful')) {
        point.querySelector('h3').textContent = 'Manufacturing excellence';
        point.querySelector('p').textContent = 'Our teams contribute to quality, compliance and reliable pharmaceutical manufacturing.';
      }
    });
  }

  const addSection = (html) => document.querySelector('main')?.insertAdjacentHTML('beforeend', html);
  if (location.pathname.endsWith('about.html')) addSection(`
    <section class="section section-soft"><div class="container"><span class="section-label">Company at a glance</span><h2>Established pharmaceutical formulation manufacturer.</h2><div class="standards-grid"><article class="standard-card"><h3>Established</h3><p>1996 · Commercial operations since March 1997.</p></article><article class="standard-card"><h3>Location</h3><p>Hyderabad, Telangana, India.</p></article><article class="standard-card"><h3>Facility area</h3><p>9,264 sq. ft.</p></article><article class="standard-card"><h3>Dosage forms</h3><p>Tablets and capsules, including film-coated tablets and sustained-release capsules.</p></article><article class="standard-card"><h3>Manufacturing standards</h3><p>cGMP and Schedule M compliant.</p></article><article class="standard-card"><h3>Business focus</h3><p>Pharmaceutical formulations manufacturing with quality, compliance and customer satisfaction.</p></article></div></div></section>
    <section class="section"><div class="container"><span class="section-label">Mission &amp; values</span><h2>How we work</h2><div class="quality-statement"><div><h3>Mission</h3><p>Manufacture quality pharmaceutical formulations in compliance with cGMP and regulatory requirements; ensure consistent quality through robust systems and continuous process improvement; and build long-term partnerships through integrity, transparency and customer satisfaction.</p></div><ul><li><i class="fa-solid fa-check"></i>Quality</li><li><i class="fa-solid fa-check"></i>Integrity</li><li><i class="fa-solid fa-check"></i>Innovation</li><li><i class="fa-solid fa-check"></i>Customer Focus</li><li><i class="fa-solid fa-check"></i>Compliance</li><li><i class="fa-solid fa-check"></i>Teamwork</li></ul></div></div></section>
    <section class="section section-soft"><div class="container"><span class="section-label">Future vision &amp; growth</span><h2>Building a stronger future together.</h2><div class="standards-grid"><article class="standard-card"><h3>Growth priorities</h3><p>Expansion of manufacturing capabilities and strengthening domestic and global presence.</p></article><article class="standard-card"><h3>Continuous investment</h3><p>Investment in technology, people and quality systems.</p></article><article class="standard-card"><h3>Long-term value</h3><p>Advanced technologies, strategic partnerships, employee development and sustainable, responsible manufacturing.</p></article></div></div></section>`);

  if (location.pathname.endsWith('quality.html')) addSection(`
    <section class="section section-soft"><div class="container"><span class="section-label">Quality management system</span><h2>Documented quality systems at every stage.</h2><div class="standards-grid"><article class="standard-card"><h3>Quality system highlights</h3><p>cGMP and Schedule M compliance; SOP and document control; change control and CAPA; deviation and risk management.</p></article><article class="standard-card"><h3>Validation &amp; review</h3><p>Validation and qualification, annual product quality review (APQR), training and competency programmes.</p></article><article class="standard-card"><h3>Continuous improvement</h3><p>Self-inspection and continuous improvement supported by documented procedures and qualified personnel.</p></article></div></div></section>
    <section class="section"><div class="container"><span class="section-label">Quality control &amp; assurance</span><h2>Independent QA and QC oversight.</h2><div class="standards-grid"><article class="standard-card"><h3>Testing</h3><p>Raw material testing, in-process quality control and finished product testing.</p></article><article class="standard-card"><h3>Documentation</h3><p>Batch record review, batch release, documentation and stability studies.</p></article><article class="standard-card"><h3>Quality controls</h3><p>Method validation and verification, plus OOS, CAPA and change control.</p></article></div></div></section>`);

  if (location.pathname.endsWith('manufacturing.html')) addSection(`
    <section class="section section-soft"><div class="container"><span class="section-label">Validated manufacturing</span><h2>Traceable, controlled and compliance-led.</h2><div class="standards-grid"><article class="standard-card"><h3>Validation &amp; traceability</h3><p>Validated manufacturing steps help maintain repeatable output quality. Batch documentation supports traceability from inputs to finished packs.</p></article><article class="standard-card"><h3>Core production</h3><p>Tablets, film-coated tablets and capsules, with processes designed for dependable scale-up and routine supply.</p></article><article class="standard-card"><h3>Compliance-led operations</h3><p>Manufacturing is run in line with cGMP and Schedule M requirements through controlled workflows.</p></article></div></div></section>
    <section class="section"><div class="container"><span class="section-label">Infrastructure &amp; utilities</span><h2>Supporting controlled manufacturing conditions.</h2><div class="standards-grid"><article class="standard-card"><h3>Core infrastructure</h3><p>Modern manufacturing facility, HVAC and air handling units, purified water generation and distribution, warehousing and material storage.</p></article><article class="standard-card"><h3>Operational support</h3><p>Sampling and dispensing areas, engineering and utility services, power backup and preventive maintenance.</p></article><article class="standard-card"><h3>Safe environment</h3><p>Safe and controlled manufacturing environment designed to support uninterrupted operations.</p></article></div></div></section>
    <section class="section section-navy"><div class="container"><span class="section-label">Business approach</span><h2>Customer-focused manufacturing solutions.</h2><p class="lead">Long-term partnerships, reliable supply-chain management, on-time delivery commitment, responsive support, complete technical documentation and flexible manufacturing solutions for domestic and international markets.</p></div></section>`);

  if (location.pathname.endsWith('contact.html')) addSection(`<section class="section section-soft"><div class="container"><span class="section-label">Partner with us</span><h2>Let’s build a successful partnership.</h2><p class="lead">Vaibhav Drugs Pvt. Ltd. welcomes opportunities for contract manufacturing, third-party manufacturing and strategic business partnerships.</p></div></section>`);
});
