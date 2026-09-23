// S.O.L.I.D principles are a set of design principles that help developers create maintainable and scalable software. They are:
// 1. Single Responsibility Principle (SRP): A class should have only one reason to change, meaning it should have only one job or responsibility.

// a. KHUSUS UNTUK PEMROSESAN DATA
class DummyProduct {
    constructor(public title: string, public price: number) {}
}

// b. KHUSUS UNTUK FORMAT OUTPUT
class ProductReceiptFormatter{
    format(p: DummyProduct): string{
        return `${p.title} - $${p.price}`;
    }
}

// c. KHUSUS KOMUNIKASI DENGAN API
class DummyProductRepository{
    async save(p: DummyProduct): Promise<void>{}
}

// 2. Open/Closed Principle (OCP): Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

// kontrak: siapa pun metode pembayaran WAJIB punya fungsi pay()
interface IPaymentMethod {
    pay(amount: number): void;
}
class CreditCardPayment implements IPaymentMethod{
    pay(amount: number): void {console.log(`Paid ${amount} using Credit Card`);}
}

class CryptoPayment implements IPaymentMethod{
    pay(amount: number): void {console.log(`Paid ${amount} using Crypto`);}
}

class CleanPaymentProcessor{
    // menerima OBJECT apapun asal mematuhi kontrak IPaymentMethod
    process(method: IPaymentMethod, amount: number): void{
        method.pay(amount);
    }
}


// 3. Liskov Substitution Principle (LSP): Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.
class BaseProduct { 
    constructor(public title: string, public price: number) {}
    updatePrice(newPrice: number): void { this.price = newPrice } // kontrak: bisa diupdate
}

// ❌ PELANGGARAN: anak MENOLAK kontrak induknya dengan melempar error
class ReadOnlyProduct extends BaseProduct {
    override updatePrice(newPrice: number): void {
        throw new Error("Cannot update price!"); // merusak ekspektasi: bukan lagi "BaseProduct"
    }
}

// ✅ PERBAIKAN: pisah hierarki dari awal, jangan paksa warisi fungsi yang ditolak
class ReadableProduct {
    constructor(public title: string, public price: number) {} // tanpa updatePrice
}

class UpdatableProduct extends ReadableProduct {
    updatePrice(newPrice: number): void {this.price = newPrice}; // hanya di sini ada update
}

// 4. Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use. Instead, create smaller, more specific interfaces.

// ❌ interface RAKSASA memaksa semua implementornya punya SEMUA method
interface IDummyJsonOperations {
    fetchProducts(): Promise<void>;
    createProduct(): Promise<void>;
    deleteProduct(): Promise<void>;
}

// CustomerService terpaksa isi createProduct/deleteProduct walau tak berhak pakai
interface IProductViewer { fetchProducts(): Promise<void>; }
interface IProductEditor { createProduct(): Promise<void>; deleteProduct(): Promise<void>}

// Customer cukup implement kontrak yang dia BUTUH saja
class CleanCustomerService implements IProductViewer{
    async fetchProducts(): Promise<void> {
        console.log("Fetching.....")
    }
}

// Admin implement KEDUA kontrak sekaligus (dipisah koma)
class AdminService implements IProductViewer, IProductEditor{
    async fetchProducts(): Promise<void> {}
    async createProduct(): Promise<void> {}
    async deleteProduct(): Promise<void> {}
}

// 5. Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules. Both should depend on abstractions.

// abstraksi/kontrak: siapa pun "HttpClient" wajib punya method get()
interface IHttpClient {
    get(url: string): Promise<any>;
}

class AxiosDriver implements IHttpClient{
    async get(url: string) { return fetch(url) } // detail teknis tersembunyi di sini
}

// implementasi konkret B — bisa ditukar kapan saja tanpa ubah CleanCartService
class NativeFetchDriver implements IHttpClient{
    async get(url: string) { return fetch(url) } 
}

class CleanCartService {
    // 🔥 DEPENDENCY INJECTION: driver disuntikkan dari LUAR lewat constructor,
    // CleanCartService tidak pernah tahu/pedulikan implementasi konkretnya
    constructor(private httpClient: IHttpClient) {}

    async getCartData (id: number) {
        return this.httpClient.get(`.../carts${id}`) // panggil lewat abstraksi, bukan langsung
    }
}

// 🧪 bebas tukar driver tanpa mengubah sebaris pun kode CleanCartService
const service = new CleanCartService(new NativeFetchDriver)