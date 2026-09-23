// Destructuring (Membongkar Kotak Data)

// let responseProduct = {
//     productId: "P-102",
//     productName: "Caramel Macchiato",
//     basePrice: 32000,
//     stockCount: 15
// }

// ❌ Cara Lama (Melelahkan & Berulang)
// const productName = responseProduct.productName;
// const basePrice = responseProduct.basePrice;

// Clean code Descructuring
// let { productName, basePrice, stockCount } = responseProduct;
// console.log(`Product Name : ${productName} \nBase Price : ${basePrice}`)

// productName = "Anggur";
// stockCount = 100
// console.log(productName, stockCount)
// // console.log(basePrice)

// Spread Operator (Fungsinya untuk menggabungkan data)
// const morningCaffe = ["Cappucino", "Mocca Latte"]
// const streetCaffe = ["Butterscott", "Exspresso"]

// const fullMenuCaffe = [...morningCaffe, ...streetCaffe, "Hezelnut Latte"];

// console.log(fullMenuCaffe)

// Rest Operator
// const sumOrderBill = (...allItemPrices) => {
//     return allItemPrices.reduce((total,price) => price + total, 0)
// }

// console.log(sumOrderBill(20000, 15000, 30000, 15000))

// Cara menggunakan mutation yang benar
// const activeCart = { item: "Expresso", qty: 10 }

// const updateCart = {...activeCart, qty: 5}

// console.log(updateCart);


// 1. Simulasi module system
const calculateDiscount = (totalBill, discountRate) => totalBill * discountRate

// 2. data awal (databse produk)
const responseProduct = {
    id: "PROD-99",
    title : "Ice Avocado Coffee",
    price: 28000,
    sku: "AVO-COF-01"
}

// 3 Proses utama di meja kasir
const runAddvCashierSystem = () => {
    console.log("--- Executing Modern Cashier System ---");

    // A. IMPLEMENTASI DESCTRUCTURING
    const { title, price} = responseProduct;
    console.log(`Cashier scanned: ${title} worth Rp ${price}`)

    // B. INITIAL STATE 
    const initCart = [
        { productName: "Butter Scott", price: 25000, qty:1 },
        { productName: "Expresso", price: 20000, qty:2 },
    ]

    // C. IMMUTABLE & SPREAD OPERATOR
    const newScannedItem = { productName: title, price: price, qty: 1 } 
    const updateCart = [...initCart, newScannedItem];

    // D. IMPLEMENTASI IMMUTABILITY 
    const finnalCart = updateCart.map(item => {
        if (item.productName == "Hot Americano") {
            return {...item, qty: 3}
        }
        return item
    });

    // E. IMPLEMENTAS REST OPERATOR & ITERATION
    console.log("\n----- Finnal Shopping Cart Review -----")
    let rawTotalBill = 0;
    finnalCart.forEach(item => {
        console.log(`- ${item.qty}x ${item.productName} (@Rp ${item.price})`)
        rawTotalBill += (item.price * item.qty)
    })

    // F. simulasi hitungan potongan via promo
    const promoCut = calculateDiscount(rawTotalBill, 0.1)
    const finnalAmountToPay = rawTotalBill - promoCut

    console.log("----------------------------------");
    console.log(`Raw Total    : Rp ${rawTotalBill}`);
    console.log(`Promo Diskon : Rp ${promoCut}`);
    console.log(`👉 FINAL TOTAL PAY: Rp ${finnalAmountToPay}`);
}

runAddvCashierSystem();