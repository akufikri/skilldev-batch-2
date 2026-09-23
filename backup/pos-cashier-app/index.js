// Memanggil package cowsay yang sudah di-install
import cowsay from "cowsay";

// Menjalankan fungsi cowsay
console.log(
  cowsay.say({
    text: "Aplikasi POS siap dibangun menggunakan pnpm!",
    e: "oO",
    T: "U ",
  }),
);