import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme/theme";

type HeaderProps = {
    title: string,
    subtitle: string
}
const Header = ({ title, subtitle }: HeaderProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box mb="30px" sx={{
            backgroundColor: colors.primary[400],
            p: "20px"
        }}
        >
            <Typography
                variant="h2"
                color={colors.green[200]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.lightBlue[700]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;