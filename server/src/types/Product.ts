import mongoose from "mongoose";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export default Product