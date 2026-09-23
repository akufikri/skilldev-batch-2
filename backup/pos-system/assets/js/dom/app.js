// 1. Interaksi antar elemen

// Mengambil elemen teks total bayar berdasarkan ID-nya
const totalBillElement = document.querySelector("#total-bill-text")

// Mengambil elemen tombol bayar berdasarkan Class-nya
const checkoutButton = document.querySelector(".btn-checkout");

// 2. Event (Click, dan Submit)

// Beritahu komputer: "Tolong intip tombol checkout ini..."
checkoutButton.addEventListener("click", function() {
    console.log("Checkout button was clicked by the cashier!")
});

// Event submit
const paymentForm = document.querySelector("#payment-form");

paymentForm.addEventListener("submit", function(event){
    event.preventDefault(); // untuk mencegah form langsung mengirimkan data
    console.log("Form submitted, processing transaction...")
});

// 3. Update text sederhana (textContent)

// a. Cari elemen-elemen yang dibutuhkan di layar
const addCoffeeButton = document.querySelector("#btn-add-coffee")
const totalBillElement = document.querySelector("#total-bill-text");

// b. Siapkan data logikanya (Variabel dengan nama bahasa Inggris)
let currentTotalPayment = 0
const coffeePrice = 20000

// c. Pasang sensor klik pada tombol "Tambah Kopi"
addCoffeeButton.addEventListener("click", function(){
     // Jalankan logika matematika (Problem Solving)
     currentTotalPayment = currentTotalPayment + coffeePrice;

     // Ubah tampilan teks di layar kasir secara instan!
     totalBillElement.textContent = "Rp " + currentTotalPayment
})