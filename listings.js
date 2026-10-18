// Loads approved listings from Supabase and runs the student contact flow (lead capture).
// Needs the Supabase script and config.js loaded first.
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = l => `UGX ${l.price/1000}k per ${l.period}`;
const waLink = (l, code, name) => `https://wa.me/${l.phone}?text=` + encodeURIComponent(
  `Hi, ${name ? "I'm " + name + '. ' : ''}I saw ${l.title} on Campus Hostels (${location.origin}/hostel-details.html?id=${l.id}).${code ? ' My reference is ' + code + '.' : ''} Is it still available?`);
// Campuses students can choose from. Edit this one list to add or rename campuses everywhere on the site.
const CAMPUSES = ['KIU Ishaka', 'MUST Mbarara', 'Makerere Kampala', 'Kyambogo Kampala'];
const CACHE = {};
const mapListing = r => (CACHE[r.id] = { id:r.id, title:r.title, type:r.type, campus:r.campus, units:r.units_available, area:r.area, price:r.price, period:r.period, deposit:r.deposit, walkMins:r.walk_mins,
  roomKind:r.room_kind, amenities:r.amenities || [], image:r.image_url, phone:r.phone, landlord:r.landlord_name, note:r.note,
  status:r.status, featured:r.featured, createdAt:r.created_at, reviews:[] });
async function loadListings() {
  const { data, error } = await db.from('listings').select('*').eq('status', 'approved').order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data.map(mapListing);
}
async function loadListing(id) {
  const { data, error } = await db.from('listings').select('*').eq('id', id).eq('status', 'approved').maybeSingle();
  return error || !data ? null : mapListing(data);
}

// Any element with data-lead="<listing id>" (and optional data-act="call") opens this flow.
function openLead(id, act) {
  const l = CACHE[id]; if (!l) return;
  const old = document.getElementById('lead-modal'); if (old) old.remove();
  let saved = {}; try { saved = JSON.parse(localStorage.getItem('ih-lead') || '{}'); } catch (e) {}
  const m = document.createElement('div');
  m.id = 'lead-modal';
  m.className = 'fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center';
  m.innerHTML = `<div class="bg-white w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl p-5 max-h-full overflow-auto">
    <div class="flex justify-between items-start"><h2 class="font-bold">${esc(l.title)}</h2><button type="button" data-x class="text-gray-500 text-2xl leading-none" aria-label="Close">&times;</button></div>
    <div id="lead-body"></div></div>`;
  document.body.appendChild(m);
  m.addEventListener('click', e => { if (e.target === m || e.target.hasAttribute('data-x')) m.remove(); });
  const body = m.querySelector('#lead-body');
  body.innerHTML = `<p class="text-sm text-gray-600 mt-1">Tell the landlord who you are. You'll get a reference code that proves your booking.</p>
    <form id="lead-form" class="space-y-2 mt-3">
      <input id="ln" required minlength="2" placeholder="Your name" value="${esc(saved.n)}" class="w-full border p-3 rounded">
      <input id="lp" required type="tel" placeholder="Your phone e.g. 0771234567" value="${esc(saved.p)}" class="w-full border p-3 rounded">
      <input id="lc" placeholder="Course and year (optional)" value="${esc(saved.c)}" class="w-full border p-3 rounded">
      <button id="lgo" class="w-full bg-green-700 text-white p-3 rounded-xl font-bold">Continue</button>
      <p id="lerr" class="text-sm text-red-600" role="status"></p>
    </form>`;
  body.querySelector('#lead-form').onsubmit = async e => {
    e.preventDefault();
    const n = body.querySelector('#ln').value.trim(), p = body.querySelector('#lp').value.trim(), c = body.querySelector('#lc').value.trim();
    body.querySelector('#lgo').disabled = true;
    const { data, error } = await db.rpc('create_lead', { p_listing: l.id, p_name: n, p_phone: p, p_course: c });
    if (error) { body.querySelector('#lerr').textContent = error.message; body.querySelector('#lgo').disabled = false; return; }
    try { localStorage.setItem('ih-lead', JSON.stringify({ n, p, c })); } catch (e) {}
    const call = act === 'call';
    body.innerHTML = `<p class="mt-3 text-sm text-gray-600">Your reference code</p>
      <p class="text-3xl font-bold tracking-widest text-green-700">${esc(data)}</p>
      <p class="text-sm text-gray-600 mt-1">Give this code to the landlord when you visit or move in.</p>
      <a href="${call ? 'tel:+' + esc(l.phone) : waLink(l, data, n)}" target="_blank" rel="noopener" class="block mt-4 bg-green-700 text-white text-center p-3 rounded-xl font-bold">${call ? 'Call landlord' : 'Open WhatsApp'}</a>`;
  };
}
document.addEventListener('click', e => { const b = e.target.closest('[data-lead]'); if (b) openLead(b.dataset.lead, b.dataset.act); });
