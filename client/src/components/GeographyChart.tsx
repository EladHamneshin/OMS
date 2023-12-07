import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../theme/theme";
import { useState, useEffect } from "react";
import { CountByIsoCountryCode, countCountriesInOrders } from "../functions/countCountries";
import ordersApi from "../api/ordersApi";
import order from "../types/orderType";
import { useDataContext } from "./DataContext";

const GeographyChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState<CountByIsoCountryCode[]>()
    const { setOrders } = useDataContext();

    useEffect(() => {
        const getOrders = async () => {
            const orders: order[] = await ordersApi.getAllOrders()
            setData(countCountriesInOrders(orders))
            setOrders(orders)
        }
        getOrders()
    }, [data, setOrders])

    return (
        <>
            {data && <ResponsiveChoropleth
                data={data}
                theme={{
                    tooltip: {
                        container: {
                            background: colors.grey[900],
                            color: colors.grey[100],
                        },
                    },
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.lightBlue[200],
                            },
                        },
                        legend: {
                            text: {
                                fill: colors.lightBlue[200],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: colors.lightBlue[200],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: colors.lightBlue[200],
                            },
                        },
                    },

                    legends: {
                        text: {
                            fill: colors.lightBlue[200],
                        },
                    },

                }}
                features={geoFeatures.features}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                domain={[0, 10]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={isDashboard ? 40 : 150}
                projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
                projectionRotation={[0, 0, 0]}
                borderWidth={1.5}
                borderColor="#ffffff"
                legends={
                    !isDashboard
                        ? [
                            {
                                anchor: "bottom-left",
                                direction: "column",
                                justify: true,
                                translateX: 20,
                                translateY: -100,
                                itemsSpacing: 0,
                                itemWidth: 94,
                                itemHeight: 18,
                                itemDirection: "left-to-right",
                                itemTextColor: colors.grey[900],
                                itemOpacity: 0.85,
                                symbolSize: 18,
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemTextColor: "#ffffff",
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]
                        : undefined
                }
            />}
        </>
    );
};

export default GeographyChart;