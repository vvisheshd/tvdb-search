const tryParseJSON = (str) => {
    let obj = null;
    if(!str) return null;
    try {
        obj = JSON.parse(str);
    } catch (e) {
    }
    return obj;
}

const getSessionItem = (key) => {
    const value = window.sessionStorage.getItem(key);
    return tryParseJSON(value);
}
const setSessionItem = (key, value) => {
    if(key){
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }
}

export default {
    getSessionItem,
    setSessionItem
}

export {
    getSessionItem,
    setSessionItem
}