// Listing data. Fields match the "listings" table planned for the landlord-accounts step,
// so this file can later be replaced by a database call without changing the pages.
// sample:true marks made-up entries. Delete them once real landlords are added.
// Replace each phone with the landlord's own WhatsApp number (international format, no +).
window.LISTINGS = [
  { id:'grace-kiu-road', title:'Grace Hostel', type:'hostel', area:'KIU Road', price:450000, period:'semester', deposit:50000, walkMins:3,
    roomKind:'Single, self-contained', amenities:['Tiled','Ceiling','Security guard','Parking','Water inside','Water tank'],
    image:'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', phone:'256767037951', landlord:'Grace Hostel',
    note:'Opposite Total, 3 mins walk to KIU Main Gate', status:'approved', featured:true, createdAt:'2026-10-01',
    reviews:[{name:'Brenda, Medicine 2025', stars:5, text:'Very clean and landlord is good'}] },
  { id:'ebenezer-kanyamiramu', title:'Ebenezer Hostel', type:'hostel', area:'Kanyamiramu', price:380000, period:'semester', deposit:0, walkMins:5,
    roomKind:'Single', amenities:['Tiled','Water inside'], image:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    phone:'256767037951', landlord:'Ebenezer Hostel', note:'', status:'approved', featured:true, createdAt:'2026-10-02', reviews:[] },
  { id:'victory-town', title:'Victory Hostel', type:'hostel', area:'Town', price:600000, period:'semester', deposit:0, walkMins:15,
    roomKind:'Self-contained', amenities:['WiFi','Security guard','Tiled'], image:'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
    phone:'256767037951', landlord:'Victory Hostel', note:'', status:'approved', featured:true, createdAt:'2026-10-03', reviews:[] },
  { id:'katunga-rooms', title:'Katunga Single Rooms', type:'room', area:'Katunga', price:90000, period:'month', deposit:90000, walkMins:10,
    roomKind:'Single room, shared bathroom', amenities:['Water tank','Security guard'], image:'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
    phone:'256767037951', landlord:'Sample landlord', note:'', status:'approved', sample:true, createdAt:'2026-10-05', reviews:[] },
  { id:'town-2bed', title:'2-Bedroom Apartment', type:'apartment', area:'Town', price:350000, period:'month', deposit:350000, walkMins:20,
    roomKind:'2 bedrooms, self-contained', amenities:['Parking','Tiled','Security guard'], image:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    phone:'256767037951', landlord:'Sample landlord', note:'', status:'approved', sample:true, createdAt:'2026-10-06', reviews:[] },
  { id:'kiu-road-double', title:'Double Rooms near KIU Gate', type:'hostel', area:'KIU Road', price:300000, period:'semester', deposit:30000, walkMins:4,
    roomKind:'Double', amenities:['Water inside','Ceiling'], image:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    phone:'256767037951', landlord:'Sample landlord', note:'', status:'approved', sample:true, createdAt:'2026-10-07', reviews:[] }
];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = l => `UGX ${l.price/1000}k per ${l.period}`;
const waLink = l => `https://wa.me/${l.phone}?text=` + encodeURIComponent(`Hi, I saw ${l.title} on Ishaka Hostels (${location.origin}/hostel-details.html?id=${l.id}). Is it still available?`);
