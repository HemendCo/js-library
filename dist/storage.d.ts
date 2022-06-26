import { StorageInterface } from './interface';
declare const storage: (options: StorageInterface) => {
    getAll: () => any;
    getFromLocalStorage: (key: string) => string | null;
    get: (key: string, defaultValue?: any) => any;
    set: (key: string, value: any) => void;
    remove: (key: string) => void;
    clear: () => void;
};
export default storage;
