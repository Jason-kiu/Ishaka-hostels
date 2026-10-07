document.getElementById('listingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    hostelName: document.getElementById('hostelName').value,
    location: document.getElementById('location').value,
    price: document.getElementById('price').value,
    amenities: document.getElementById('amenities').value,
    contact: document.getElementById('contact').value,
    status: 'Pending'
  };
  fetch('YOUR_GOOGLE_SCRIPT_URL', { // replace with your Apps Script URL
    method: 'POST',
    body: JSON.stringify(data),
  })
  .then(() => alert('Listing submitted for verification!'))
  .catch((err) => alert('Error: ' + err));
});
