import { Box, useTheme, Theme } from "@mui/material";
import { tokens } from "../theme/theme";

interface ProgressCircleProps {
    progress?: string;
    size?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, size = "40" }) => {
    const theme = useTheme<Theme>();
    const colors = tokens(theme.palette.mode);
    const angle = (parseFloat(progress!) / 100) * 360 ;

    return (
        <Box
            sx={{
                background: `radial-gradient(${colors.primary[400]} 55%, transparent 60%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.deepPurple[200]} ${angle}deg 360deg),
            ${colors.green[200]}`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    );
};

export default ProgressCircle;
