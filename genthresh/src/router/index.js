import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/generate',
    name: 'generate',
    component: () => import(/* webpackChunkName: "generate" */ '../views/GenerateView.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import(/* webpackChunkName: "sign" */ '../views/SignView.vue')
  },
  {
    path: '/group-sign',
    name: 'group-sign',
    component: () => import(/* webpackChunkName: "group-sign" */ '../views/GroupSignView.vue')
  },
  {
    path: '/aggregate',
    name: 'aggregate',
    component: () => import(/* webpackChunkName: "aggregate" */ '../views/AggregateView.vue')
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import(/* webpackChunkName: "verify" */ '../views/VerifyView.vue')
  },



]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
