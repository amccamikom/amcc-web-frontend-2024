const createPopularCarCard = (car) => {
  const imageUrl = car.image ? car.image : "./assets/car1.png";

  return `
  <div class="bg-black rounded-xl shadow-xl p-4 relative">
    <div class="absolute top-6 left-6 bg-yellow-400 text-black font-medium px-4 py-1 rounded-full text-sm">
      Popular
    </div>
    
    <div class="mb-4">
      <img src="${imageUrl}" alt="${
    car.name
  }" class="w-full h-32 object-contain rounded-lg">
    </div>
    
    <div class="space-y-2">
      <h3 class="font-semibold text-blue-600 text-sm hover:underline cursor-pointer">${
        car.name
      } <span class="text-gray-500">(${car.color || "Black"})</span></h3>
      <p class="font-bold text-gray-900">Rp ${car.price.toLocaleString(
        "id-ID"
      )} <span class="text-gray-500 text-sm font-normal">/day</span></p>
      
      <div class="flex justify-between items-center pt-2">
        <div class="flex items-center gap-1 text-gray-600 text-sm">
          <img src="./assets/location.svg" alt="location" class="w-4 h-4">
          <span>${car.location || "Jakarta"}</span>
        </div>
        <div class="flex items-center gap-1">
          <img src="./assets/star.svg" alt="star" class="w-4 h-4">
          <span class="text-sm text-gray-600">${car.rating}</span>
        </div>
      </div>
      
      <div class="pt-2">
        <a href="detail.html?id=${
          car.id
        }" class="text-white px-4 py-1 text-xs bg-blue-600 rounded-full">View Details</a>
      </div>
    </div>
  </div>
  `;
};

const createAvailableCarCard = (car) => {
  const imageUrl = car.image ? car.image : "./assets/car1.png";

  return `
   <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 mb-3">
    <div class="flex items-start gap-4">
      <div class="relative">
        <div class="absolute -top-2 -left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
          ${car.rating || "4.5"}/5
        </div>
        <div class="w-20 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
          <img src="${imageUrl}" alt="${
    car.name
  }" class="w-full h-full object-contain rounded-lg">
        </div>
      </div>
      
      <div class="flex-1">
        <h3 class="font-semibold text-blue-600 text-sm hover:underline cursor-pointer mb-1">
          ${car.name} <span class="text-gray-500">(${
    car.color || "Black"
  })</span>
        </h3>
        <p class="font-bold text-gray-900 mb-2">Rp ${car.price.toLocaleString(
          "id-ID"
        )} <span class="text-gray-500 text-sm font-normal">/day</span></p>
        
        <div class="flex items-center gap-1 text-gray-600 text-sm">
          <img src="./assets/location.svg" alt="location" class="w-4 h-4">
          <span>${car.location || "Jakarta"}</span>
        </div>
      </div>
      
      <div class="flex flex-col justify-between gap-2">
        <a href="detail.html?id=${
          car.id
        }" class="text-white px-4 py-1 text-xs bg-blue-600 rounded-full">View Details</a>
      </div>
    </div>
  </div>
  `;
};

// Load mobil populer


// Load semua mobil yang tersedia


// Pencarian mobil
async function searchCars() {
  const locationInput =
    document.querySelector('input[placeholder="Add Your Location"]') ||
    document.querySelector('input[placeholder="Search by location"]') ||
    document.querySelector('input[type="text"]');

  if (!locationInput || !locationInput.value.trim()) {
    alert("Mohon masukkan lokasi pencarian");
    return;
  }

  const location = locationInput.value.trim().toLowerCase();
  const availableContainer = document.querySelector(
    ".available-card-container"
  );

  if (!availableContainer) return;

  availableContainer.innerHTML = `<div class="text-gray-500 text-sm text-center py-8">Searching cars in ${locationInput.value}...</div>`;

  try {
    const data = await getData("/cars/popular?limit=50");
    const carData = data.data && Array.isArray(data.data) ? data.data : [];

    // Filter mobil berdasarkan lokasi
    const filteredCars = carData.filter(
      (car) =>
        car && car.location && car.location.toLowerCase().includes(location)
    );

    if (filteredCars.length > 0) {
      availableContainer.innerHTML = "";
      filteredCars.forEach((car) => {
        availableContainer.innerHTML += createAvailableCarCard(car);
      });
    } else {
      availableContainer.innerHTML = `<p class="text-gray-500 text-sm text-center py-8">Tidak ada mobil di lokasi "${locationInput.value}"</p>`;
    }
  } catch (error) {
    availableContainer.innerHTML = `<p class="text-red-500 text-sm text-center py-8">Gagal melakukan pencarian</p>`;
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  loadPopularCars();
  loadAvailableCars();

  // Setup tombol pencarian
  const searchButton =
    document.querySelector("button.bg-green-500") ||
    document.querySelector("button.bg-blue-600") ||
    document.querySelector("#search-cars-button") ||
    document.querySelector("button[type='submit']");

  if (searchButton) {
    searchButton.classList.add(
      "hover:cursor-pointer",
      "hover:scale-105",
      "transition-all"
    );
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      searchCars();
    });
  }

  // Setup input lokasi - tombol Enter
  const locationInput =
    document.querySelector('input[placeholder="Add Your Location"]') ||
    document.querySelector('input[placeholder="Search by location"]');

  if (locationInput) {
    locationInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchCars();
      }
    });
  }
});
