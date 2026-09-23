// // 1. Function Mastery (Declaration, Expression, Arrow Type)

// // a. Function Declaration
// function caclucateTotal([price, qty])
// {
//     return price * qty;
// }

// // b. Function Expression
// const calculateTotalExpression = function(price, qty)
// {
//     return price * qty;
// }

// // c. Function Arrow
// const calculateArrow = (price, qty) => { return price * qty; }


// 2. Scope & Closure

// a. Scope
// function calculateTotal(price, qty)
// {
//     let tax = 0.11
//     return price * qty
// }

// console.log(tax)

// b. Closure
function createInvoiceCounter()
{
    let currentNumber = 0 // Variabel terproteksi
    return function()
    {
        currentNumber++;
        return "INV-2026-" + currentNumber;
    }
}

const generateInvoiceId = createInvoiceCounter();

console.log(generateInvoiceId()); // Output: INV-2026-1
console.log(generateInvoiceId()); // Output: INV-2026-2


// 3. Callback Function
// Fungsi utama yang bertugas memproses pembayaran
const processPayment = (totalAmount, callback) => {
    console.log("Connecting to Payment Gateway for amount: Rp " + totalAmount);
    // Jalankan fungsi titipan setelah proses selesai
    callback();
};

// Fungsi callback yang dititipkan
const printReceipt = () => console.log("Payment Success! Printing receipts...");

// Eksekusi
processPayment(50000, printReceipt);