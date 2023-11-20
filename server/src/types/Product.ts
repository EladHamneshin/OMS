import mongoose from "mongoose";

interface ProductInterface {
    name:string;
    description:string;
    price:number
    quantity:number
    }

export default ProductInterface