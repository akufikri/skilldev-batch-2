// 1. conditional
// let totalPurchase = 3500;
// let discount = 0;
// let bonus = "";

// kondisi 1
if (totalPurchase == 3000) {
    discount = 2000;
    console.log(`Selamat! Anda mendapatkan diskon sebesar : ${discount}`);
} 
// kondisi 2
else if(totalPurchase >= 4500) {
    discount = 3000;
    bonus = "Cangkir estetik!"
    console.log(`Selamat! Anda mendapatkan diskon sebesar : ${discount} \n dan bonus ${bonus}`);
} 
// kondisi 3
else if(totalPurchase != 3500){
    discount = 1000
    console.log(`Selamat! Anda mendapatkan diskon sebesar : ${discount}`);
}
// kondisi 4
else {
    discount = 0;
    console.log('Total belanja anda belum memenuhi 6000, tidak dapat diskon');
}


// USE CASE AKUN USER 
const userData = {
    "data" : {
        "name" : "budi",
        "address" : "batam",
        "no_phone" : 62812345678,
        "status" : false
    }
}

let messageResponse = ""

if (userData['data']['status'] == false) {
    messageResponse = "Maaf akun anda tidak aktif!"
   console.log(messageResponse)
}else{
    messageResponse = "Selamat akun anda sudah aktif!"
    console.log(messageResponse)
}

const paymentMethod = "CASH";

switch (paymentMethod){
    case "CASH":
        console.log("Buka laci uang tunai otomatis.");
        break;
    case "QRIS":
        console.log("Tampilkan kode QR di layar kasir.");
        break;
    default:
        console.log("Metode pembayaran tidak dikenal!");
}

// 2. Loop (Perulangan)

// for loop
for (let index = 1; index < 101; index++) {
    console.log("Mencetak struk untuk item nomor ke-" + index);
}

// Use case loop - Nomor Antrean :
for (let nomor = 1; nomor <= 100; nomor++) {
   console.log("Nomor antrean: " + nomor);
}

// While loop
let receiptPapers = 39;

while (receiptPapers > 0){
    console.log(`Mencetak struk transaksi... Sisa kertas: ${receiptPapers}`);
    receiptPapers--;
}

// Use case While loop - Mesing ATM

let cash = 5000000

while (cash > 0) {
    console.log(`ATM mengeluarkan Rp 100.000. Sisa uang: Rp ${cash}`);
    cash -= 100;
}