import { createRouter, createWebHistory } from 'vue-router'
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
    path: '/aggregate-keys',
    name: 'aggregate-keys',
    component: () => import(/* webpackChunkName: "aggregate-keys" */ '../views/AggregateKeyView.vue')
  },
  {
    path: '/aggregate-sigs',
    name: 'aggregate-sigs',
    component: () => import(/* webpackChunkName: "aggregate-sigs" */ '../views/AggregateSigView.vue')
  },

  {
    path: '/verify',
    name: 'verify',
    component: () => import(/* webpackChunkName: "verify" */ '../views/VerifyView.vue')
  },
  {
    path: '/verify-group',
    name: 'verify-group',
    component: () => import(/* webpackChunkName: "verify-group" */ '../views/VerifyGroup.vue')
  },
  {
    path: '/create-group',
    name: 'create-group',
    component: () => import(/* webpackChunkName: "create-group" */ '../views/CreateGroupView.vue')
  },
  {
    path: '/lobby',
    name: 'lobby',
    component: () => import(/* webpackChunkName: "lobby" */ '../views/LobbyView.vue')
  },
  {
    path: '/j',
    name: 'join',
    component: () => import(/* webpackChunkName: "lobby" */ '../views/JoinView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
