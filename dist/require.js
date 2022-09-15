import { formatBytes } from './index';
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (elm) {
            return this.indexOf(elm) > -1;
        }
    });
}
if (!Array.prototype.contains) {
    Object.defineProperty(Array.prototype, 'contains', {
        value: function (elm) {
            return this.includes(elm);
        }
    });
}
if (!Array.prototype.includesAny) {
    Object.defineProperty(Array.prototype, 'includesAny', {
        value: function (elm, shouldAll) {
            let counter = 0;
            for (let i = 0; i < elm.length; i++) {
                ;
                if (this.includes(elm[i])) {
                    counter++;
                }
            }
            return shouldAll ? counter === elm.length : counter > 0;
        }
    });
}
if (!Array.prototype.containsAny) {
    Object.defineProperty(Array.prototype, 'containsAny', {
        value: function (elm, shouldAll) {
            return this.includesAny(elm, shouldAll);
        }
    });
}
if (!Array.prototype.unique) {
    Object.defineProperty(Array.prototype, 'unique', {
        value: function () {
            let a = [];
            for (let i = 0, l = this.length; i < l; i++) {
                if (a.indexOf(this[i]) === -1) {
                    a.push(this[i]);
                }
            }
            return a;
        }
    });
}
if (!Array.prototype.remove) {
    Object.defineProperty(Array.prototype, 'remove', {
        value: function (item) {
            const index = this.indexOf(item);
            if (index === -1) {
                throw new Error(`${item} not in list`);
            }
            this.splice(index, 1);
            return item;
        }
    });
}
if (!Array.prototype.shuffle) {
    Object.defineProperty(Array.prototype, 'shuffle', {
        value: function () {
            let array = this;
            let currentIndex = array.length, randomIndex;
            // While there remain elements to shuffle...
            while (currentIndex !== 0) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }
            return array;
        }
    });
}
if (!String.prototype.toEnNumbers) {
    Object.defineProperty(String.prototype, 'toEnNumbers', {
        value: function () {
            let find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            let find2 = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            let replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            let num = this;
            let regex;
            for (let i = 0; i < find.length; i++) {
                regex = new RegExp(find[i], "g");
                num = num.replace(regex, replace[i]);
                regex = new RegExp(find2[i], "g");
                num = num.replace(regex, replace[i]);
            }
            return num;
        }
    });
}
if (!Number.prototype.numberFormat) {
    Object.defineProperty(Number.prototype, 'numberFormat', {
        value: function (decimals, dec_point, thousands_sep) {
            dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
            thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';
            let parts = parseFloat(this.toString()).toFixed(decimals).split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);
            return parts.join(dec_point);
        }
    });
}
if (!String.prototype.numberFormat) {
    Object.defineProperty(String.prototype, 'numberFormat', {
        value: function (decimals, dec_point, thousands_sep) {
            return parseFloat(this).numberFormat(decimals, dec_point, thousands_sep);
        }
    });
}
if (!Number.prototype.isNumeric) {
    Object.defineProperty(Number.prototype, 'isNumeric', {
        value: function () {
            return true;
        }
    });
}
if (!Number.prototype.formatBytes) {
    Object.defineProperty(Number.prototype, 'formatBytes', {
        value: function (decimals = 2) {
            return formatBytes(this, decimals || 2);
        }
    });
}
if (!String.prototype.isNumeric) {
    Object.defineProperty(String.prototype, 'isNumeric', {
        value: function () {
            let re = /^[+-]?(?:\d*\.)?\d+$/;
            return re.test(this);
        }
    });
}
if (!String.prototype.ucfirst) {
    Object.defineProperty(String.prototype, 'ucfirst', {
        value: function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
    });
}
if (!String.prototype.lcfirst) {
    Object.defineProperty(String.prototype, 'lcfirst', {
        value: function () {
            return this.charAt(0).toLowerCase() + this.slice(1);
        }
    });
}
if (!String.prototype.ucwords) {
    Object.defineProperty(String.prototype, 'ucwords', {
        value: function () {
            return this.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
        }
    });
}
if (!String.prototype.sprintf) {
    Object.defineProperty(String.prototype, 'sprintf', {
        value: function () {
            let args = arguments, flag = true, i = 0;
            let res = this.replace(/%s/g, function () {
                let arg = args[i++];
                if (typeof arg === 'undefined') {
                    flag = false;
                    return '';
                }
                return arg;
            });
            return flag ? res : '';
        }
    });
}
if (!Object.prototype.clone) {
    Object.defineProperty(Object.prototype, 'clone', {
        writable: true,
        value: function () {
            let copy;
            if (this instanceof Array) {
                copy = [...this];
            }
            else {
                copy = Object.assign({}, this);
            }
            return copy;
        }
    });
}
if (!Array.prototype.clone) {
    Object.defineProperty(Array.prototype, 'clone', {
        writable: true,
        value: function () {
            return [...this];
        }
    });
}
if (!String.prototype.trim) {
    Object.defineProperty(String.prototype, 'trim', {
        writable: true,
        value: function (s) {
            return this.lrtrim(s);
        }
    });
}
if (!String.prototype.lrtrim) {
    Object.defineProperty(String.prototype, 'lrtrim', {
        value: function (s) {
            return this.ltrim(s).rtrim(s);
        }
    });
}
if (!String.prototype.ltrim) {
    Object.defineProperty(String.prototype, 'ltrim', {
        value: function (s) {
            if (s == undefined) {
                s = '\\s';
            }
            return this.replace(new RegExp('^[' + s + ']*'), '');
        }
    });
}
if (!String.prototype.rtrim) {
    Object.defineProperty(String.prototype, 'rtrim', {
        value: function (s) {
            if (s == undefined) {
                s = '\\s';
            }
            return this.replace(new RegExp('[' + s + ']*$'), '');
        }
    });
}
