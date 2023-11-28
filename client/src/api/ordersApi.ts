import OrderInterface from "../types/orderType";

const API_URI = import.meta.env.VITE_API_URI + '/api'

async function getAllOrders() {
    try {
        const response = await fetch(`${API_URI}/orders`);
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
        const response = await fetch(`${API_URI}/orders/${id}`);
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
export async function updateOrder(id: string, orderToUpdated: Partial<OrderInterface>) {
    try {
        console.log(orderToUpdated);
        
        const response = await fetch(`${API_URI}/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: orderToUpdated
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