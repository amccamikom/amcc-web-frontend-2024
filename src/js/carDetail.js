// Mendapatkan ID mobil dari URL
function getCarIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Menampilkan detail mobil
async function displayCarDetails() {
  const carId = getCarIdFromUrl();
  
  if (!carId) {
    window.location.href = 'index.html';
    return;
  }
  
  try {
    const data = await postData('/cars', { id: parseInt(carId) });
    
    if (!data || !data.data) {
      throw new Error('Invalid response structure');
    }
    
    const car = data.data;
    
    // Mengisi detail mobil
    const carImage = document.querySelector('section img[alt="Toyota Avanza"]');
    if (carImage) carImage.src = car.image || './assets/car1.png';
    
    const carNameElement = document.querySelector('.text-2xl.md\\:text-5xl.text-blue-500');
    if (carNameElement) {
      carNameElement.textContent = `${car.name} `;
      
      const colorSpan = carNameElement.querySelector('span') || document.createElement('span');
      colorSpan.textContent = `(${car.color || 'Black'})`;
      colorSpan.className = 'text-xl md:text-2xl font-semibold';
      
      if (!carNameElement.contains(colorSpan)) {
        carNameElement.appendChild(colorSpan);
      }
    }
    
    // Mengisi fitur mobil
    const features = document.querySelectorAll('.grid.grid-cols-3 p');
    if (features.length >= 3) {
      features[0].textContent = `${car.engine || 1500}cc`;
      features[1].textContent = `Max ${car.seats || car.capacity || 4}`;
      features[2].textContent = `${car.speed || 200} kmh`;
    }
    
    // Mengisi harga mobil
    document.querySelectorAll('.text-xl.lg\\:text-2xl.font-bold.text-white, .text-lg.font-bold.text-white').forEach(el => {
      el.textContent = `Rp ${car.price.toLocaleString('id-ID')}`;
    });
    
    // Mengisi deskripsi mobil
    const descElement = document.querySelector('.text-sm.text-justify.mt-3');
    if (descElement) {
      descElement.textContent = car.description || 'Mobil ini menawarkan kenyamanan berkendara dengan mesin yang handal dan ruang yang lega untuk seluruh keluarga. Ideal untuk perjalanan dalam kota maupun luar kota dengan konsumsi bahan bakar yang efisien.';
    }
    
    // Mengisi galeri mobil
    const galleryContainer = document.querySelector('.flex.items-center.gap-3.overflow-x-auto');
    if (galleryContainer) {
      if (!car.gallery || car.gallery.length === 0) {
        galleryContainer.innerHTML = `
          <img src="./assets/gallery.png" alt="" class="h-20 md:h-auto">
          <img src="./assets/gallery.png" alt="" class="h-20 md:h-auto">
          <img src="./assets/gallery.png" alt="" class="h-20 md:h-auto">
        `;
      } else {
        galleryContainer.innerHTML = '';
        car.gallery.forEach(img => {
          galleryContainer.innerHTML += `<img src="${img}" alt="" class="h-20 md:h-auto">`;
        });
      }
    }
    
    // Link tombol "Book Now" ke halaman booking dengan ID mobil
    document.querySelectorAll('a[href="booking.html"]').forEach(link => {
      link.href = `booking.html?id=${car.id}`;
    });
    
    // Mengisi rating jika tersedia
    const ratingElement = document.querySelector('.flex.items-center.gap-1.px-3.py-1.bg-yellow-300.rounded-full.text-black p');
    if (ratingElement) {
      ratingElement.textContent = `${car.rating}/5`;
    }
    
  } catch (error) {
    alert('Gagal memuat detail mobil. Silakan coba lagi nanti.');
  }
}

// Event listener
document.addEventListener('DOMContentLoaded', displayCarDetails);