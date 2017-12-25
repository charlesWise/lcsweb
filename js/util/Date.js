const regExp = /yy(yy?)?|MM?|dd?|HH?|mm?|ss?/g;

const defaultPattern = 'yyyy-MM-dd HH:mm:ss';

function format(date, pattern) {
    if (!date || (date && new Date(date).toString() == 'Invalid Date')) {
        throw new Error('Invalid Date!');
    }

    pattern = pattern || defaultPattern;

    let originalDate = new Date(date);

    var fileds = {
        'yy': getShortYear(originalDate.getFullYear().toString()),

        'yyyy': originalDate.getFullYear(),

        'MM': pad(originalDate.getMonth() + 1),

        'dd': pad(originalDate.getDate()),

        'HH': pad(originalDate.getHours()),

        'mm': pad(originalDate.getMinutes()),

        'ss': pad(originalDate.getSeconds())
    }

    return pattern.replace(regExp, function (match) {
        if (match in fileds) {
            return fileds[match];
        }
        return '';
    });

}

function getShortYear(fullYear) {
    if (fullYear) {
        return fullYear.substr(-2, 2);
    }
    return '';
}

function pad(val, len) {
    val = String(val);
    len = len || 2;
    if (val.length < len) {
        val = '0' + val;
    }
    return val;
}

module.exports =  {
    format
}
