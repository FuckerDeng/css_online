import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router"

const routes:RouteRecordRaw[] = [
    {
        path:"/",
        component:()=> import('@/pages/edit/CssEdit.vue')
    }
]

const router = createRouter({
    routes:routes,
    history:createWebHistory()
})

export default router;