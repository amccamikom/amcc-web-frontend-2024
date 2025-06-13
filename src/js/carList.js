const createPopularCarCard = (car) => {
  const imageUrl = car.image ? car.image : "./assets/car1.png";

  return `
  <div class="justify-center py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="bg-black rounded-xl shadow-xl p-4">
  
    <!-- Popular Badge -->
    <div class="absolute top-6 left-6 bg-yellow-400 text-black font-medium px-4 py-1 rounded-full text-sm">
      Popular
    </div>
    
    <!-- Car Image -->
    <div class="mb-4">
      <img src="${imageUrl}" alt="${
    car.name
  }" class="w-full h-32 object-contain rounded-lg">
    </div>
    
    <!-- Car Details -->
    <div class="space-y-2">
      <h3 class="font-semibold text-blue-600 text-sm hover:underline cursor-pointer">${
        car.name
      } <span class="text-gray-500">(${car.color || "Black"})</span></h3>
      <p class="font-bold text-gray-900">Rp ${car.price.toLocaleString(
        "id-ID"
      )} <span class="text-gray-500 text-sm font-normal">/day</span></p>
      
      <!-- Location and Rating -->
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
      
      <!-- View Details Button -->
      <div class="pt-2">
        <a href="detail.html?id=${
          car.id
        }" class="text-white px-4 py-1 text-xs bg-blue-600 rounded-full">View Details</a>
      </div>
    </div>
  </div>
  </div>
  `;
};

