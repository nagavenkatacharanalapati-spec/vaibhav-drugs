/* Shared, local UI components. Kept inline so the static site works from file:// too. */
(() => {
  const footer = document.querySelector('[data-site-footer]');
  if (!footer) return;

  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container footer-main">
      <div>
        <a class="brand" href="index.html"><span class="brand-mark"><i class="fa-solid fa-leaf"></i></span>VAIBHAV DRUGS</a>
        <p class="footer-copy">A considered corporate presence for Vaibhav Drugs Pvt Ltd, built around quality, responsibility and scientific progress.</p>
      </div>
      <div><h2 class="footer-heading">Explore</h2><ul class="footer-links"><li><a href="about.html">About Us</a></li><li><a href="products.html">Products</a></li><li><a href="quality.html">Quality</a></li><li><a href="manufacturing.html">Manufacturing</a></li></ul></div>
      <div><h2 class="footer-heading">Discover</h2><ul class="footer-links"><li><a href="research.html">Research &amp; Development</a></li><li><a href="careers.html">Careers</a></li><li><a href="contact.html">Contact Us</a></li></ul></div>
      <div><h2 class="footer-heading">Contact</h2><div class="footer-contact"><span><i class="fa-solid fa-location-dot"></i> [Company Address]</span><span><i class="fa-solid fa-phone"></i> <a href="tel:+919246551771">9246551771</a></span><span><i class="fa-solid fa-envelope"></i> <a href="mailto:office.vaibhavdrugs@gmail.com">office.vaibhavdrugs@gmail.com</a></span></div></div>
    </div>
    <div class="container footer-bottom"><span>© ${new Date().getFullYear()} Vaibhav Drugs Pvt Ltd. All rights reserved.</span><span>Placeholder content is clearly marked where details have not been provided.</span></div>`;
})();
