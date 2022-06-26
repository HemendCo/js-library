const storageBridge = (() => {
  /*
    - Storing messages in localStorage.
    - Clients subscribe to the changes and
      they get notified if a new message arrives.
  */

  const isAvailable: boolean = (function() {
    let mod = '_';
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch(e) {
      return false;
    }
  }) ();

  const errorUnAvailable = () => {
    throw new Error('localStorage not supported.');
  }

  let api: {
    isAvailable: boolean;
    send: Function;
    subscribe: Function;
    unsubscribe: Function;
    getBuffer: Function;

  } = {
    isAvailable,
    send: errorUnAvailable,
    subscribe: errorUnAvailable,
    unsubscribe: errorUnAvailable,
    getBuffer: errorUnAvailable,
  };

  if(api.isAvailable) {
    let interval = 100
      , intervalForRemoval = 200
      , ls = localStorage
      , listeners: {[key: string]: Array<Function>} = {}
      , isLoopStarted = false
      , buffer: {[key: string]: Array<string | null>} = {};

    let loop = function() {
      for(let namespace in listeners) {
        let data = ls.getItem(namespace);
        if(data && buffer[namespace] && buffer[namespace].indexOf(data) === -1) {
          buffer[namespace].push(data);
          try {
            let parsed = JSON.parse(data);
            if(parsed) data = parsed;
          } catch(e) {}
          for(let i=0; i<listeners[namespace].length; i++) {
            listeners[namespace][i](data);
          }
          if(!ls.getItem(namespace + '-removeit')) {
            ls.setItem(namespace + '-removeit', '1');
            (function(n) {
              setTimeout(function() {
                ls.removeItem(n);
                ls.removeItem(n + '-removeit');
                buffer[namespace] = [];
              }, intervalForRemoval);
            })(namespace);
          }
        } else if(!data) {
          buffer[namespace] = [];
        }
      }
      setTimeout(loop, interval);
      return true;
    }

    api.send = (namespace: string, data: Function|Object|string) => {
      let raw: string = '';
      if(typeof data === 'function') { data = data(); }
      if(typeof data === 'object') {
        raw = JSON.stringify(data);
      } else {
        raw = typeof data === 'string' ? data : data.toString();
      }

      ls.setItem(namespace, raw);
    }


    api.subscribe = (namespace: string, cb: Function) => {
      if(!listeners[namespace]) {
        listeners[namespace] = [];
        buffer[namespace] = [];
      }
      listeners[namespace].push(cb);
      if(!isLoopStarted) {
        isLoopStarted = loop();
      }
    }

    api.unsubscribe = (namespace: string) => {
      if(listeners[namespace]) {
        listeners[namespace] = [];
      }
      if(buffer[namespace]) {
        buffer[namespace] = [];
      }
    }

    api.getBuffer = () => {
      return buffer;
    }

  }

  return api;
}) ();

export default storageBridge