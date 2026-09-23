// 1. Function
// function calculateChange(receivedAmount, totalPrice){
//     let changeAmount = receivedAmount - totalPrice
//     return changeAmount
// }

// let userChanges = calculateChange(15000, 5000)
// console.log(userChanges);

// const calculateAmount = (uangDiterima, totalHarga) => {
//     let perubahanUang = uangDiterima - totalHarga
//     return perubahanUang
// }

// let budi = calculateAmount(100, 20)
// console.log(budi)

// Function - Use Case Calculate Tax
// let totalPrice = 0;
// let tax = 0;

// const calculateTax = (totalPrice, tax) => {
//     let totalWithTax = totalPrice + tax
//     return totalWithTax
// }

// let payment = calculateTax(totalPrice = 15000, tax = 2500)
// console.log(`1. Total Harga : Rp ${totalPrice} \n2. Pajak PPN : Rp ${tax} \n3. Total : ${payment}`)

// const checkStock = (stock) => {
//     if(stock > 0) {
//         return "Barang tersedia"
//     }
//     return "Brang tidak tersedia!"
// }

// let result = checkStock(10);
// console.log(result)

// const checkLate = (employeeName, checkInHour) => {
//   try {
//     const officeHours = 8;

//     if (checkInHour > officeHour) {
//       let lateHour = checkInHour - officeHour;
//       return `${employeeName} terlambat ${lateHour} jam`;
//     } else if (checkInHour < officeHour) {
//       let lateHour = officeHour - checkInHour;
//       return `${employeeName} lebih awal ${lateHour} jam`;
//     }

//     return `${employeeName} Tepat waktu, jam : ${officeHour}`;
//   } catch (error) {
//     return error;
//   }
// }

// let employee = checkLate("Budi", 7);
// console.log(employee);

// // 2. Error Runtime vs Error Logic
// let itemPrice = 15000
// let qty = 2;

// // Error Runtime
// try {
//     let total = itemPrice + qty
// } catch (error) {
//     console.log(`[Runtime Error Detected]: ${error}`)
// }

// Error Logic
// let discountValue = 5000
// let wrongTotal = itemPrice * (qty - discountValue);

// console.log(`[Logic Error]: Total belanja di struk jadi minus Rp${wrongTotal}`)