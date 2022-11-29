import { FC } from "react";

// mui
import {
    Grid,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    useTheme,
} from "@mui/material";

interface LabelAndDataProps {
    label: string;
    data: any;
    onClick?: () => void;
}

export const LabelAndData: FC<LabelAndDataProps> = ({
    label,
    data,
    onClick: handleClick,
}) => {
    const theme = useTheme();

    return (
        <Card
            style={{
                height: "80px",
                backgroundColor: theme.palette.primary.light,
            }}
            elevation={2}
        >
            <CardActionArea
                onClick={() => (handleClick ? handleClick() : null)}
            >
                <CardContent
                    style={{
                        overflow: "hidden",
                        height: "100px",
                        padding: "0px 8px",
                    }}
                >
                    <Typography
                        variant="body2"
                        color={theme.palette.text.secondary}
                    >
                        {label}
                    </Typography>
                    <Grid container justifyContent={"right"}>
                        <Typography
                            variant="h6"
                            color={theme.palette.text.primary}
                        >
                            {data}
                        </Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default LabelAndData;
