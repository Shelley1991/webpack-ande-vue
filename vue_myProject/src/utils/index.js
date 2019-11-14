// localstorage本地存储

let localstorage = {
    //存储
    set(key,value){
        localstorage.setItem(key,JSON.stringify(value));
    },

    get(key){
        return JSON.parse(localstorage.getItem(key));
    },

    remove(key){
        localstorage.removeItem(key)
    }
}

export default localstorage;
