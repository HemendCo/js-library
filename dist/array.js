export const isObject = function (o) {
    return o !== null && typeof o === 'object' && Array.isArray(o) === false;
};
export function unique(arr) {
    return Array.from(new Set(arr));
}
export function remove(arr, item) {
    return arr.filter(el => el !== item);
}
export function shuffle(arr) {
    const copy = [...arr];
    let currentIndex = copy.length;
    let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
    }
    return copy;
}
export function includesAny(arr, elems, shouldAll = false) {
    const matches = elems.filter(el => arr.includes(el)).length;
    return shouldAll ? matches === elems.length : matches > 0;
}
