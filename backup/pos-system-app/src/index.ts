// TYPE DATA
// const cashierName: string = "John Doe";
// const isStoreOpen: boolean = true;
// const stock: number = 20;
// const transactionDate: Date = new Date();

// console.log(`
//     Cashier: ${cashierName}, 
//     Store Open: ${isStoreOpen}, 
//     Stock: ${stock}, 
//     Transaction Date: ${transactionDate},
//     isStoreOpen: ${isStoreOpen ? "Yes" : "No"}
//     transactionDate: ${transactionDate.toLocaleDateString()}`);

// TYPE DATA ARRAY
// const coffeMenu: string[] = ["Luwak White Coffee", "Espresso", "Cappuccino"];
// const itemsPrices: Array<number> = [10000, 15000, 20000];

// console.log(`
//     Coffee Menu: ${coffeMenu.join(", ")}, 
//     Items Prices: ${itemsPrices.join(", ")}
// `);

// TYPE ENUM
// enum PaymentMethod {
//     CASH = "Cash",
//     QRIS = "QRIS",
//     DEBIT_CARD = "Debit Card",
// }

// let selectedPaymentMethod: PaymentMethod = PaymentMethod.QRIS;

// console.log(`Selected Payment Method: ${selectedPaymentMethod}`);

// TYPE FUNCTION
// const calculateTotalWithTax = (price:number, taxRate:number): number => {
//     return price + (price * taxRate);
// }

// const finnalPrice = calculateTotalWithTax(10000, 0.1);
// console.log(`Final Price with Tax: ${finnalPrice}`);


// Sistem Validasi Transaksi POS (TypeScript)
// 1. DEFINISI ENUM & TYPE ALIAS (ARSITEKTUR DATA)
enum transactionStatus {
    PENDING = "Pending",
    PAID = "Paid",
    FAILED = "Failed",
}

// Menggunaakn type alias untuk mengunci struktur detail item belanja
type cartItem = {
    productName: string;
    price: number;
    qty: number;
}

// Menggunakan Type alias untuk struktur data nota transaksi utuh
type Invoice = {
    readonly invoiceId: string; // readonly untuk mencegah perubahan setelah dibuat
    customerName: string;
    items: cartItem[];
    totalPayment: number;
    status: transactionStatus;
}

// 2. LOGIKA UTAMA FUNGSI (Function Typing)
// FUNGSI A. MENGHITUNG TOTAL BELANJA DARI ARRAY OBJECT KERANJANG
const calculateCartTotal = (cart: cartItem[]): number => {
    return cart.reduce((total,item) => total + (item.price * item.qty), 0);
}

const createInvoice = (customerName: string, selectedItems: cartItem[]): Invoice => {
    const calculatedTotal = calculateCartTotal(selectedItems);

    // Mengembalikan object yang strukturnya wajib sama persis dengan tipe 'INVOICE'
    return {
        invoiceId: `INV-${Math.floor(1000 + Math.random() * 9000)}`, // ID unik sederhana
        customerName: customerName,
        items: selectedItems,
        totalPayment: calculatedTotal,
        status: transactionStatus.PENDING, // default status awal
    }
}

// 3. EKSEKUSI DI MEJA KASIH
// A. Membuat isi keranjang belanja (Wajib mematuhi struktur dari cartItem)
const cart: cartItem[] = [
    { productName: "Luwak White Coffee", price: 10000, qty: 2 },
    { productName: "Espresso", price: 15000, qty: 1 },
    { productName: "Cappuccino", price: 20000, qty: 1 }
];

const newTx: Invoice = createInvoice("John Doe", cart);
// newTx.status = "INV-HACKED";

console.log(`--- Invoice Created Securely ---`);
console.log(`Invoice ID : ${newTx.invoiceId}`);
console.log(`Customer   : ${newTx.customerName}`);
console.log(`Total Bill : Rp ${newTx.totalPayment}`);
console.log(`Status     : ${newTx.status}`);