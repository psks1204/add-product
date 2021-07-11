export class Product {
    public _id?: string;
    public name: string;
    public sku: number;
    public price: number;

    constructor(_id: string, name: string, price: number, sku: number) {
        this._id = _id;
        this.name = name;
        this.sku = sku;
        this.price = price;
    }
}