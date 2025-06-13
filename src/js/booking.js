// Memuat detail mobil untuk booking
async function loadCarForBooking() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (!carId) {
        alert('ID mobil tidak ditemukan');
        window.location.href = 'index.html';
        return;
    }

    try {
        const data = await postData('/cars', { id: parseInt(carId) });
        const car = data.data;
        if (!car) throw new Error('Data mobil tidak valid');

        // Simpan detail mobil
        const bookingForm = document.querySelector('form');
        if (bookingForm) bookingForm.setAttribute('data-car-id', car.id);
        
        localStorage.setItem('booked_car_id', car.id);
        localStorage.setItem('booked_car_name', car.name);
        localStorage.setItem('booked_car_price', car.price);
        localStorage.setItem('booked_car_image', car.image || './assets/car1.png');

        // Update UI
        const carCard = document.querySelector('.bg-white.rounded-2xl.border');
        if (carCard) {
            carCard.querySelector('img').src = car.image || './assets/car1.png';
            carCard.querySelector('img').alt = car.name;
            carCard.querySelector('h2').innerHTML = `${car.name} <span class="text-xs md:text-sm font-medium">(${car.color || 'Black'})</span>`;
            carCard.querySelector('.font-bold.text-blue-600').innerHTML = `Rp ${car.price.toLocaleString('id-ID')} <span class="text-gray-500 text-xs md:text-sm font-normal">/day</span>`;
        }
    } catch (error) {
        alert('Gagal memuat data mobil');
    }
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
        alert('Mohon isi semua field');
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
        
        // Generate booking ID
        const generateId = () => 'MB' + Math.random().toString(36).substring(2, 10).toUpperCase();
        
        // Try API booking
        try {
            const response = await postData('/bookings', bookingData);
            const bookingId = response.data?.id || response.id || (typeof response.data === 'string' ? response.data : null);
            
            if (!bookingId) throw new Error('Invalid booking ID');
            
            localStorage.setItem('booking_id', bookingId);
        } catch {
            // Fallback to local ID
            localStorage.setItem('booking_id', generateId());
        }
        
        // Save common booking data
        localStorage.setItem('user_email', email);
        localStorage.setItem('booking_phone', phone);
        localStorage.setItem('booking_name', fullName);
        localStorage.setItem('booking_duration', duration);
        localStorage.setItem('booking_date', bookingDate);
        localStorage.setItem('booked_car_id', carId);
        
        window.location.href = 'booking-success.html';
    } catch (error) {
        alert('Booking gagal');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Continue Booking <svg>...</svg>';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadCarForBooking();
    const bookingForm = document.querySelector('form');
    if (bookingForm) bookingForm.addEventListener('submit', bookCar);
});