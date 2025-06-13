// Menampilkan informasi pemesanan pada halaman sukses
function displayBookingSuccessInfo() {
    const bookingId = localStorage.getItem('booking_id');
    const carImage = localStorage.getItem('booked_car_image');

    // Tampilkan ID booking
    const bookingIdInput = document.querySelector('input[readonly]');
    if (bookingIdInput) {
        bookingIdInput.value = bookingId || 'ID tidak ditemukan';
    }

    if (!bookingId) {
        const contentArea = document.querySelector('.bg-white.rounded-2xl.p-6') || 
                            document.querySelector('main') ||
                            document.body;
        
        contentArea.innerHTML = `
            <h1 class="text-2xl md:text-3xl font-bold text-red-500">Terjadi Kesalahan</h1>
            <p class="mt-4">ID booking tidak ditemukan. Silakan coba lagi.</p>
            <div class="mt-8">
                <a href="index.html" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-center font-medium">
                    Kembali ke Beranda
                </a>
            </div>
        `;
        return;
    }

    // Tampilkan gambar mobil yang dibooking
    const carImageElement = document.querySelector('img[alt="Toyota Avanza"]') || 
                           document.querySelector('main img') ||
                           document.querySelector('img');
                           
    if (carImageElement && carImage) {
        carImageElement.src = carImage;
    }

    const checkBookingLink = document.querySelector('a[href="listing-car.html"]');
    
    if (checkBookingLink) {
        const userPhone = localStorage.getItem('booking_phone');
        
        if (userPhone && bookingId) {
            checkBookingLink.href = `listing-car.html?phone=${encodeURIComponent(userPhone)}&booking_id=${encodeURIComponent(bookingId)}`;
        } else if (userPhone) {
            checkBookingLink.href = `listing-car.html?phone=${encodeURIComponent(userPhone)}`;
        }
    }
}

// Event listener
document.addEventListener('DOMContentLoaded', displayBookingSuccessInfo);