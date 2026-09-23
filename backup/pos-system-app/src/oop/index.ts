// OOP (OBJECT ORIENTED PROGRAMMING) is a programming paradigm that uses objects and classes to structure code. It allows for encapsulation, inheritance, and polymorphism, making it easier to manage and maintain complex codebases. In TypeScript, OOP concepts can be implemented using classes, interfaces, and access modifiers.

// 1. Encapsulation: Encapsulation is the concept 
// of bundling data (properties) and methods 
// (functions) that operate on that data into a single unit called a class. 
// It allows for controlling access to the internal state of an object,
//  preventing unauthorized access and modification.

// class dummyProduct {
//     // constructor menerima _title & _price, keduanya 'private' → tidak bisa diakses
//     // langsung dari luar kelas (mis. phone._price = ... akan ditolak TypeScript)
//     constructor(private _title: string, private _price: number) {}

//     // GETTER: method ini dijalankan otomatis saat kode luar menulis "phone.price"
//     // (tanpa tanda kurung), seolah _price itu properti publik biasa
//     get price(): number{
//         return this._price; // kembalikan nilai privat ke pemanggil
//     }

//     // SETTER: dijalankan otomatis saat kode luar menulis "phone.price = 799"
//     set price(newPrice: number){
//         if(newPrice < 0){
//             // gerbang validasi: jika harga baru negatif, tolak perubahan dan beri peringatan
//             console.log("Harga tidak boleh negatif");
//         }
//         this._price = newPrice; // jika valid, ubah nilai privat
//         console.log(`Harga diubah menjadi ${this._price}`);
//     }
// }

// const phone = new dummyProduct("iPhone", 999);
// phone.price = -500; // setter dijalankan, harga diubah menjadi -500
// phone.price = 799; // setter dijalankan, harga diubah menjadi 799

// 2. Inheritance: Inheritance is a mechanism that allows a class to inherit properties and methods from another class. 
// This promotes code reusability and establishes a hierarchical relationship between classes.
class User {
    // constructor kelas induk: id, firstName, email jadi properti publik bawaan semua User
    constructor(public id: number,public firstName: string, public email: string) {}

    // method ini otomatis "ikut" ke semua kelas anak yang extends User
    getProfileSummary(): string {
        return `[ID #${this.id} ${this.firstName}] `;
    }
}

// AdminUser mewarisi seluruh isi User lewat kata kunci 'extends'
class AdminUser extends User {
  constructor(
    id: number, firstName: string, email: string,
    public role: string // properti TAMBAHAN, khusus milik AdminUser saja
  ) {
    super(id, firstName, email); // WAJIB: kirim 3 parameter ini ke constructor User dulu
    // baris di bawah super() baru boleh pakai 'this'
  }

  // method BARU, cuma dimiliki AdminUser, tidak ada di User
  deleteProduct(): void {
    console.log(`Admin ${this.firstName} hapus produk.`);
  }
}
const admin = new AdminUser(1, "Alice", "alice@example.com", "super_admin");

admin.getProfileSummary(); // method ini diwarisi dari User
admin.deleteProduct(); // method ini khusus AdminUser, tidak ada di User


// 3. Polymorphism: Polymorphism allows objects of different classes to be treated as objects of a common superclass. 
// It enables methods to be overridden in derived classes, 
// allowing for dynamic behavior based on the object's actual type.
class baseCart {
    constructor(public id: number, public total: number) {}

    // method dasar/default: kalau tidak di-override, cart apa pun pakai rumus ini
    calculateFinalPayment(): number {
        return this.total; // tanpa diskon, tanpa pajak — dibayar apa adanya
    }
}

class promoCart extends baseCart {
    constructor(id: number, total: number, private discount: number) {
        super(id, total); // kirim id & total ke BaseCart dulu
    }

    // 'override' menimpa method calculateFinalPayment milik BaseCart
    override calculateFinalPayment(): number{
        return this.total - (this.total * this.discount / 100); // total dikurangi diskon
    }
}

class taxedCart extends baseCart {
    // override lain, rumus beda lagi: total ditambah pajak 11%
    override calculateFinalPayment(): number {
        return this.total * 1.11; // total ditambah pajak 10%
    }
}

// array bertipe BaseCart[], tapi isinya campuran 3 jenis objek berbeda
const carts: baseCart[] = [
    new baseCart(1, 1000), 
    new promoCart(2, 100, 15),
    new taxedCart(3, 100)
];

carts.forEach(cart =>
    console.log(`Cart #${cart.id} (${cart.constructor.name}): Rp${cart.calculateFinalPayment().toFixed(2)}`)
);
// loop yang SAMA, tapi tiap objek menjalankan versi calculateFinalPayment() miliknya sendiri
// → BaseCart: 100 | PromoCart: 85 (diskon 15%) | TaxedCart: 111 (pajak 11%)


// 4. Abstraction: Abstraction is the concept of hiding 
// the complex implementation details of a class and exposing only the essential features.

// INTERFACE: hanya mendeklarasikan method wajib, tidak ada isi/logika sama sekali
interface IRepository {
    fetchById(id: number): Promise<void>;
}

// ABSTRACT CLASS: campuran method jadi + method kosong (kontrak)
abstract class baseService {
    // method REGULER, sudah matang isinya → langsung diwarisi apa adanya oleh anak
    logActivity(msg: string): void{
        console.log(`[LOG]: ${msg}`);
    }
    // method ABSTRACT: sengaja dikosongkan (tidak ada { }), anak WAJIB mengisi sendiri
    abstract executeProcess(id: number): Promise<void>;
}

class productService extends baseService implements IRepository {
    async fetchById(id: number): Promise<void> {}

    async executeProcess(id: number): Promise<void>{
        this.logActivity(`Memproses produk dengan ID #${id}`);

        await this.fetchById(id);
    }
}
