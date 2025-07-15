import {format} from "date-fns";

function FormatDate(date, template = "do 'de' MMMM yyyy") {
    return format(date, template);
}

export {FormatDate};