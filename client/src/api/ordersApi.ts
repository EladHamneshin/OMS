import OrderInterface from "../types/orderType";

const URL = import.meta.env.VITE_API_URI

async function getAllOrders() {
    try {

        const response = await fetch(`${URL}/orders`);
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
        const response = await fetch(`${URL}/orders/${id}`);
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
export async function updateOrder(id: string, updatedOrders: Partial<OrderInterface>) {
    try {        
        const token = localStorage.getItem('omsToken');

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (token !== null) {
            headers['token'] = token;
        }        
        
        const response = await fetch(`${URL}/orders/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(updatedOrders),
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