import OrderInterface from "../types/orderType";


async function getAllOrders() {
    try {
        const response = await fetch(`/api/orders`);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return await response.json();
    } catch (error) {
        console.error('Getting orders failed', error);
        throw error;
    }
}
async function getOrdersById(id: string) {
    try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return await response.json();
    } catch (error) {
        console.error('Getting orders by id failed', error);
        throw error;
    }
}
// async function addOrder(orderData: any) {
//     try {
//         const response = await fetch(`${API_URL}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(orderData)
//         });
//         if (!response.ok) {
//             throw new Error(await response.text());
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Getting orders failed', error);
//         throw error;
//     }
// }
export async function updateOrder(id: string, updatedOrder: Partial<OrderInterface>) {
    try {
        const response = await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrder)
        });
        if (!response.ok) {
            throw new Error('Failed to update order');
        }
        return await response.json();
    } catch (error) {
        console.error('Updating order failed', error);
        throw error;
    }
}
export default { getAllOrders, getOrdersById }