
let baseURL = '';

if(process.env.NODE_EVN === 'development'){
    baseURL = 'http://suggest.taobao.com/sug';
}else if(process.env.NODE_EVN === 'production'){
    baseURL = 'https://www.ceshi.com';
}else if (process.env.NODE_ENV == 'debug') {    
    baseURL = 'https://www.ceshi.com';
};

export default baseURL;