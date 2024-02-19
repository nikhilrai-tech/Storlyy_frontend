import {createRouter,createWebHistory} from 'vue-router'
import HomeSome from './components/HomeSome.vue'
import AboutSome from './components/AboutSome.vue'
import DashBoard from './components/DashBoard.vue'



const routes = [
    {
        name : "HomeSome",
        component:HomeSome,
        path : '/'
    },
    {
        name : "AboutSome",
        component:AboutSome,
        path : '/login',
    },
    {
        name : "HelloWorld",
        component:DashBoard,
        path : '/dashboard'
        
    }
]

const router  = createRouter({
    history : createWebHistory(),
    routes
})

export default router