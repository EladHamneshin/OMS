import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme/theme";
import ProgressCircle from "./ProgressCircle";

export interface StatBoxProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    progress: string;
    increase: string;
}

const StatBox: React.FC<StatBoxProps> = ({ title, subtitle, icon, progress, increase }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m=" 10%">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{ color: colors.lightBlue[700] }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCircle progress={progress} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography
                variant="h5"
                sx={{ color: colors.green[200] }}>
                    {subtitle}
                </Typography>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    fontStyle="italic"
                    sx={{ color: colors.lightBlue[700] }}
                >
                    {`${Number(parseFloat(increase).toFixed(2)).toString()}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default StatBox;

