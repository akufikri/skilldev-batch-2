// Iterasi Data (forEach, Map, Filter)

// 1. forEach (foreach adalah fungsi untuk menampilkan list array yang sudah di format)
// const currentOrder = [
//     "Expresso", 
//     "Caffe Latte", 
//     "Teh Tarik", 
//     "Nasi Goreng"
// ];

// currentOrder.forEach(function(item){
//     console.log("Customer Ordered: ", item)
// })


// 2. Map (map adalah fungsi untuk menampilkan list array dengan bawaan format array original)
// const rawPrices = [20000, 15000, 30000];

// const formattedPrices = rawPrices.map(function(price){
//     return "Rp " + price
// })

// console.log(formattedPrices)


// 3. Filter
// const itemPrices = [15000, 40000, 20000, 35000, 25000];

// const cheapItems = itemPrices.filter(function(price) {
//     let calculate = price > 25000
//     return calculate
// })

// console.log(cheapItems)

// Gabungan nyata di industri : Array of Objects
// const shoppingCart = [
//     { name: "Americano", price: 20000, qty: 2 },
//     { name: "Choco Croissant", price: 18000, qty: 1 },
//     { name: "Ice Matcha", price: 25000, qty: 1 }
// ];

// let totalPayment = 0
// shoppingCart.forEach(function(product){
//     totalPayment += product.price * product.qty
//     return totalPayment
// })
// console.log(`Total Bill: Rp ${totalPayment}`)

// const baseUrl = "https://openlibrary.org/search.json?q=javascript"

// fetch(baseUrl)
//     .then(response => response.json())
//     .then(function(data){
//         console.log(data.docs[5])
//     });