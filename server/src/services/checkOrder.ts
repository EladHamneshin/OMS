import OrderInterface from "../types/Order.js"
import ProductInterface from "../types/Product.js"
import ProductsQuantities, { Action, ProductQuantity } from "../types/ProductsQuantities.js"
import RequestError from "../utils/RequestError.js"
import STATUS_CODES from "../utils/StatusCodes.js"

const getAndSetQuantity = async (
    order: OrderInterface, action: Action
): Promise<ProductQuantity[] | undefined> => {

    // Creat 'Products Quantities Array' from the order
    const productsQuantitiesArray = serverCheckOrder.creatProductsQuantitiesArray(order.cartItems)

    //Add 'action' state
    const productsQuantities: ProductsQuantities = {
        productsArray: productsQuantitiesArray,
        action: Action.buy
    }

    const PORT = process.env.GLOBAL_FETCH_PORT
    const IP = process.env.GLOBAL_FETCH_IP

    const requestOptions = {
        method: 'POST',
        headers: {
            // 'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productsArray: productsQuantities.productsArray,
            action: action
        })
    };

    const response = await fetch(`http://${IP}:${PORT}/api/shopInventory/updateInventory`,
        requestOptions)

    if (!response) {
        throw new RequestError(`Server returned:`, STATUS_CODES.BAD_REQUEST)
    }
    return response.json()
}


const creatProductsQuantitiesArray = (
    cartItems: ProductInterface[],
): ProductQuantity[] => {
    return cartItems.map(({ productId, quantity }) => ({ productId, quantity }))
}

const serverCheckOrder = { getAndSetQuantity, creatProductsQuantitiesArray }
export default serverCheckOrder 