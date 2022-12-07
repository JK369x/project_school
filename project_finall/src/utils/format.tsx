import moment from "moment";

export const fmtMoney = (data: number) => {
    return data?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "0";
};

export const fmtDate = (data: string) => {
    return moment(data).format("DD/MM/YYYY");
};