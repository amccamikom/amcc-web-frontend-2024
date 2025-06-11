document.addEventListener("DOMContentLoaded", () => {
    const popularCardContainer = document.querySelector(
        ".popular-card-container"
    );
    const availableCardContainer = document.querySelector(
        ".available-card-container"
    );
    const btnSort = document.querySelector("#filter-btn");

    let sortAscending = true;

    function renderPopularCar() {
        const cards = popularCar.map((car) => {
            return `
        <div class="card">
            <div class="relative">
                <img src="${car.image}" alt="${car.name}" class="w-full" />
                <p class="absolute top-2 left-2 bg-yellow-400 text-black text-sm md:font-medium px-5 md:px-8 py-1 rounded-full">Popular
                </p>
            </div>

            <div class="p-4">
                <h2 class="text-blue-600 text-xl font-bold">${car.name} <span
                        class="text-blue-600 font-medium text-sm">(${
                            car.color
                        })</span></h2>
                <p class="font-semibold mt-1">${car.price.toLocaleString(
                    "id-ID",
                    {
                        style: "currency",
                        currency: "IDR",
                    }
                )} <span class="text-gray-500 font-normal">/day</span></p>
            </div>

            <div class="border-t-2 border-blue-600 my-2"></div>

            <div class="flex justify-between items-center p-4">
                <div class="flex items-center gap-2">
                    <img src="assets/speed.svg" alt="Speed" class="w-6 h-6" />
                    <p class="text-gray-700">${car.speed}</p>
                </div>

                <div class="flex items-center gap-2">
                    <p class="text-gray-700">${car.seats}</p>
                    <img src="assets/seat.svg" alt="Seats" class="w-6 h-6" />
                </div>
            </div>
        </div>
    `;
        });

        popularCardContainer.innerHTML = cards.join("");
    }

    function renderAvailableCar() {
        // ini untuk sorting dulu sebelum di render
        const sortedAvailableCar = availableCar.sort((a, b) => {
            return sortAscending ? a.price - b.price : b.price - a.price;
        });

        const availableCard = sortedAvailableCar.map((car) => {
            return `
        <div class="bg-white rounded-xl shadow p-4 flex items-center">
            <div class="relative w-32 h-24">
                <div
                    class="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-medium px-2 py-1 rounded-tl-xl rounded-br-xl flex items-center gap-1">
                    ${car.rating}
                    <img src="./assets/star.svg" alt="" class="w-3 h-3">
                </div>
                <img src="${car.image}" alt="${
                car.name
            }" class="w-full h-full object-contain" />
            </div>

            <div class="ml-4 flex-grow">
                <h2 class="text-blue-600 font-bold">${car.name} <span
                        class="text-gray-500 font-normal text-sm">(${
                            car.color
                        })</span></h2>
                <p class="font-semibold">${car.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                })}<span class="text-gray-500 font-normal text-sm">/day</span></p>

                <div class="flex justify-between items-center mt-2">
                    <div class="flex items-center gap-1">
                        <img src="./assets/location.svg" alt="" class="w-6 h-6">
                        <span class="text-sm">${car.location}</span>
                    </div>

                    <div class="flex items-center gap-1">
                        <span class="text-sm font-medium">${car.seats}</span>
                        <img src="./assets/seat.svg" alt="" class="w-6 h-6">
                    </div>
                </div>
            </div>
        </div>`;
        });

        availableCardContainer.innerHTML = availableCard.join("");
    }

    renderAvailableCar();
    renderPopularCar();

    // event listener untuk tombol sort
    if (btnSort) {
        btnSort.addEventListener("click", () => {
            sortAscending = !sortAscending;
            renderAvailableCar();
        });
    }
});
