import { StorageInterface } from './interface';

const storage = (options: StorageInterface) => {
  let prefix = options.prefix + '.';

  let ls = {
    getAll: () => {
      let data: any = {};

      for (let key in localStorage) {
        if (key.indexOf(prefix) === 0) {
          data[key.replace(prefix, '')] = ls.getFromLocalStorage(key);
        }
      }

      return data;
    },

    getFromLocalStorage: (key: string) => {
      let value: string|null = localStorage.getItem(key);

      try {
        value = value === null ? null : JSON.parse(value);
      }
      catch (e) {
      // if (console) console.log(key + " doesnt seems to be JSON");
      }

      return value;
    },

    // Get item from localStorage
    get: (key: string, defaultValue: any = null) => {
      return ls.getFromLocalStorage(prefix + key) || defaultValue;
    },

    // Set item in localStorage
    set: (key: string, value: any) => {
      if (typeof value === 'object') {
        value =  JSON.stringify(value);
      }

      localStorage.setItem(prefix + key, value);
    },

    remove: (key: string) => {
      localStorage.removeItem(prefix + key);
    },

    clear: () => {
      localStorage.removeItem(prefix);
    }
  }

  return ls;
}

export default storage