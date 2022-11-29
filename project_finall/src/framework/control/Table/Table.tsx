import { FC, useState, MouseEvent, ChangeEvent } from "react";

// mui & control
import {
    Box,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead as MuiTableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Checkbox,
    Typography,
    IconButton,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { fmtMoney, fmtDate } from "../../../utils/format";

// future
/**
 * edit table
 * freeze header
 * freeze column
 * check type display
 */

interface ControlTableProps {
    densePadding?: true;
}

const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T): number => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number): any[] {
const stableSort = <T,>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
): any[] => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    columnOptions: TableColumnOptions[];
    isSelectTable?: true;
    densePadding?: true;
}

const TableHead = (props: EnhancedTableProps) => {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        columnOptions,
        densePadding,
        isSelectTable,
    } = props;
    const createSortHandler =
        (property: string) => (event: MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <MuiTableHead>
            <TableRow>
                {isSelectTable === true ? (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                "aria-label": "select all desserts",
                            }}
                        />
                    </TableCell>
                ) : null}
                {columnOptions.map(({ label, value, alignHeader }, index) => (
                    <TableCell
                        key={`${label}-${value}-${index}`}
                        align={alignHeader ?? "left"}
                        padding={densePadding ? "none" : "normal"}
                        sortDirection={orderBy === value ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === value}
                            direction={orderBy === value ? order : "asc"}
                            onClick={createSortHandler(value)}
                        >
                            <Typography variant="subtitle1">{label}</Typography>
                            {orderBy === value ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </MuiTableHead>
    );
};

export interface TableColumnOptions {
    label: string;
    alignValue?: "left" | "center" | "right" | "inherit" | "justify";
    alignHeader?: "left" | "center" | "right" | "inherit" | "justify";
    value: string;
    sortable?: boolean;
    width?: string;
    color?: string;
    colorField?: string;
    format?: "money" | "date";
    unit?: string;
    icon?: JSX.Element;
    iconOnClick?: (data: any) => void;
}

interface ControlTableProps {
    columnOptions: TableColumnOptions[];
    dataSource: any[];
    keyData?: string;
    densePadding?: true;
    isSelectTable?: true;
    defaultRowsPerPage?: number;
    stickyHeader?: boolean;
}

export const Table: FC<ControlTableProps> = (props) => {
    const {
        columnOptions,
        dataSource,
        densePadding,
        isSelectTable,
        keyData,
        defaultRowsPerPage,
        stickyHeader,
    } = props;
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<string>("");
    const [selected, setSelected] = useState<readonly object[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage ?? 5);

    const handleRequestSort = (
        event: MouseEvent<unknown>,
        property: string
    ) => {
        const isAsc = orderBy === property && order === "asc";
        if (property === orderBy) {
            if (order === "asc") {
                setOrder("desc");
            } else {
                setOrder("asc");
                setOrderBy("");
            }
        } else {
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(property);
        }
    };

    const handleSelectItem = (
        event: ChangeEvent<HTMLInputElement>,
        rowData: any
    ) => {
        if (event.target.checked) {
            setSelected([...selected, rowData]);
        } else {
            const index = selected.findIndex((el: any) => {
                if (keyData) {
                    return el[keyData] === rowData[keyData];
                } else {
                    let checkKeyValues = true;
                    columnOptions.forEach((co) => {
                        if (el[co.value] !== rowData[co.value]) {
                            checkKeyValues = false;
                        }
                    });
                    return checkKeyValues;
                }
            });
            let newvalues = [...selected];
            newvalues.splice(index, 1);
            setSelected(newvalues);
        }
    };

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(dataSource);
        } else {
            setSelected([]);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (rowData: any) => {
        return (
            selected.findIndex((el: any) => {
                if (keyData) {
                    return el[keyData] === rowData[keyData];
                } else {
                    let checkKeyValues = true;
                    columnOptions.forEach((co) => {
                        if (el[co.value] !== rowData[co.value]) {
                            checkKeyValues = false;
                        }
                    });
                    return checkKeyValues;
                }
            }) !== -1
        );
    };

    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - dataSource.length)
            : 0;

    return (
        <>
            <TableContainer>
                <MuiTable
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={densePadding ? "small" : "medium"}
                    stickyHeader={stickyHeader}
                >
                    <TableHead
                        columnOptions={columnOptions}
                        isSelectTable={isSelectTable}
                        densePadding={densePadding}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAll}
                        onRequestSort={handleRequestSort}
                        rowCount={dataSource.length}
                    />
                    <TableBody>
                        {stableSort(dataSource, getComparator(order, orderBy))
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                                const isItemSelected = isSelected(row);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        // onClick={(event) => handleClick(event, 'a')}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={`${index}-${
                                            row[keyData as string]
                                        }`}
                                        selected={isItemSelected}
                                    >
                                        {isSelectTable ? (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby":
                                                            labelId,
                                                    }}
                                                    onChange={(e) =>
                                                        handleSelectItem(e, row)
                                                    }
                                                />
                                            </TableCell>
                                        ) : null}
                                        {columnOptions.map(
                                            (
                                                {
                                                    label,
                                                    value,
                                                    alignValue,
                                                    width,
                                                    color,
                                                    colorField,
                                                    format,
                                                    unit,
                                                    icon,
                                                    iconOnClick,
                                                },
                                                i
                                            ) => {
                                                const sv = value.split(".");
                                                let valueData: any = row;
                                                sv.forEach((e) => {
                                                    valueData = valueData[e];
                                                });
                                                let colorData = color;
                                                if (colorField) {
                                                    colorData =
                                                        row[colorField] ??
                                                        color;
                                                }
                                                return (
                                                    <TableCell
                                                        key={`${index}-${i}-${label}-${
                                                            row[
                                                                keyData as string
                                                            ]
                                                        }`}
                                                        align={
                                                            alignValue ?? "left"
                                                        }
                                                        width={width}
                                                    >
                                                        {icon ? (
                                                            <IconButton
                                                                color={
                                                                    color as any
                                                                }
                                                                onClick={() => {
                                                                    if (
                                                                        iconOnClick
                                                                    )
                                                                        iconOnClick(
                                                                            row
                                                                        );
                                                                }}
                                                            >
                                                                {icon}
                                                            </IconButton>
                                                        ) : (
                                                            <Typography
                                                                variant="body2"
                                                                color={
                                                                    colorData
                                                                }
                                                            >
                                                                {format ===
                                                                "money"
                                                                    ? fmtMoney(
                                                                          valueData
                                                                      )
                                                                    : format ===
                                                                      "date"
                                                                    ? fmtDate(
                                                                          valueData
                                                                      )
                                                                    : valueData}
                                                                {unit ?? ""}
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                );
                                            }
                                        )}
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height:
                                        (densePadding ? 33 : 53) * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={dataSource.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default Table;
