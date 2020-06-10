import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/main',
        children: [
            {
                path: 'main',
                name: 'Main',
                component: () => import('@/views/main/index'),
                meta: { title: 'Main', icon: 'main' },
            },
            {
                path: 'library',
                name: 'Library',
                component: () => import('@/views/library/index'),
                meta: { title: 'Library', icon: 'library' },
            },
            {
                path: 'myBooks',
                name: 'MyBooks',
                component: () => import('@/views/myBooks/index'),
                meta: { title: 'MyBooks', icon: 'myBooks' },
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
    }
]

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes,
    })

const router = createRouter()

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const accessToken  =  localStorage.getItem('access_token')
    const user = localStorage.getItem('user');
  
    if (authRequired && !user) {
      return next('/login');
    }
    if (accessToken) {
        Vue.prototype.$http.defaults.headers.common['Authorization'] =  user.Token
    }
  
    next();
  })


export default router