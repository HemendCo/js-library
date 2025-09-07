export function numberFormat(value, decimals = 0, dec_point = '.', thousands_sep = ',') {
    const parts = value.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);
    return parts.join(dec_point);
}
export var SizeUnits;
(function (SizeUnits) {
    SizeUnits["Bytes"] = "Bytes";
    SizeUnits["KB"] = "KB";
    SizeUnits["MB"] = "MB";
    SizeUnits["GB"] = "GB";
    SizeUnits["TB"] = "TB";
    SizeUnits["PB"] = "PB";
    SizeUnits["EB"] = "EB";
    SizeUnits["ZB"] = "ZB";
    SizeUnits["YB"] = "YB";
})(SizeUnits || (SizeUnits = {}));
export const formatBytes = function (bytes, decimals = 2) {
    if (bytes == 0)
        return '0 B';
    decimals = decimals === undefined ? 2 : decimals;
    let k = 1024; //Or 1 kilo = 1000
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};
