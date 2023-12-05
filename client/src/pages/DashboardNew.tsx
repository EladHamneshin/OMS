import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme/theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../components/Header";
import GeographyChart from "../components/GeographyChart";
import BarChart from "../components/BarChart";
import StatBox from "../components/StatBox";
import { useEffect, useState } from "react";
import ordersApi from "../api/ordersApi";
import order from "../types/orderType";
import { ShoppingCart, HourglassTop, Redeem, LocalShipping } from "@mui/icons-material";
import OrderInterface from "../types/orderType";
import calculatePercentage from "../functions/calculatePercentage";
import formatNumberWithCommas from "../functions/formatNumberWithCommas";
import Orders from "./Orders";
import Graphs from "./graphs";

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

  const sumProductsPrice = (filter: string): string | undefined => {
    if (!data) return undefined;
    let total = 0;

    data.forEach((order) => {
      order.cartItems.forEach((product) => {
        if (filter === 'totalPrice') {
          total += product.salePrice * product.quantity * (1 - product.discount / 100);
        } else if (filter === 'quantity') {
          total += product.quantity;
        }
      });
    });

    return total.toString();
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
            justifyContent: "center"
          }}

        >
          <StatBox
            title={getSumOrders('status', 'notCanceled')!}
            subtitle="Active orders"
            progress={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'notCanceled')!).toString()}
            increase={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'notCanceled')!).toString()}
            icon={
              <ShoppingCart
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
            title={getSumOrders('status', 'Send')!}
            subtitle="Send ordors"
            progress={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'Send')!).toString()}
            increase={calculatePercentage(+getSumOrders()!, +getSumOrders('status', 'Send')!).toString()}
            icon={
              <LocalShipping
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
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
            p: "0px"
          }}
        >   <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `4px solid ${colors.primary[500]}`,
            colors: colors.grey[100],
            p: "15px"
          }}

        > <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>

          </Box>

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
           gridColumn: "span 4",
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
              color={colors.greenAccent[500]}
              sx={{ mb: "10px", mt: "5px" }}
            >
              {`${formatNumberWithCommas(+sumProductsPrice('quantity')!)} $`}
            </Typography>
            <Typography>Sum products price:</Typography>
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mb: "10px", mt: "5px" }}
            >
              {`${formatNumberWithCommas(+sumProductsPrice('totalPrice')!)} $`}
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
            gridColumn: "span 4",
            gridRow: "span 3",
            backgroundColor: colors.primary[400],
            padding: "30px 30px 30px 30px"
          }}

        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >

          </Typography>
          <Box height="250px" mt="-20px">
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
           gridColumn: "span 4",
           gridRow: "span 3",
           backgroundColor: colors.primary[400],
           padding: "30px 30px 30px 30px"
         }}

        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
