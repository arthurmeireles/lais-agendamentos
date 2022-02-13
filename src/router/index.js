import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/views/login';
import Cadastro  from '../components/views/cadastro';
import PortalTransparencia  from '../components/views/portalTransparencia';
import PaginaInicial from '../components/views/paginaInicial'
import Agendar from '../components/views/agendar'
Vue.use(Router)
const routes = [
    { 
        path: '', 
        name: 'paginaInicial', 
        component: PaginaInicial
    },
    {
        path: '/login', name: 'login', component: login,
        meta: {
            title: 'Sejá Bem-vindo!'
        }
    },
    {
        path: '/cadastro', name: 'Cadastro', component: Cadastro,
        meta: {
            title: "Cadastre-se aqui!"
        }
    },
    {
        path: '/agendar', name: 'Agendar', component: Agendar,
        meta: {
            title: "Agendar"
        }
    },


    {
        path: '/transparencia', name: 'portalTransparencia', component: PortalTransparencia,
        meta: {
            title: "Transparencia!"
        }
    },
    {
        path: '/logout', name: 'logout'
    },
];
const router = new Router({ routes, mode: 'history' })
export default router;