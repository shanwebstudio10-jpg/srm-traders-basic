// ===== இங்கே உங்கள் விவரங்களை மாற்றவும் =====
const SITE = {
  name: 'S.R.M. Traders',
  tagline: 'Corporate Gifts, Bags & Promotional Products',
  address: 'New #18, Old #66, Malayaperumal Street (Next to Mosque), Ranga Complex, Chennai - 600001',
  phone: '9444 534 944 / 7845 498 145',
  landline: '044 - 4203 8144 / 4005 9601',
  email: 'srmtraders1@yahoo.in',
  whatsapp: '919444534944', // 91 + 10 இலக்க எண், + குறி வேண்டாம்
};

const CATS = [
  { slug: 'diary', label: 'New Year Diaries' },
  { slug: 'calendar', label: 'Calendars' },
  { slug: 'jute-bag', label: 'Jute Bags' },
  { slug: 'net-bag', label: 'Net Bags' },
  { slug: 'travel-bag', label: 'Travel Bags' },
  { slug: 'files', label: 'Files' },
  { slug: 'corporate-gifts', label: 'Corporate Gift Items' },
  { slug: 'promotional', label: 'Promotional Products' },
];

// புதிய product சேர்க்க ஒரு வரி நகலெடுத்து மாற்றவும்
const PRODUCTS = [
  { name: 'Executive Diary 2027', cat: 'diary', note: 'A5 size, logo printing' },
  { name: 'Table Calendar 2027', cat: 'calendar', note: 'Custom company branding' },
  { name: 'Jute Bag Standard', cat: 'jute-bag', note: 'Laminated, cotton handles' },
  { name: 'Net Bag Foldable', cat: 'net-bag', note: 'Reusable shopping bag' },
  { name: 'Travel Backpack', cat: 'travel-bag', note: 'Water resistant' },
  { name: 'Office File Folder', cat: 'files', note: 'Printed with your logo' },
  { name: 'Corporate Gift Set', cat: 'corporate-gifts', note: 'Diary, pen and mug' },
  { name: 'Promotional Pen', cat: 'promotional', note: 'Logo print, bulk rates' },
];
// ===== இதற்கு கீழே மாற்ற வேண்டாம் =====

const wa = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
const tel = 'tel:+91' + SITE.phone.split('/')[0].replace(/\D/g, '');
const $ = (id) => document.getElementById(id);
const page = location.pathname.split('/').pop() || 'index.html';

function productCard(p) {
  return `<article class="card"><img src="images/featured/${p.cat}.jpg" alt="${p.name}" loading="lazy">
    <h3>${p.name}</h3><small>${p.note}</small>
    <a class="btn btn-navy sm" target="_blank" rel="noreferrer" href="${wa('Hi, I need a quote for ' + p.name)}">Get Quote</a></article>`;
}

function renderChrome() {
  const on = (f) => (page === f ? ' class="active"' : '');
  $('header').innerHTML = `
  <div class="topbar"><div class="wrap topbar-in">
    <span>📍 ${SITE.address}</span><span>📞 ${SITE.phone}</span><span>☎ ${SITE.landline}</span><span>✉ ${SITE.email}</span>
  </div></div>
  <div class="wrap nav-in">
    <a href="index.html" class="brand"><img src="images/logo.png" alt="" width="60" height="60">
      <span><b>S.R.M. TRADERS</b><small>${SITE.tagline}</small></span></a>
    <button class="burger" onclick="document.querySelector('.links').classList.toggle('open')" aria-label="Menu">☰</button>
    <nav class="links">
      <a href="index.html"${on('index.html')}>Home</a>
      <a href="products.html"${on('products.html')}>Products</a>
      <a href="products.html?cat=corporate-gifts">Corporate Gifting</a>
      <a href="contact.html"${on('contact.html')}>Contact</a>
    </nav>
    <div class="nav-cta">
      <a class="btn btn-green" target="_blank" rel="noreferrer" href="${wa('Hi, I need a quote for bulk products.')}">WhatsApp Enquiry</a>
      <a class="btn btn-navy" href="${tel}">📞 Call Now</a>
    </div>
  </div>`;
  const map = 'https://www.google.com/maps?q=' + encodeURIComponent(SITE.address);
  $('footer').innerHTML = `
  <div class="wrap foot-in">
    <div class="fb"><img src="images/logo.png" alt="" width="56" height="56"><div><b>S.R.M. TRADERS</b><small>${SITE.tagline}</small></div></div>
    <div><h4>Contact Details</h4><p>📍 ${SITE.address}</p><p>📞 ${SITE.phone}</p><p>☎ ${SITE.landline}</p><p>✉ ${SITE.email}</p></div>
    <div class="fl"><h4>Quick Links</h4><a href="index.html">Home</a><a href="products.html">Products</a><a href="contact.html">Contact</a></div>
    <div><h4>Our Location</h4><iframe title="Map" class="map" loading="lazy" src="${map}&output=embed"></iframe>
      <a href="${map}" target="_blank" rel="noreferrer">View on Google Maps →</a></div>
    <div><h4>Get in Touch</h4><a class="btn btn-green sm" target="_blank" rel="noreferrer" href="${wa('Hi, I need a quote.')}">WhatsApp Enquiry</a>
      <p>Send us a message for bulk orders and custom quotes.</p></div>
  </div>
  <div class="copy wrap"><span>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span></div>`;
  const fab = document.createElement('a');
  fab.className = 'wa'; fab.textContent = 'WhatsApp'; fab.target = '_blank'; fab.href = wa('Hi, I want to enquire about bulk products.');
  document.body.appendChild(fab);
}

function renderHome() {
  $('cats').innerHTML = CATS.map((c) => `<a class="cat" href="products.html?cat=${c.slug}"><img src="images/cover/${c.slug}.jpg" alt=""><span>${c.label}</span></a>`).join('');
  $('featured').innerHTML = PRODUCTS.map(productCard).join('');
}

function renderProducts() {
  const params = new URLSearchParams(location.search);
  let cat = params.get('cat') || '', q = '';
  const draw = () => {
    const list = PRODUCTS.filter((p) => (!cat || p.cat === cat) && (!q || (p.name + p.note).toLowerCase().includes(q)));
    $('list').innerHTML = list.length ? list.map(productCard).join('') : '<p>No products found.</p>';
    $('chips').innerHTML = [{ slug: '', label: 'All' }, ...CATS].map((c) => `<button class="chip${cat === c.slug ? ' on' : ''}" data-c="${c.slug}">${c.label}</button>`).join('');
    document.querySelectorAll('.chip').forEach((b) => (b.onclick = () => { cat = b.dataset.c; draw(); }));
  };
  $('search').oninput = (e) => { q = e.target.value.toLowerCase(); draw(); };
  draw();
}

function renderContact() {
  $('cform').onsubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    window.open(wa(`Name: ${f.get('name')}\nPhone: ${f.get('phone')}\n${f.get('message')}`), '_blank');
  };
}

renderChrome();
if ($('cats')) renderHome();
if ($('list')) renderProducts();
if ($('cform')) renderContact();
