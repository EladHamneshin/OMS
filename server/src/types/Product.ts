import mongoose from "mongoose";

interface ProductInterface {
    productId: string;
    name: string;
    description: string;
    price: number
    quantity: number
}

export default ProductInterface