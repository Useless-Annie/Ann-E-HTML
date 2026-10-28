/* ==================== COLLECTION CENTERS MAP (Leaflet) ==================== */
// EDIT HERE: one entry per collection center. The coordinates below are sample
// locations in Panama; replace them (and the address/hours) with your real centers.
const CENTERS = [
  { name: 'Center 1', address: 'Address · Hours', lat: 8.9824, lng: -79.5199 },   // Panama City
  { name: 'Center 2', address: 'Address · Hours', lat: 9.3547, lng: -79.9014 },   // Colón
  { name: 'Center 3', address: 'Address · Hours', lat: 8.4273, lng: -82.4308 }    // David
];
let collectionMap = null;
const centerMarkers = [];

// Cards are generated from the CENTERS array so the map and the list always match.
$('centersList').innerHTML = CENTERS.map((c, i) =>
  `<div class="card reveal d${i}" data-center="${i}" tabindex="0" role="button" aria-label="Show ${c.name} on the map"><h3>${c.name}</h3><p>${c.address}</p></div>`).join('');
document.querySelectorAll('#centersList .reveal').forEach(el => revealObserver.observe(el));

function initCollectionMap() {
  if (collectionMap) { setTimeout(() => collectionMap.invalidateSize(), 50); return; }
  if (typeof L === 'undefined') { $('collectionMap').dataset.label = 'The map could not load. Check your internet connection.'; return; }

  const panama = L.latLngBounds([7.1, -83.2], [9.7, -77.0]);
  collectionMap = L.map('collectionMap', { minZoom: 7, maxBounds: panama.pad(.15), maxBoundsViscosity: .8, scrollWheelZoom: false }).fitBounds(panama);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(collectionMap);

  // Wheel zoom only after clicking the map, so the page can still scroll normally
  collectionMap.on('click', () => collectionMap.scrollWheelZoom.enable());
  collectionMap.on('mouseout', () => collectionMap.scrollWheelZoom.disable());

  const icon = L.divIcon({ className: 'center-pin-wrap', html: '<span class="center-pin"></span>', iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -14] });
  CENTERS.forEach(c => {
    centerMarkers.push(L.marker([c.lat, c.lng], { icon, title: c.name }).addTo(collectionMap).bindPopup(`<strong>${c.name}</strong><br>${c.address}`));
  });
  setTimeout(() => collectionMap.invalidateSize(), 50);
}

// Clicking a card flies the map to that center
function focusCenter(card) {
  const i = +card.dataset.center, c = CENTERS[i];
  initCollectionMap();
  if (!collectionMap) return;
  document.querySelectorAll('#centersList .card').forEach(x => x.classList.toggle('active', x === card));
  $('collectionMap').scrollIntoView({ behavior: 'smooth', block: 'center' });
  collectionMap.flyTo([c.lat, c.lng], 11);
  centerMarkers[i].openPopup();
}
$('centersList').onclick = e => { const card = e.target.closest('[data-center]'); if (card) focusCenter(card); };
$('centersList').onkeydown = e => { if (e.key === 'Enter') { const card = e.target.closest('[data-center]'); if (card) focusCenter(card); } };

initCollectionMap();
