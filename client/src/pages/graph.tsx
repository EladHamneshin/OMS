import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import ordersApi from '../api/ordersApi';
import order from "../types/orderType";

// Define the enums
export enum OrderStatusEnum {
    Waiting = 'Waiting',
    Sent = 'Sent',
    Received = 'Received',
    Canceled = 'Canceled',
    AwaitingPayment = 'Awaiting payment', 
}

export const OrderEnum = {
    Express: 'Express',
    Regular: 'Regular',
    SelfCollection: 'SelfCollection',
} as const;

export default function Graph() {
    const [, setData] = useState<order[]>([]);
    const [allOrdersCounter, setAllOrdersCounter] = useState([
        {
            label: 'All orders',
            data: Array(Object.keys(OrderStatusEnum).length).fill(0),
        },
        {
            label: 'Sent',
            data: Array(Object.keys(OrderStatusEnum).length).fill(0),
        },
        {
            label: 'Received',
            data: Array(Object.keys(OrderStatusEnum).length).fill(0),
        },
        {
            label: 'Canceled',
            data: Array(Object.keys(OrderStatusEnum).length).fill(0),
        },
        {
            label: 'Waiting', 
            data: Array(Object.keys(OrderStatusEnum).length).fill(0),
        },
    ]);

    const [seriesNb, setSeriesNb] = React.useState(6);
    const [itemNb, setItemNb] = React.useState(4);

    // const handleItemNbChange = (event: Event, newValue: number | number[]) => {
    //     if (typeof newValue === 'number') {
    //         setItemNb(newValue);
    //     }
    // };

    const handleSeriesNbChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setSeriesNb(newValue);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersData: order[] = await ordersApi.getAllOrders();
                setData(ordersData);

                const counters = [
                    {
                        label: 'All orders',
                        data: Array(Object.keys(OrderStatusEnum).length).fill(0),
                    },
                    {
                        label: 'Sent',
                        data: Array(Object.keys(OrderStatusEnum).length).fill(0),
                    },
                    {
                        label: 'Received',
                        data: Array(Object.keys(OrderStatusEnum).length).fill(0),
                    },
                    {
                        label: 'Canceled',
                        data: Array(Object.keys(OrderStatusEnum).length).fill(0),
                    },
                    {
                        label: 'Waiting',
                        data: Array(Object.keys(OrderStatusEnum).length).fill(0),
                    },
                ];

                ordersData.forEach((order) => {
                    if (order.status in OrderStatusEnum) {
                        // Increment the counter based on the order status
                        const statusIndex = Object.values(OrderStatusEnum).indexOf(order.status);
                        counters[0].data[statusIndex] += 1; // All orders counter

                        // Update other counters based on the order status
                        const status = order.status as OrderStatusEnum;
                        counters.forEach((counter, index) => {
                            if (counter.label !== 'All orders') {
                                counters[index].data[statusIndex] += (status === counter.label) ? 1 : 0;
                            }
                        });
                    } else if (order.status === undefined || order.status === null) {
                        // Handle orders with undefined or null status
                        console.log('Undefined or null status for order:', order);
                    }
                });

                setAllOrdersCounter(counters);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='con'>
            <Box sx={{ width: '100%' }}>
                <BarChart
                    height={300}
                    series={allOrdersCounter
                        .slice(0, seriesNb)
                        .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
                />
                <Typography id="input-series-number" gutterBottom>
                    Number of statuses to show
                </Typography>
                <Slider
                    value={seriesNb}
                    onChange={handleSeriesNbChange}
                    valueLabelDisplay="auto"
                    min={1}
                    max={Object.keys(OrderStatusEnum).length}
                    aria-labelledby="input-series-number"
                />
            </Box>
        </div>
    );
}

