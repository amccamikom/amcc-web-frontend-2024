// Menampilkan detail mobil
async function displayCarDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');
  
  if (!carId) {
    window.location.href = 'index.html';
    return;
  }
  
  try {
    const data = await postData('/cars', { id: parseInt(carId) });
    const car = data.data;
    
    if (!car) {
      throw new Error('Car not found');
    }
    
    // Update car image
    const carImage = document.querySelector('section img[alt="Toyota Avanza"]');
    if (carImage) carImage.src = car.image || './assets/car1.png';
    
    // Update car name and color
    const nameElement = document.querySelector('.text-2xl.md\\:text-5xl.text-blue-500');
    if (nameElement) {
      nameElement.textContent = `${car.name} `;
      
      const colorSpan = nameElement.querySelector('span') || document.createElement('span');
      colorSpan.textContent = `(${car.color || 'Black'})`;
      colorSpan.className = 'text-xl md:text-2xl font-semibold';
      
      if (!nameElement.contains(colorSpan)) {
        nameElement.appendChild(colorSpan);
      }
    }
    
    // Update car features
    const features = document.querySelectorAll('.grid.grid-cols-3 p');
    if (features.length >= 3) {
      features[0].textContent = `${car.engine || 1500}cc`;
      features[1].textContent = `Max ${car.seats || car.capacity || 4}`;
      features[2].textContent = `${car.speed || 200} kmh`;
    }
    
    // Update car price
    document.querySelectorAll('.text-xl.lg\\:text-2xl.font-bold.text-white, .text-lg.font-bold.text-white')
      .forEach(el => el.textContent = `Rp ${car.price.toLocaleString('id-ID')}`);
    
    // Update car description
    const descElement = document.querySelector('.text-sm.text-justify.mt-3');
    if (descElement) {
      descElement.textContent = car.description || 'Mobil ini menawarkan kenyamanan berkendara dengan mesin yang handal.';
    }
    
    // Update car gallery
    const galleryContainer = document.querySelector('.flex.items-center.gap-3.overflow-x-auto');
    if (galleryContainer) {
      galleryContainer.innerHTML = '';
      
      if (!car.gallery || car.gallery.length === 0) {
        for (let i = 0; i < 3; i++) {
          galleryContainer.innerHTML += `<img src="./assets/gallery.png" alt="" class="h-20 md:h-auto">`;
        }
      } else {
        car.gallery.forEach(img => {
          galleryContainer.innerHTML += `<img src="${img}" alt="" class="h-20 md:h-auto">`;
        });
      }
    }
    
    // Update booking links
    document.querySelectorAll('a[href="booking.html"]')
      .forEach(link => link.href = `booking.html?id=${car.id}`);
    
    // Update rating
    const ratingElement = document.querySelector('.flex.items-center.gap-1.px-3.py-1.bg-yellow-300.rounded-full.text-black p');
    if (ratingElement) ratingElement.textContent = `${car.rating}/5`;
    
  } catch (error) {
    alert('Gagal memuat detail mobil');
  }
}

// Event listener
document.addEventListener('DOMContentLoaded', displayCarDetails);