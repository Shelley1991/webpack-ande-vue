import HelloWorld from '../../view/welcome';
import shopList from '../../view/shoplist';

const routes = [
    {
        path:'/',
        name:'HelloWorld',
        component:HelloWorld,
        
    },
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld,
    },
    {
        path: '/shopList',
        name: 'shopList',
        component: shopList,
    }
]

export default routes;


    