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
        component: () => import('@/views/Home/Recommend')
      },
      {
        path: '/song-list',
        component: () => import('@/views/Home/SongList')
      },
      {
        path: '/rank',
        component: () => import('@/views/Home/Rank')
      },
      {
        path: '/singers',
        component: () => import('@/views/Home/Singers')
      },
      {
        path: '/latest-music',
        component: () => import('@/views/Home/Latest')
      },
      {
        path: '/playlist',
        props: { id: true },
        component: () => import('@/views/PlayList/PlayList')
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