const createAvailableCarCard = (car) => {
  const imageUrl = car.image ? car.image : "./assets/car1.png";

  return `
   <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 mb-3 justify-between">
    <div class="flex items-start gap-4">
      <!-- Rating Badge -->
      <div class="relative">
        <div class="absolute -top-2 -left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full ">
          ${car.rating || "4.5"}/5
        </div>
        <!-- Car Image -->
        <div class="w-20 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
          <img src="${imageUrl}" alt="${
    car.name
  }" class="w-full h-full object-contain rounded-lg">
        </div>
      </div>
      
      <!-- Car Details -->
      <div class="flex-1">
        <h3 class="font-semibold text-blue-600 text-sm hover:underline cursor-pointer mb-1">
          ${car.name} <span class="text-gray-500">(${
    car.color || "Black"
  })</span>
        </h3>
        <p class="font-bold text-gray-900 mb-2">Rp ${car.price.toLocaleString(
          "id-ID"
        )} <span class="text-gray-500 text-sm font-normal">/day</span></p>
        
        <!-- Location -->
        <div class="flex items-center gap-1 text-gray-600 text-sm">
          <img src="./assets/location.svg" alt="location" class="w-4 h-4">
          <span>${car.location || "Jakarta"}</span>
        </div>
      </div>
      
      <!-- Rating and Action -->
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
async function loadPopularCars() {
  try {
    const data = await getData("/cars/popular");
    const popularContainer = document.querySelector(".popular-card-container");

    if (popularContainer) {
      popularContainer.innerHTML = `
        <div class="flex items-center justify-center py-8">
          <div class="text-gray-500 text-sm">Loading popular cars...</div>
        </div>
      `;

      console.log("Popular cars data:", data);

      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        popularContainer.innerHTML = "";
        data.data.forEach((car) => {
          popularContainer.innerHTML += createPopularCarCard(car);
        });
      } else if (data && Array.isArray(data) && data.length > 0) {
        popularContainer.innerHTML = "";
        data.forEach((car) => {
          popularContainer.innerHTML += createPopularCarCard(car);
        });
      } else {
        popularContainer.innerHTML = `
          <div class="text-center py-8">
            <p class="text-gray-500 text-sm">Tidak ada mobil populer saat ini</p>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Failed to load popular cars:", error);
    const popularContainer = document.querySelector(".popular-card-container");
    if (popularContainer) {
      popularContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-red-500 text-sm">Gagal memuat data mobil populer</p>
        </div>
      `;
    }
  }
}

// Load semua mobil yang tersedia
async function loadAvailableCars() {
  try {
    const data = await getData("/cars/popular?limit=10");
    const availableContainer = document.querySelector(
      ".available-card-container"
    );

    if (availableContainer) {
      availableContainer.innerHTML = `
        <div class="flex items-center justify-center py-8">
          <div class="text-gray-500 text-sm">Loading available cars...</div>
        </div>
      `;

      console.log("Available cars data:", data);

      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        availableContainer.innerHTML = "";
        data.data.forEach((car) => {
          availableContainer.innerHTML += createAvailableCarCard(car);
        });
      } else if (data && Array.isArray(data) && data.length > 0) {
        availableContainer.innerHTML = "";
        data.forEach((car) => {
          availableContainer.innerHTML += createAvailableCarCard(car);
        });
      } else {
        availableContainer.innerHTML = `
          <div class="text-center py-8">
            <p class="text-gray-500 text-sm">Tidak ada mobil tersedia saat ini</p>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Failed to load available cars:", error);
    const availableContainer = document.querySelector(
      ".available-card-container"
    );
    if (availableContainer) {
      availableContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-red-500 text-sm">Gagal memuat data mobil tersedia</p>
        </div>
      `;
    }
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  console.log("Document loaded, initializing car listings");

  // Load mobil populer dan tersedia saat halaman dimuat
  loadPopularCars();
  loadAvailableCars();

  // Mencari tombol pencarian dengan berbagai kemungkinan selector
  const searchButton =
    document.querySelector("button.bg-green-500") ||
    document.querySelector("button.bg-blue-600") ||
    document.querySelector("#search-cars-button") ||
    document.querySelector("button[type='submit']") ||
    document.querySelector("button:contains('Search')") ||
    document.querySelector("button:contains('Cari')");

  if (searchButton) {
    console.log("Search button found:", searchButton);
    searchButton.classList.add(
      "hover:cursor-pointer",
      "transition-all",
      "duration-300",
      "hover:scale-105"
    );
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Search button clicked");
      searchCars();
    });
  } else {
    console.log("Search button not found, trying alternative approach");

    // Alternatif: tambahkan event listener ke semua button
    document.querySelectorAll("button").forEach((button) => {
      console.log("Found button:", button);
      button.classList.add("hover:cursor-pointer");
      button.addEventListener("click", function (e) {
        // Periksa apakah ini mungkin tombol pencarian
        const buttonText = button.textContent.trim().toLowerCase();
        if (buttonText.includes("search") || buttonText.includes("cari")) {
          e.preventDefault();
          console.log("Potential search button clicked:", button);
          searchCars();
        }
      });
    });
  }

  // Event listener untuk input lokasi - tombol Enter
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

async function searchCars() {
  try {
    const locationInput =
      document.querySelector('input[placeholder="Add Your Location"]') ||
      document.querySelector('input[placeholder="Search by location"]') ||
      document.querySelector('input[type="text"]');

    console.log("Location input element:", locationInput);

    if (!locationInput || !locationInput.value.trim()) {
      alert("Mohon masukkan lokasi pencarian");
      return;
    }

    const location = locationInput.value.trim().toLowerCase();
    console.log("Searching for location:", location);

    // Tampilkan loading state
    const availableContainer = document.querySelector(
      ".available-card-container"
    );
    if (availableContainer) {
      availableContainer.innerHTML = `
        <div class="flex items-center justify-center py-8">
          <div class="text-gray-500 text-sm">Searching cars in ${locationInput.value}...</div>
        </div>
      `;
    }

    // Mendapatkan semua mobil dari endpoint
    const data = await getData("/cars/popular?limit=50");

    console.log("Search data received:", data);

    if (availableContainer) {
      if (data && data.data && Array.isArray(data.data)) {
        // Filter mobil berdasarkan lokasi
        const filteredCars = data.data.filter((car) => {
          if (!car || !car.location) return false;
          return car.location.toLowerCase().includes(location);
        });

        console.log("Filtered cars by location:", filteredCars);

        availableContainer.innerHTML = "";

        if (filteredCars.length > 0) {
          filteredCars.forEach((car) => {
            availableContainer.innerHTML += createAvailableCarCard(car);
          });
        } else {
          availableContainer.innerHTML = `
            <div class="text-center py-8">
              <p class="text-gray-500 text-sm">Tidak ada mobil yang tersedia di lokasi "${locationInput.value}"</p>
            </div>
          `;
        }
      } else {
        availableContainer.innerHTML = `
          <div class="text-center py-8">
            <p class="text-gray-500 text-sm">Tidak ada data mobil yang tersedia</p>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Failed to search cars:", error);
    const availableContainer = document.querySelector(
      ".available-card-container"
    );
    if (availableContainer) {
      availableContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-red-500 text-sm">Gagal melakukan pencarian</p>
        </div>
      `;
    }
  }
}
