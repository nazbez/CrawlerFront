import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home'
import TestResult from './pages/TestResult'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tests/:id',
    name: 'TestResult',
    component: TestResult
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router