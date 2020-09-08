import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/recommend',
        name: 'firstShow',
        component: () => import('@/views/Recommend')
      },
      {
        path: '/song-list',
        component: () => import('@/views/SongList')
      },
      {
        path: '/rank',
        component: () => import('@/views/Rank')
      },
      {
        path: '/singers',
        component: () => import('@/views/Singers')
      },
      {
        path: '/latest-music',
        component: () => import('@/views/Latest')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
