const moment = require("moment");

const isDate = (value) => {
    if (!value) return false;

    const myDate = moment(value);

    if (myDate.isValid()) return true;
    else return false;
}

module.exports = { isDate };