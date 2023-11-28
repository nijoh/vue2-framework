/**
 * 获取localStore参数后val属性数据
 * @param {*} key localStore-key
 * @param {*} val 获取数据.属性
 * @returns 
 */
export default function getLocalStoreByVal(key, val) {
    const localStorageData = JSON.parse(localStorage.getItem(key));
    if (localStorageData) {
        return localStorageData[val];
    }
    return null;
}

/**
 * 获取localStore参数
 * @param {*} localStore-key 
 * @returns 
 */
export function getLocalStore(key) {
    return localStorage.getItem(key) === 'undefined' ? null : JSON.parse(localStorage.getItem(key));
}