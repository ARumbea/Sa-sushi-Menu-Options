const items = [
  'Signature Platter',
  'Sashimi Selection',
  'Crispy Rolls',
  'Chef Specials',
  'Salmon Lovers',
  'Temaki Night',
  'Party Tray',
  'Elegant Catering'
];

const galleryGrid = document.getElementById('galleryGrid');
items.forEach((label, index) => {
  const card = document.createElement('div');
  card.className = 'gallery-item';
  card.dataset.label = label;
  const hue = 120 + index * 7;
  card.style.background = `linear-gradient(160deg, hsl(${hue}, 48%, 16%), hsl(${hue - 10}, 37%, 28%))`;
  galleryGrid.appendChild(card);
});

document.getElementById('year').textContent = new Date().getFullYear();
