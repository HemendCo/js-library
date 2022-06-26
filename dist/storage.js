"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage = (options) => {
    let prefix = options.prefix + '.';
    let ls = {
        getAll: () => {
            let data = {};
            for (let key in localStorage) {
                if (key.indexOf(prefix) === 0) {
                    data[key.replace(prefix, '')] = ls.getFromLocalStorage(key);
                }
            }
            return data;
        },
        getFromLocalStorage: (key) => {
            let value = localStorage.getItem(key);
            try {
                value = value === null ? null : JSON.parse(value);
            }
            catch (e) {
                // if (console) console.log(key + " doesnt seems to be JSON");
            }
            return value;
        },
        // Get item from localStorage
        get: (key, defaultValue = null) => {
            return ls.getFromLocalStorage(prefix + key) || defaultValue;
        },
        // Set item in localStorage
        set: (key, value) => {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            localStorage.setItem(prefix + key, value);
        },
        remove: (key) => {
            localStorage.removeItem(prefix + key);
        },
        clear: () => {
            localStorage.removeItem(prefix);
        }
    };
    return ls;
};
exports.default = storage;
