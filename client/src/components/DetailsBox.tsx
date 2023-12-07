import React, { ReactNode } from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme/theme';

interface DetailsBoxProps {
    title: string;
    description: ReactNode;
    isCartItems?: boolean;
}

const DetailsBox = ({ title, description, isCartItems = false }: DetailsBoxProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Stack
            direction="row"
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            m="1px"
            sx={{
                minWidth:"1200em",
                backgroundColor: isCartItems ? colors.lightBlue[700][700] : colors.primary[400],
                p: "10px"
            }}
        >
            <Typography variant="h5" color={isCartItems ? colors.lightBlue[700] : colors.lightBlue[700]} minWidth="140px">
                {title}:
            </Typography>
            <Typography variant="h5" color={colors.grey[100]} sx={{ wordWrap: 'break-word', maxWidth: '180px' }}>
                {description}
            </Typography>
        </Stack>
    );
};

export default DetailsBox;
