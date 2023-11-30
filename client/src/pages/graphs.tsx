import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import ordersApi from '../api/ordersApi';
import order from "../types/orderType";

// import './style/graphStyle.css'

export default function Graph() {

    let allOrdersCounter = [
        {
            label: 'All orders',
            data: [0, 0],
        },
    ];

    const [rows, setRows] = useState<order[]>([]);

    const [seriesNb, setSeriesNb] = React.useState(2);
    const [itemNb, setItemNb] = React.useState(5);
    // const [skipAnimation, setSkipAnimation] = React.useState(false);

    const handleItemNbChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setItemNb(newValue);
    };
    const handleSeriesNbChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setSeriesNb(newValue);
    };

    useEffect(() => {
        const fetchDataAndCheckAdmin = async () => {
            const data: order[] = await ordersApi.getAllOrders();

            // console.log(data[0].status);

            const formattedData = data.map((order) => ({
                ...order,
                id: order._id,
                cart: order.cartItems,
                userName: order.userName,
            }));
            console.log(formattedData);

            setRows(formattedData);
            // console.log(rows);


            function allOrdersFun(data: any): any {

                for (let i = 0; i < data.length; i++) {

                    if (data[i].status != 'Received') {
                        console.log('aaaa');

                        allOrdersCounter[i].data[0] = + 1
                        console.log('counter', allOrdersCounter);

                    } else if  (data[i].status === '') {
                        console.log('bbbb');
                    };
                };
            };
            allOrdersFun(data)
        }
        fetchDataAndCheckAdmin()
    }
    );


    const seriesA = [
        {
            label: 'All orders',
            data: [
                1653, 1234, 764, 1879, 1478, 1373, 1891, 2171, 620, 1269, 724, 1707, 1188,
                1879, 626, 1635, 2177, 516, 1793, 1598,
            ],
        },
        {
            label: 'Sent',
            data: [
                2362, 2254, 1962, 1336, 586, 1069, 2194, 1629, 2173, 2031, 1757, 862, 2446,
                910, 2430, 2300, 805, 1835, 1684, 2197,
            ],
        },
        {
            label: 'Received',
            data: [
                1145, 1214, 975, 2266, 1768, 2341, 747, 1282, 1780, 1766, 2115, 1720, 1057,
                2000, 1716, 2253, 619, 1626, 1209, 1786,
            ],
        },
        {
            label: 'Canceled',
            data: [
                2361, 979, 2430, 1768, 1913, 2342, 1868, 1319, 1038, 2139, 1691, 935, 2262,
                1580, 692, 1559, 1344, 1442, 1593, 1889,
            ],
        },
        {
            label: 'Awaiting payment',
            data: [
                968, 1371, 1381, 1060, 1327, 934, 1779, 1361, 878, 1055, 1737, 2380, 875, 2408,
                1066, 1802, 1442, 1567, 1552, 1742,
            ],
        },
        {
            label: 'Held by an admin',
            data: [
                2316, 1845, 2057, 1479, 1859, 1015, 1569, 1448, 1354, 1007, 799, 1748, 1454,
                1968, 1129, 1196, 2158, 540, 1482, 880,
            ],
        },

    ].map((s) => ({ ...s, highlightScope }))


    return (
        <div className='con'>
            <Box sx={{ width: '100%' }}>
                <BarChart
                    height={300}
                    series={allOrdersCounter
                        .slice(0, seriesNb)
                        .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
                // skipAnimation={skipAnimation}
                />
                {/* <FormControlLabel
                checked={skipAnimation}
                control={
                    <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
                }
                label="skipAnimation"
                labelPlacement="end"
            /> */}


                {/* <Typography id="input-item-number" gutterBottom>
                Number of items
            </Typography>
            <Slider
                value={itemNb}
                onChange={handleItemNbChange}
                valueLabelDisplay="auto"
                min={1}
                max={20}
                aria-labelledby="input-item-number"
            /> */}
                <Typography id="input-series-number" gutterBottom>
                    Number of statuses to show
                </Typography>
                <Slider
                    value={seriesNb}
                    onChange={handleSeriesNbChange}
                    valueLabelDisplay="auto"
                    min={1}
                    max={6}
                    aria-labelledby="input-series-number"
                />
            </Box>
        </div>
    );
}

const highlightScope = {
    highlighted: 'series',
    faded: 'global',
} as const;
