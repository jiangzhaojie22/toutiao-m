import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
},
{
  path: '/',
  // name: 'layout',// 如果父路由有默认子路由,那它的name没有意义
  component: () => import('@/views/layout'),
  children: [{
    path: '',
    name: 'home',
    component: () => import('@/views/home')
  }, {
    path: '/qa',
    name: 'qa',
    component: () => import('@/views/qa')
  }, {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video')
  }, {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my')
  },]
},
{
  path: '/search',
  name: 'search',
  component: () => import('@/views/search')
},
{
  // 动态路由,接收文章id
  path: '/article/:articleId',
  name: 'article',
  component: () => import('@/views/article'),
  // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中,所有路由傳參都通過props映射組件之中更靈活,可維護性更好
  props:true 
},
{
  // 动态路由,接收文章id
  path: '/user-modify',
  name: 'user-modify',
  component: () => import('@/views/user-modify'),
},
]

const router = new VueRouter({
  routes
})

export default router
