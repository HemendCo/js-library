export function toEnNumbers(str) {
    const find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const find2 = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let out = str;
    find.forEach((f, i) => {
        const regex = new RegExp(f, 'g');
        out = out.replace(regex, replace[i]);
        const regex2 = new RegExp(find2[i], 'g');
        out = out.replace(regex2, replace[i]);
    });
    return out;
}
export function isNumeric(str) {
    return /^[+-]?(?:\d*\.)?\d+$/.test(str);
}
export function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function lcfirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
export function ucwords(str) {
    return str.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
}
export function sprintf(template, ...args) {
    let i = 0;
    return template.replace(/%s/g, () => { var _a; return ((_a = args[i++]) !== null && _a !== void 0 ? _a : '').toString(); });
}
export function ltrim(str, s = '\\s') {
    return str.replace(new RegExp('^[' + s + ']*'), '');
}
export function rtrim(str, s = '\\s') {
    return str.replace(new RegExp('[' + s + ']*$'), '');
}
export function lrtrim(str, s = '\\s') {
    return ltrim(rtrim(str, s), s);
}
