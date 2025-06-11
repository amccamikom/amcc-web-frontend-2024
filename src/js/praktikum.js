// Praktikum JavaScript Pertemuan 8
// Topik: Higher Order Function & JSON

// 1. Fungsi sebagai Nilai
const sayHello = function() {
    console.log("Halo dari Zeta");
};
sayHello(); // Output: Halo dari Zeta

// 2. Fungsi sebagai Argumen
function ucapanSelamat(nama) {
    console.log(`Selamat datang, ${nama}`);
}

function prosesUser(callback) {
    const nama = "Zeta";
    callback(nama);
}

prosesUser(ucapanSelamat); // Output: Selamat datang, Zeta

// 3. Fungsi sebagai Return Value
function salam(nama) {
    return function() {
        console.log(`Halo, ${nama}! Jangan lupa istirahat~`);
    };
}

const haloZeta = salam("Zeta");
haloZeta(); // Output: Halo, Zeta! Jangan lupa istirahat~

// 4. Higher Order Function Methods

// map()
const angkaAwal = [1, 2, 3, 4, 5];
const angkaDikaliDua = angkaAwal.map(function(angka) {
    return angka * 2;
});
console.log("map():", angkaDikaliDua);

// filter()
const numbers = [10, 25, 30, 45, 50];
const angkaGede = numbers.filter(function(num) {
    return num > 30;
});
console.log("filter():", angkaGede);

// forEach()
const buahBuahan = ["Apel", "Mangga", "Jeruk"];
buahBuahan.forEach(function(buah, index) {
    console.log(`forEach(): Buah ke-${index + 1}: ${buah}`);
});

// reduce()
const angka = [1, 2, 3, 4, 5];
const total = angka.reduce(function(acc, curr) {
    return acc + curr;
}, 0);
console.log("reduce():", total);

// find()
const cariAngka = angka.find(function(num) {
    return num > 3;
});
console.log("find():", cariAngka);

// sort()
const acak = [5, 1, 4, 2, 3];
acak.sort((a, b) => a - b);
console.log("sort():", acak);

// 5. JSON (JavaScript Object Notation)
// Struktur JSON dari variabel
const jsonData = {
    "nama": "Zeta",
    "umur": 21,
    "hobi": ["ngoding", "nonton anime"]
};
console.log("JSON dari variabel:", jsonData);

// 6. Parsing JSON String ke Object
const jsonString = '{"nama": "Zeta", "umur": 21}';
const obj = JSON.parse(jsonString);
console.log("Hasil parse:", obj);

// 7. Mengubah Object ke JSON String
const newJson = JSON.stringify(jsonData);
console.log("JSON Stringify:", newJson);

// 8. Implementasi HOF dalam Manipulasi DOM (contoh sederhana)
document.addEventListener("DOMContentLoaded", function() {
    const data = ["Sakura", "Hinata", "Zeta"];
    const list = document.getElementById("char-list");

    data.forEach(function(nama) {
        const li = document.createElement("li");
        li.textContent = nama;
        list.appendChild(li);
    });
});
