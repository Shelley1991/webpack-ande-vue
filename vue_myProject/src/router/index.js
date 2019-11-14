import Vue from 'vue';
import Router from 'vue-router';
import mailRoutes from './mail_router/mail-router';

Vue.use(Router);

export default new Router({routes: mailRoutes});
