declare const storageBridge: {
    isAvailable: boolean;
    send: Function;
    subscribe: Function;
    unsubscribe: Function;
    getBuffer: Function;
};
export default storageBridge;
