// src/services/product.service.ts

// standarisasi bentuk data produk
export interface IDummyProduct{
    id: number;
    title: string;
    price: number;
}

export class ProductService{
    // simulasi database
    private product: IDummyProduct[] = [
        {id: 1, title: "Iphone 12", price: 599},
        {id: 2, title: "Iphone 16", price: 1999},
    ]

    getAllProduct(): IDummyProduct[] {
        return this.product
    }

    createProduct(title: string, price: number): IDummyProduct {
        const newProduct: IDummyProduct = {
            id: Math.floor(Math.random() * 1000) + 100, // Simulasi auto-increment id
            title,
            price
        };

        this.product.push(newProduct);
        return newProduct
    }
}