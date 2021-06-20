import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '@/components/pages/Main.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Main
  }
]

const router = new VueRouter({
  routes
})

export default router
