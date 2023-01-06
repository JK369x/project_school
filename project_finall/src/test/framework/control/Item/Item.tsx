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
    img?: string;
    onClick?: () => void;
}

export const Item: FC<LabelAndDataProps> = ({
    label,
    data,
    img,
    onClick: handleClick,
}) => {
    const theme = useTheme();

    return (
        <Card
            style={{
                height: "80px",
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
                        padding: "8px",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={6} sx={{ maxWidth: "84px" }}>
                            <CardMedia
                                component="img"
                                height="66"
                                image={img}
                                sx={{ borderRadius: "5px" }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                color={theme.palette.text.secondary}
                            >
                                {label}
                            </Typography>
                            {/* <Grid container justifyContent={"right"}> */}
                            <Typography
                                variant="body2"
                                color={theme.palette.text.primary}
                            >
                                {data}
                            </Typography>
                            {/* </Grid> */}
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Item;
