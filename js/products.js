document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.product-card')];
  const input = document.querySelector('#product-search');
  const count = document.querySelector('#product-count');
  let category = 'all'; let timer;
  const filterCards = () => {
    const query = input.value.toLowerCase().trim(); let visible = 0;
    cards.forEach(card => {
      const matches = (category === 'all' || card.dataset.category === category) && card.textContent.toLowerCase().includes(query);
      card.hidden = !matches; if (matches) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? 'product' : 'products'} shown`;
    let empty = grid.querySelector('.empty-state');
    if (!visible) { if (!empty) { empty = document.createElement('div'); empty.className = 'empty-state'; empty.textContent = 'No products match your search. Please try a different term or category.'; grid.appendChild(empty); } }
    else empty?.remove();
  };
  input?.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(filterCards, 180); });
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter.active')?.classList.remove('active'); button.classList.add('active'); category = button.dataset.filter; filterCards(); }));
  const modal = document.querySelector('#product-modal'); const title = document.querySelector('#modal-title'); const type = document.querySelector('#modal-category'); const desc = document.querySelector('#modal-description'); const close = () => { modal.classList.remove('open'); document.body.classList.remove('menu-open'); };
  grid.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => { const card = button.closest('.product-card'); title.textContent = card.dataset.name; type.textContent = card.dataset.type; desc.textContent = card.dataset.description; modal.classList.add('open'); document.body.classList.add('menu-open'); modal.querySelector('.modal-close').focus(); }));
  modal?.querySelector('.modal-close')?.addEventListener('click', close); modal?.addEventListener('click', event => { if (event.target === modal) close(); }); document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal?.classList.contains('open')) close(); });
});
