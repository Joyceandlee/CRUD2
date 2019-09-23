import Login from '../views/Login';
import Index from '../views/Index';
import List from '../views/List';
import Work from '../views/Work';

export const routes = [{
    path: '/login',
    component: Login
}, {
    path: '/index',
    component: Index,
    beforeEnter(to, from, next) {
        let { token } = window.localStorage;
        if (token && token.split('.').length === 3) {
            next();
        } else {
            next('/login');
        }
    },
    children: [{
        path: '/index/list',
        component: List
    }, {
        path: '/index/work',
        component: Work
    }]
}, {
    path: '/',
    redirect: '/login'
}]

