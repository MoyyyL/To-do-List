import {format} from "date-fns";

function FormatDate(date, template = "yyyy-MM-dd'T'HH:mm") {
    return format(date, template);
}

export {FormatDate};