import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "./views/DashboardView.vue";
import ArticleView from "./views/ArticleView.vue"
import AdminLoginView from "./views/admin/AdminLoginView.vue"
import AdminPostView from "./views/admin/AdminPostView.vue"
import AdminEditView from "./views/admin/AdminEditView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: DashboardView
        },
        {
            path: '/article/:id',
            component: ArticleView
        },
        {
            path: '/admin/login',
            component: AdminLoginView
        },
        {
            path: '/admin/post',
            component: AdminPostView
        },
        {
            path: '/admin/edit/:id',
            component: AdminEditView
        }
    ]
})

export default router