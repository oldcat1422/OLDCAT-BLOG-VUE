/* 路由配置文件 index.js */


import { createWebHistory, createRouter } from 'vue-router'

// 定义路由配置
const routes = [
    { path: '/', redirect: '/main/indexhome' },
    { path: '/main', redirect: '/main/indexhome' },
    {
        path: '/main',
        name: 'Main',
        component: () => import('../views/Main/Main.vue'),
        children: [
            { path: 'indexhome', component: () => import('../views/IndexHome/IndexHome.vue') },
        ]
    },
    {
        path: '/bac',
        name: 'Bac',
        component: () => import('../views/Bac/Bac.vue'),
        children: [
            { path: '', redirect: '/bac/dashboard' },
            { path: 'dashboard', component: () => import('../views/Dashboard/Dashboard.vue') },
            { path: 'editor', component: () => import('../views/Editor/editor.vue') },
            { path: 'tag', component: () => import('../views/Tag/Tag.vue') },
            { path: 'articlesetting', component: () => import('../views/ArticleSetting/ArticleSetting.vue') },
            { path: 'recycle', component: () => import('../views/Recycle/Recycle.vue') },
        ]
    },
    // {
    //     path: '/editor',
    //     name: 'Editor',
    //     component: () => import('../views/Editor/editor.vue')
    // },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register/register.vue')
    },
    {
        path: '/readarticle',
        name: 'ReadArticle',
        component: () => import('../views/ReadArticle/ReadArticle.vue')
    },
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),    // 导航历史记录模式
    routes
})


// 导出实例
export default router