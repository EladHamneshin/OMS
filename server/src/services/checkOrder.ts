import OrderInterface from "../types/Order.js"
import ProductInterface from "../types/Product.js"
import ProductsQuantities, { Action, ProductQuantity } from "../types/ProductsQuantities.js"

const getAndSetQuantity = async (
    { productsArray, action }: ProductsQuantities
): Promise<ProductQuantity[] | undefined> => {

    const PORT = process.env.GLOBAL_FETCH_PORT
    const IP = process.env.GLOBAL_FETCH_IP

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
    try {
        const response = await fetch(`http://${IP}:${PORT}/api/shopInventory/updateInventory`,
            requestOptions)

        if (response.ok) {
            return response.json()
        }
    } catch (errer) {
        throw new Error(`The order was not made The server returned: ${errer}`)
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