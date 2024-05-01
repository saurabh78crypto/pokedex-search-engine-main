import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });


export const get = (key) => myCache.get(key);
export const set = (key, value) => myCache.set(key, value);