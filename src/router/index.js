/* 路由配置文件 index.js */


import { createWebHistory, createRouter } from 'vue-router'
import store from '../store'

// 定义路由配置
const routes = [
    { path: '/', redirect: '/main/indexhome' },
    { path: '/main', redirect: '/main/indexhome' },
    {
        path: '/main',
        name: 'Main',
        component: () => import('@/views/USER/Main/Main.vue'),
        children: [
            { path: 'indexhome', component: () => import('@/views/USER/IndexHome/IndexHome.vue') },
            { path: 'readarticle/:id', component: () => import('@/views/USER/ReadArticle/ReadArticle.vue') },
            { path: 'guidang', component: () => import('@/views/USER/GuiDang/GuiDang.vue') },
            { path: 'aboutme', component: () => import('@/views/USER/AboutMe/AboutMe.vue') },
        ]
    },
    // 管理员后台路由
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/SYS/AdminLayout.vue'),
        meta: { requiresAdmin: true },  // 需要管理员权限
        children: [
            { path: '', redirect: '/admin/dashboard' },
            { path: 'dashboard', component: () => import('@/views/SYS/Dashboard.vue'), meta: { requiresAdmin: true } },
            { path: 'articles', component: () => import('@/views/SYS/Articles.vue'), meta: { requiresAdmin: true } },
            { path: 'editor', component: () => import('@/views/Editor/editor.vue'), meta: { requiresAdmin: true } },
            { path: 'editor/:id', component: () => import('@/views/Editor/editor.vue'), meta: { requiresAdmin: true } },
            { path: 'tags', component: () => import('@/views/SYS/Tags.vue'), meta: { requiresAdmin: true } },
            { path: 'users', component: () => import('@/views/SYS/Users.vue'), meta: { requiresAdmin: true } },
            { path: 'settings', component: () => import('@/views/SYS/Settings.vue'), meta: { requiresAdmin: true } },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register/register.vue')
    },
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),    // 导航历史记录模式
    routes
})

// 路由守卫 - 权限验证
router.beforeEach((to, _from, next) => {
  // 检查目标路由是否需要管理员权限
  if (to.meta.requiresAdmin) {
    // 检查是否已登录且为管理员
    if (store.getters['user/isLoggedIn'] && store.getters['user/isAdmin']) {
      next()  // 允许访问
    } else {
      // 未登录或非管理员，跳转到登录页
      next('/login')
    }
  } else {
    next()  // 不需要权限验证的路由直接放行
  }
})

// 导出实例
export default router