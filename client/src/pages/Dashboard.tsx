import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme/theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../components/Header";
import GeographyChart from "../components/GeographyChart";
import StatBox from "../components/StatBox";
import { useEffect, useState } from "react";
import ordersApi from "../api/ordersApi";
import order from "../types/orderType";
import { ShoppingCart, HourglassTop, Redeem, LocalShipping } from "@mui/icons-material";
import OrderInterface from "../types/orderType";
import calculatePercentage from "../functions/calculatePercentage";
import formatNumberWithCommas from "../functions/formatNumberWithCommas";
import Orders from "./Orders";
import Graphs from "./graph";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState<order[]>()

  useEffect(() => {
    const getOrders = async () => {
      const orders: order[] = await ordersApi.getAllOrders()
      setData(orders)
    }
    getOrders()
  }, [])

  const getSumOrders = (filterName?: keyof OrderInterface, filterValue?: string | number): string | undefined => {
    if (!data) return undefined;

    if (!filterName || !filterValue) return data.length.toString();

    const filteredOrders = data.filter((order) => {
      if (filterName !== 'status') return order[filterName] === filterValue;
      return filterValue === 'notCanceled'
        ? order.status !== 'Canceled'
        : order.status === filterValue;

    });
    return filteredOrders.length.toString();
  }

  const sumProductsPrice = (): string | undefined => {
    if (!data) return undefined;
    return data.reduce((total, order) => total + order.totalPrice, 0).toString()
  }

  const sumProducts = (): string | undefined => {
    if (!data) return undefined;
    let totalQuantity = 0;

    data.forEach((order) => {
      order.cartItems.forEach((product) => {
        totalQuantity += product.quantity;
      });
    });
    return totalQuantity.toString()
  }


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="OMS DASHBOARD" subtitle="Welcome to oms dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          sx={{
            gridColumn: "span 3",
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}

        >
          <StatBox
            title={getSumOrders('status', 'notCanceled')!}
            subtitle="Active orders"
            progress={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'notCanceled')!).toString()}
            increase={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'notCanceled')!).toString()}
            icon={
              <ShoppingCart
                sx={{ color: colors.teal[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            gridColumn: "span 3",
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <StatBox
            title={getSumOrders('status', 'Waiting')!}
            subtitle="Waiting orders"
            progress={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'Waiting')!).toString()}
            increase={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'Waiting')!).toString()}
            icon={
              <HourglassTop
                sx={{ color: colors.teal[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            gridColumn: "span 3",
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <StatBox
            title={getSumOrders('status', 'Sent')!}
            subtitle="Sent ordors"
            progress={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'Sent')!).toString()}
            increase={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'Sent')!).toString()}
            icon={
              <LocalShipping
                sx={{ color: colors.teal[400], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            gridColumn: "span 3",
            backgroundColor: colors.primary[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <StatBox
            title={getSumOrders('status', 'Received')!}
            subtitle="Received Ordors"
            progress={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'Received')!).toString()}
            increase={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'Received')!).toString()}
            icon={
              <Redeem
                sx={{ color: colors.teal[400], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          sx={{
            gridColumn: "span 12",
            gridRow: "span 2",
            backgroundColor: colors.primary[400],
            overflow: "auto",
            m: "0px",
            p: "0px"
          }}
        >
          <Orders />
        </Box>

        {/* ROW 3 */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems='center'
          justifyItems='center'
          m="2px"
          sx={{
            gridColumn: "span 2",
            gridRow: "span 3",
            backgroundColor: colors.primary[400],
            padding: "30px 30px 30px 30px"
          }}
        >
          <Typography variant="h5" fontWeight="600" sx={{ mt: "10px", mb: "25px" }}>
            Products details
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems='flex-start'
            justifyItems='center'
            m="2px"
          >
            <Typography>Total products:</Typography>
            <Typography
              variant="h5"
              color={colors.teal[400]}
              sx={{ mb: "10px", mt: "5px" }}
            >
              {`${formatNumberWithCommas(+sumProducts()!)}`}
            </Typography>
            <Typography>Sum products price:</Typography>
            <Typography
              variant="h5"
              color={colors.teal[400]}
              sx={{ mb: "10px", mt: "5px" }}
            >
              {`${formatNumberWithCommas(+sumProductsPrice()!)} $`}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems='center'
          justifyItems='center'
          m="2px"
          sx={{
            gridColumn: "span 7",
            gridRow: "span 3",
            backgroundColor: colors.primary[400],
          }}

        >

          <Box height="250px" width="100%" mt="20px" padding="50px">
            <Graphs />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems='center'
          justifyItems='center'
          m="2px"
          sx={{
            gridColumn: "span 3",
            gridRow: "span 3",
            backgroundColor: colors.primary[400],
          }}

        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "1%" }}
            padding="10%"
          >
            Geography Based Traffic
          </Typography>
          <Box
            width="100%"
            height="250px"

          >
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default Dashboard;
