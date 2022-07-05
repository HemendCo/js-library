import { StorageInterface } from './interface';
declare const storage: (options: StorageInterface) => {
    getAll: () => any;
    getFromLocalStorage: (key: string) => string | null;
    get: (key: string, defaultValue?: any) => any;
    set: (key: string, value: any) => any;
    remove: (key: string) => any;
    clear: () => any;
};
export default storage;
