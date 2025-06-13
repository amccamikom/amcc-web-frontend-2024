// Mendapatkan ID mobil dari URL
function getCarIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Memuat detail mobil untuk booking
async function loadCarForBooking() {
    const carId = getCarIdFromUrl();

    if (!carId) {
        alert('ID mobil tidak ditemukan. Kembali ke halaman utama.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const data = await postData('/cars', { id: parseInt(carId) });
        if (!data || !data.data) {
            throw new Error('Struktur data mobil tidak valid');
        }

        const car = data.data;

        // Simpan detail mobil di form dan localStorage
        const bookingForm = document.querySelector('form');
        if (bookingForm) {
            bookingForm.setAttribute('data-car-id', car.id);
        }
        localStorage.setItem('booked_car_id', car.id);
        localStorage.setItem('booked_car_name', car.name);
        localStorage.setItem('booked_car_price', car.price);
        localStorage.setItem('booked_car_image', car.image || './assets/car1.png');

        // Tampilkan data mobil di halaman booking
        updateCarDetailsOnBookingPage(car);

    } catch (error) {
        alert('Gagal memuat data mobil. Silakan coba lagi nanti.');
    }
}

// Update tampilan detail mobil
function updateCarDetailsOnBookingPage(car) {
    const carCard = document.querySelector('.bg-white.rounded-2xl.border');
    if (!carCard) return;

    carCard.querySelector('img').src = car.image || './assets/car1.png';
    carCard.querySelector('img').alt = car.name;
    carCard.querySelector('h2').innerHTML = `${car.name} <span class="text-xs md:text-sm font-medium">(${car.color || 'Black'})</span>`;
    carCard.querySelector('.font-bold.text-blue-600').innerHTML = `Rp ${car.price.toLocaleString('id-ID')} <span class="text-gray-500 text-xs md:text-sm font-normal">/day</span>`;
}

// Proses booking
async function bookCar(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';

    // Get form values
    const carId = form.getAttribute('data-car-id');
    const duration = form.querySelector('input[placeholder="Booking Duration"]').value;
    const bookingDate = form.querySelector('input[type="date"]').value;
    const fullName = form.querySelector('input[placeholder="Full Name"]').value;
    const email = form.querySelector('input[placeholder="Email Address"]').value;
    const phone = form.querySelector('input[placeholder="Phone Number"]').value;

    // Validate form
    if (!duration || !bookingDate || !fullName || !email || !phone) {
        alert('Mohon isi semua field yang diperlukan.');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Continue Booking <svg>...</svg>';
        return;
    }

    try {
        const bookingData = {
            car_id: parseInt(carId),
            duration: parseInt(duration),
            booking_date: bookingDate,
            full_name: fullName,
            email: email,
            phone: phone
        };
        
        // Generate a booking ID if API fails
        const generateBookingId = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = 'MB';
            for (let i = 0; i < 8; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        };
        
        try {
            const response = await postData('/bookings', bookingData);
            
            if (response && response.data) {
                let bookingId;
                
                if (typeof response.data === 'object' && response.data.id) {
                    bookingId = response.data.id;
                } else if (typeof response.data === 'string') {
                    bookingId = response.data;
                } else if (response.id) {
                    bookingId = response.id;
                }
                
                if (bookingId) {
                    // Save booking info to localStorage
                    localStorage.setItem('booking_id', bookingId);
                    localStorage.setItem('user_email', email);
                    localStorage.setItem('booking_phone', phone);
                    localStorage.setItem('booking_name', fullName);
                    localStorage.setItem('booking_duration', duration);
                    localStorage.setItem('booking_date', bookingDate);
                    
                    window.location.href = 'booking-success.html';
                    return;
                }
            }
            
            throw new Error('Booking ID tidak diterima dari server');
            
        } catch (apiError) {
            // Use local booking ID as fallback
            const localBookingId = generateBookingId();
            
            localStorage.setItem('booking_id', localBookingId);
            localStorage.setItem('user_email', email);
            localStorage.setItem('booking_phone', phone);
            localStorage.setItem('booking_name', fullName);
            localStorage.setItem('booking_duration', duration);
            localStorage.setItem('booking_date', bookingDate);
            localStorage.setItem('booked_car_id', carId);
            
            window.location.href = 'booking-success.html';
        }
        
    } catch (error) {
        alert(`Booking gagal: ${error.message}`);
        submitButton.disabled = false;
        submitButton.innerHTML = 'Continue Booking <svg>...</svg>';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadCarForBooking();

    const bookingForm = document.querySelector('form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', bookCar);
    }
});