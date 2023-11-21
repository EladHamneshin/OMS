import OrderInterface from "../types/Order"
import ProductInterface from "../types/Product"
import ProductsQuantities, { Action, ProductQuantity } from "../types/ProductsQuantities"

const PORT = process.env.GLOBAL_FETCH_PORT
const IP = process.env.GLOBAL_FETCH_IP

const getAndSetQuantity = async (
    { productsArray, action }: ProductsQuantities
): Promise<ProductQuantity[] | undefined> => {

    const requestOptions = {
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productsArray: productsArray,
            action: action
        })
    };
    const response = await fetch(`http://${IP}:${PORT}/api/shopInventory/updateInventory`,
        requestOptions)

    if (response.ok) {
        return response.json()
    }
}



const creatProductsQuantitiesArray = (
    cartItems: ProductInterface[],
): ProductQuantity[] => {
    return cartItems.map(({ productId, quantity }) => ({ productId, quantity }))
}

const updateCart = async (cartItems: ProductInterface[]): Promise<ProductInterface[]> => {

    const productsQuantitiesArray = creatProductsQuantitiesArray(cartItems)

    const newProductsQuantitiesArray = await getAndSetQuantity({
        productsArray: productsQuantitiesArray,
        action: Action.buy
    })

    return cartItems.map(product => {
        const update = newProductsQuantitiesArray!.find(u => u.productId === product.productId);
        if (update) {
            return { ...product, quantity: update.quantity };
        }
        return product;
    });
}

const serverCheckOrder = { getAndSetQuantity, updateCart, creatProductsQuantitiesArray }
export default serverCheckOrder 