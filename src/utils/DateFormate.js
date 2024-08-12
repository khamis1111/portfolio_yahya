import moment from "moment"

export const DateFormate = (date) => {
    return moment(date).format('YYYY-MM-DD hh:mm A')
}