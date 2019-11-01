import Vue from 'vue';

//自动加载global目录下的.js结尾的文件
const componentContext = require.context('./globalComponents',true,/\.js$/);

componentContext.keys().forEach(component=>{
    const componentConfig = componentsContext(component)
    /*
    *兼容import export 和require module.export 两种规范
    */
   const ctrl = componentConfig.default || componentConfig;
   Vue.component(ctrl.name , ctrl);
})