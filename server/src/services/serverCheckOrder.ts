// import OrderInterface from "../types/Order.js"
// import ProductInterface from "../types/Product.js"
// import { ProductQuantity } from "../types/ProductsQuantities.js"

// const getAndSetQuantity = async (
//     productsArray :  ProductQuantity[]
// ): Promise<ProductQuantity[] | undefined> => {

//     const PORT = process.env.GLOBAL_FETCH_PORT
//     const IP = process.env.GLOBAL_FETCH_IP

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             // 'Authorization': `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             productsArray: productsArray,
//         })
//     };
//     try {
//         const response = await fetch(`http://${IP}:${PORT}/api/shopInventory/updateInventory`,
//             requestOptions)

//         if (response.ok) {
//             return response.json()
//         }
//     } catch (errer) {
//         throw new Error(`The order was not made The server returned: ${errer}`)
//     }
// }



// const creatProductsQuantitiesArray = (cartItems: ProductInterface[]) => {
//     return cartItems.map(({ productId, quantity }) => ({ productId, quantity }))
// }

// const updateCart = async (cartItems: ProductInterface[]): Promise<ProductInterface[]> => {

//     const productsQuantitiesArray = creatProductsQuantitiesArray(cartItems)

//     const newProductsQuantitiesArray = await getAndSetQuantity(productsQuantitiesArray)

//     return cartItems.map(product => {
//         const update = newProductsQuantitiesArray!.find(u => u.productId === product.productId);
//         if (update) {
//             return { ...product, quantity: update.quantity };
//         }
//         return product;
//     });
// }

// const serverCheckOrder = { getAndSetQuantity, updateCart, creatProductsQuantitiesArray }
// export default serverCheckOrder 