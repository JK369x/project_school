import { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

// modules
// import { v4 as uuid } from "uuid";

// mui & control
import {
    List as MuiList,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

export interface DataSourceListType {
    icon?: JSX.Element;
    text: string;
    path?: string;
    subText?: string;
    onClick?: (
        event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
        data: DataSourceListType
    ) => void;
}
interface ListProps {
    dataSource: DataSourceListType[];
    disableIcon?: true;
}
export const List: FC<ListProps> = ({ dataSource }) => {
    const navigate = useNavigate();
    return (
        <MuiList>
            {dataSource.map(({ icon, text, subText, path, onClick }, index) => {
                return (
                    <ListItem
                        disablePadding
                        // key={`${uuid()}-${text}-${index}`}
                        onClick={(event) => {
                            if (onClick) {
                                onClick(event, {
                                    icon,
                                    text,
                                    subText,
                                    path,
                                    onClick,
                                });
                            }
                            if (path) {
                                navigate(path);
                            }
                        }}
                    >
                        <ListItemButton style={{ borderRadius: "10px" }}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text} secondary={subText} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </MuiList>
    );
};

export default List;
