// Loads approved listings from Supabase. Needs the Supabase script and config.js loaded first.
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = l => `UGX ${l.price/1000}k per ${l.period}`;
const waLink = l => `https://wa.me/${l.phone}?text=` + encodeURIComponent(`Hi, I saw ${l.title} on Ishaka Hostels (${location.origin}/hostel-details.html?id=${l.id}). Is it still available?`);
const mapListing = r => ({ id:r.id, title:r.title, type:r.type, area:r.area, price:r.price, period:r.period, deposit:r.deposit, walkMins:r.walk_mins,
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
