import React, { ReactNode } from 'react'
import { Box, useTheme } from '@mui/material'
import { tokens } from '../theme/theme';

const TabelBox: React.FC<{ children: ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            m="0px 0 0 0"
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
            }}>
            {children}
        </Box>
    )
}

export default TabelBox
