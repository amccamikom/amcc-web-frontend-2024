// misal data json dapat dari API
const carsData = JSON.stringify({
    "popularCar": [
        {
            "name": "Toyota Avanza",
            "color": "Black",
            "price": 320000,
            "speed": "250 kmh",
            "seats": 8,
            "image": "assets/car.png"
        },
        {
            "name": "Honda Jazz",
            "color": "Red",
            "price": 350000,
            "speed": "240 kmh",
            "seats": 4,
            "image": "assets/car.png"
        },
        {
            "name": "Honda Jazz",
            "color": "Red",
            "price": 350000,
            "speed": "240 kmh",
            "seats": 4,
            "image": "assets/car.png"
        }
    ],
    "availableCar": [
        {
            "name": "Toyota Avanza",
            "color": "Black",
            "price": 400000,
            "location": "Yogyakarta",
            "seats": 8,
            "image": "assets/car.png",
            "rating": 3
        },
        {
            "name": "Honda Jazz",
            "color": "Red",
            "price": 350000,
            "location": "Bantul",
            "seats": 4,
            "image": "assets/car.png",
            "rating": 3
        },
        {
            "name": "Honda Brio",
            "color": "Red",
            "price": 320000,
            "location": "Bantul",
            "seats": 4,
            "image": "assets/car.png",
            "rating": 4
        }
    ]
})

// parsing dari json ke javascript object
console.log("Cars Data:", carsData);
const parsedCarsData = JSON.parse(carsData);
console.log("Parsed Cars Data:", parsedCarsData);

const popularCar =  parsedCarsData.popularCar;
const availableCar = parsedCarsData.availableCar;