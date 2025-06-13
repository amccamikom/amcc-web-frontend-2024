// Fungsi utama untuk menampilkan daftar booking
async function displayMyBookings() {
  const urlParams = new URLSearchParams(window.location.search);
  const container = document.querySelector(".max-w-4xl.mx-auto.px-4.md\\:px-8.pt-6.pb-20") ||
                    document.querySelector("main") ||
                    document.body;

  if (!container) return;

  container.innerHTML = '<p class="text-center py-10">Loading your bookings...</p>';

  // Get phone from URL or localStorage
  let userPhone = urlParams.get("phone") || localStorage.getItem("booking_phone");
  const bookingIdFromUrl = urlParams.get("booking_id");

  if (!userPhone) {
    showPhoneSearchForm(container);
    return;
  }

  // Display bookings
  displayDummyBookings(container, userPhone, bookingIdFromUrl);
  
  // Optional: try API call in background
  try {
    await postData(`/bookings/user`, { phone: userPhone });
  } catch (apiError) {
    // Continue using dummy data
  }
}

// Function to show phone search form
function showPhoneSearchForm(container) {
  container.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <h2 class="text-xl font-bold mb-4 text-center">Lihat Booking Anda</h2>
      <p class="text-gray-600 mb-4 text-center">Masukkan nomor telepon yang Anda gunakan saat booking.</p>
      
      <form id="search-bookings-form" class="max-w-md mx-auto flex flex-col gap-4">
        <input type="tel" placeholder="Phone Number" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Cari Booking
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <a href="index.html" class="text-blue-600 hover:underline">Kembali ke Beranda</a>
      </div>
    </div>
  `;

  const form = document.getElementById("search-bookings-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const phoneInput = form.querySelector('input[type="tel"]');
      if (phoneInput && phoneInput.value) {
        window.location.href = `listing-car.html?phone=${encodeURIComponent(phoneInput.value)}`;
      }
    });
  }
}

// Function to display bookings
function displayDummyBookings(container, userPhone, highlightBookingId) {
  const localBookingId = localStorage.getItem("booking_id") || highlightBookingId || "MB12345678";

  container.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <h2 class="text-xl font-bold mb-6">Booking Anda</h2>
      <div class="space-y-6">
        <div class="border border-gray-200 rounded-lg p-4 ${highlightBookingId === localBookingId ? "ring-2 ring-blue-500" : ""}" 
             data-booking-id="${localBookingId}">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="md:w-1/4">
              <img src="${localStorage.getItem('booked_car_image') || './assets/car1.png'}" alt="Car" class="w-full h-auto rounded-lg">
            </div>
            <div class="md:w-3/4">
              <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 class="font-bold text-lg">${localStorage.getItem('booked_car_name') || 'Toyota Avanza'}</h3>
                  <p class="text-sm text-gray-600">Booking ID: ${localBookingId}</p>
                </div>
                <span class="mt-2 md:mt-0 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
              </div>
              <div class="mt-2">
                <p class="text-sm"><strong>Phone:</strong> ${userPhone}</p>
                <p class="text-sm"><strong>Name:</strong> ${localStorage.getItem("booking_name") || "John Doe"}</p>
                <p class="text-sm"><strong>Duration:</strong> ${localStorage.getItem("booking_duration") || "3"} days</p>
                <p class="text-sm"><strong>Date:</strong> ${localStorage.getItem("booking_date") || "2023-06-15"}</p>
              </div>
              <div class="mt-4 flex justify-between items-center">
                <p class="font-bold text-blue-600">Rp ${localStorage.getItem('booked_car_price')?.toLocaleString('id-ID') || '350,000'} <span class="text-gray-500 font-normal text-sm">/day</span></p>
                <a href="#" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a href="index.html" class="mt-8 block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-center font-medium">
      Kembali ke Beranda
    </a>
  `;

  // Scroll to highlighted booking
  if (highlightBookingId) {
    setTimeout(() => {
      const bookingElement = document.querySelector(`[data-booking-id="${highlightBookingId}"]`);
      if (bookingElement) bookingElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 500);
  }
}

document.addEventListener("DOMContentLoaded", displayMyBookings);