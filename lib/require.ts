export {};

declare global {
	interface Object {
		clone(): Object;
	}

	interface Array<T> {
		includes(elem: T): boolean;
		contains(elem: T): boolean;
		remove(elem: T): T;
		shuffle(): Array<T>;
		unique(): Array<T>;
		clone(): Array<T>;
	}

	interface String {
		toEnNumbers(): string;
		numberFormat(decimals: number, dec_point: string, thousands_sep: string): string;
		isNumeric(): boolean;
		ucfirst(): string;
		lcfirst(): string;
		ucwords(): string;
		sprintf(): string;
    trim(): string;
    lrtrim(): string;
    rtrim(): string;
    ltrim(): string;
	}

	interface Number {
		numberFormat(decimals: number, dec_point: string, thousands_sep: string): string;
		isNumeric(): boolean;
	}
}

if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
    value: function<T>(this: any, elm: T): boolean {
			return this.indexOf(elm) > -1;
		}
  });
}

if (!Array.prototype.contains) {
	Object.defineProperty(Array.prototype, 'contains', {
    value: function<T>(this: any, elm: T): boolean {
			return this.includes(elm);
		}
  });
}

if (!Array.prototype.unique) {
	Object.defineProperty(Array.prototype, 'unique', {
    value: function<T>(this: any): Array<T> {
			let a: Array<T> = [];
			for (let i=0, l=this.length; i<l; i++) {
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
    value: function<T>(this: any, item: T): T {
			const index: number = this.indexOf(item);
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
    value: function<T>(this: any): Array<T> {
			let array = this;
			let currentIndex: number = array.length,  randomIndex: number;
		
			// While there remain elements to shuffle...
			while (currentIndex !== 0) {
		
				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
		
				// And swap it with the current element.
				[array[currentIndex], array[randomIndex]] = [
					array[randomIndex], array[currentIndex]];
			}
		
			return array;
		}
  });
}

if (!String.prototype.toEnNumbers) {
	Object.defineProperty(String.prototype, 'toEnNumbers', {
    value: function(this: string): string {
			let find: Array<string> = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
			let find2: Array<string> = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
			let replace: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
			let num: string = this;
			let regex: RegExp;
	
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
    value: function(this: number, decimals: number, dec_point: string, thousands_sep: string): string {
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
    value: function(this: string, decimals: number, dec_point: string, thousands_sep: string): string {
			return parseFloat(this).numberFormat(decimals, dec_point, thousands_sep);
		}
  });
}

if (!Number.prototype.isNumeric) {
	Object.defineProperty(Number.prototype, 'isNumeric', {
    value: function(this: number): boolean {
			return true;
		}
  });
}

if (!String.prototype.isNumeric) {
	Object.defineProperty(String.prototype, 'isNumeric', {
    value: function(this: string): boolean {
			let re = /^[+-]?(?:\d*\.)?\d+$/;
			return re.test(this);
		}
  });
}

if (!String.prototype.ucfirst) {
	Object.defineProperty(String.prototype, 'ucfirst', {
    value: function(this: string): string {
			return this.charAt(0).toUpperCase() + this.slice(1);
		}
  });
}

if (!String.prototype.lcfirst) {
	Object.defineProperty(String.prototype, 'lcfirst', {
    value: function(this: string): string {
			return this.charAt(0).toLowerCase() + this.slice(1);
		}
  });
}

if (!String.prototype.ucwords) {
	Object.defineProperty(String.prototype, 'ucwords', {
    value: function(): string {
			return this.toLowerCase().replace(/\b[a-z]/g, function(letter: string) {
				return letter.toUpperCase();
			});
		}
  });
}

if (!String.prototype.sprintf) {
	Object.defineProperty(String.prototype, 'sprintf', {
    value: function(this: string): string {
			let args = arguments, flag = true, i = 0;
			let res = this.replace(/%s/g, function() {
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
    value: function(this: {[key: string]: any}): {[key: string]: any}|Array<any> {
      let copy: {[key: string]: any}|Array<any>;
      if (this instanceof Array) {
        copy = [...this]
      } else {
        copy = { ...this }
      }
	
			return copy;
		}
  });
}

if (!Array.prototype.clone) {
	Object.defineProperty(Array.prototype, 'clone', {
    value: function(this: Array<any>) {
			return [...this];
		}
  });
}

if (!String.prototype.trim) {
	Object.defineProperty(String.prototype, 'trim', {
    value: function(s: string|undefined) {
      return this.lrtrim(s);
    }
  });
}

if (!String.prototype.lrtrim) {
	Object.defineProperty(String.prototype, 'lrtrim', {
    value: function(s: string|undefined) {
      return this.ltrim(s).rtrim(s);
    }
  });
}

if (!String.prototype.ltrim) {
	Object.defineProperty(String.prototype, 'ltrim', {
    value: function(s: string) {
      if (s == undefined) {
        s = '\\s';
      }
      return this.replace(new RegExp('^[' + s + ']*'), '');
    }
  });
}

if (!String.prototype.rtrim) {
	Object.defineProperty(String.prototype, 'rtrim', {
    value: function(s: string|undefined) {
      if (s == undefined) {
        s = '\\s';
      }
      return this.replace(new RegExp('[' + s + ']*$'), '');
    }
  });
}