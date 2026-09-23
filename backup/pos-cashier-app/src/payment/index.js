/**
 * 1. SIMULASI PROSES LATAR BELAKANG (Menggunakan Promise)
 * Fungsi untuk meminta konfirmasi ke server Bank partner.
 * Butuh waktu 2 detik untuk memeriksa apakah pelanggan sudah scan QRIS atau belum.
 */

const checkQrisPaymentStatus = (invoiceId, amount) => {
    return new Promise((resolve, reject) => {
        console.log(`[NETWORK] Checking bank status for ${invoiceId}....`);
        
        // Simulasi delay jaringan 2000ms (2detik)
        setTimeout(() => {
            // Logic bisnis: anggap pembayaran di bawah atau sama dengan Rp 500k selalu sukses
            // Jika di atas Rp 500k, otomatis akan di delaykan / gangguan (rejected)
            if (amount <= 500000) {
                const paymentResult = {
                    status: "SUCCESS",
                    bankResponseCode: "200",
                    transactionTime: new Date().toISOString()
                }
                resolve(paymentResult) //janji terpenuhi
            }else{
                reject(new Error("Network Timeout: Connection to Bank Server Failed."))
            } // janji gagal
        }, 2000);
    })
}

/**
 * 2. PROSES UTAMA KASIR (Menggunakan Async / Await & Try / Catch)
 * Fungsi untuk memproses transaksi di meja kasir tanpa membekukan aplikasi.
 */

const checkoutTransaction = async (customerName, totalAmount) => {
    const generatedInvoiceId = "INV-" + Math.floor(1000 + Math.random() * 9000)

    console.log(`\n========================================`);
    console.log(`🛒 START CHECKOUT FOR: ${customerName}`);
    console.log(`Invoice ID : ${generatedInvoiceId}`);
    console.log(`Total Bill : Rp ${totalAmount}`);
    console.log(`========================================`);
    console.log("Please scan the QRIS code on the customer screen...");

    // Try catch
    try {
        // await : komputer menunggu selama 2 detik
        // selama menunggu, aplikasi wajib berjalan di latar belakang / tetap bisa di klik
        const paymentInfo = await checkQrisPaymentStatus(generatedInvoiceId, totalAmount);

        // Baris di bawah ini HANYA berjalan jika Promise di atas berstatus RESOLVE (Sukses)
        console.log(`\n✅ PAYMENT SUCCESSFUL!`);
        console.log(`Response Time: ${paymentInfo.transactionTime}`);
        console.log(`Action       : Automatically printing receipt for ${customerName}. Beep!`);
    } catch (error) {
        // Baris ini HANYA berjalan jika Promise di atas berstatus REJECT (Gagal/Error)
        console.log(`\n❌ PAYMENT FAILED!`);
        console.log(`Reason       : ${error.message}`);
        console.log(`Action       : Prompting cashier to ask for Alternative Payment (Cash/Debit).`);
    } finally {
        // Blok ini akan SELALU berjalan, baik transaksi sukses maupun gagal
        console.log(`\n[SYSTEM] Transaction session for ${generatedInvoiceId} closed.`);
        console.log(`========================================`);
    }
}

/**
 * 3. SIMULASI EKSEKUSI DI MEJA KASIR
 */

const runCashierDesk = async () => {

        await checkoutTransaction("Alice", 45000);
        await checkoutTransaction("Bob", 7500000);
        await checkoutTransaction("John", 15000);
}

// Jalankan simulasi meja kasir
runCashierDesk();