// Menampilkan informasi pemesanan pada halaman sukses
function displayBookingSuccessInfo() {
    const bookingId = localStorage.getItem('booking_id');
    const carImage = localStorage.getItem('booked_car_image');
    const userPhone = localStorage.getItem('booking_phone');

    // Tampilkan ID booking
    const bookingIdInput = document.querySelector('input[readonly]');
    if (bookingIdInput) {
        bookingIdInput.value = bookingId || 'ID tidak ditemukan';
    }

    // Tampilkan error jika tidak ada booking ID
    if (!bookingId) {
        const contentArea = document.querySelector('.bg-white.rounded-2xl.p-6') || 
                            document.querySelector('main') || 
                            document.body;
        
        contentArea.innerHTML = `
            <h1 class="text-2xl font-bold text-red-500">Terjadi Kesalahan</h1>
            <p class="mt-4">ID booking tidak ditemukan.</p>
            <a href="index.html" class="mt-8 block bg-blue-600 text-white py-3 px-6 rounded-lg text-center">
                Kembali ke Beranda
            </a>
        `;
        return;
    }

    // Tampilkan gambar mobil
    const carImageElement = document.querySelector('img[alt="Toyota Avanza"]') || 
                           document.querySelector('main img');
                           
    if (carImageElement && carImage) {
        carImageElement.src = carImage;
    }

    // Update link ke halaman listing
    const checkBookingLink = document.querySelector('a[href="listing-car.html"]');
    if (checkBookingLink && userPhone) {
        checkBookingLink.href = `listing-car.html?phone=${encodeURIComponent(userPhone)}&booking_id=${encodeURIComponent(bookingId)}`;
    }
}

// Event listener
document.addEventListener('DOMContentLoaded', displayBookingSuccessInfo);