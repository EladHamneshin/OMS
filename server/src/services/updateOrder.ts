import OrderInterface from "../types/Order"
import ProductInterface from "../types/Product"
import ProductsQuantities, { Action, ProductQuantity } from "../types/productsQuantities"

const PORT = 3000
const IP = "localhost"

const getAndSetQuantity = async ({ productsArray, action }: ProductsQuantities): Promise<boolean> => {

    const results = await Promise.all(productsArray.map(async ({ productId, quantity }) => {

        const requestOptions = {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: productId,
                requiredQuantity: quantity,
                action: action
            })
        };
        try {
            const response = await fetch(`http://${IP}:${PORT}/api/shop_inventory/updateInventory`,
                requestOptions)

            if (!response.ok) {
                return false
            } else {
                return true
            }
        }
        catch (error) {
            throw new Error('An error occurred, the server returned: ')
        }
    }))

    return results.every(result => result === true);
}


const forEathProductOnArray = async (order: OrderInterface, action: Action): Promise<ProductInterface> => {

    const { cartItems } = order
    const newCartItems = cartItems.map(async ({ productId, quantity }) => {

        const productQuantity: ProductQuantity = {
            productId: productId,
            quantity: quantity
        }

        try {
            const response = await getAndSetQuantity({ productQuantity, action })
            if (!response) {
                return false
            } else {
                return true
            }
        }
        catch (error) {
            throw new Error('An error occurred, the server returned: ')
        }
    })

    return newCartItems
}

const updateOrder = { getAndSetQuantity, forEathProductOnArray }

export default updateOrder 