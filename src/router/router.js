import Vue from 'vue'
import Router from 'vue-router'
import { menuTextRefs, security } from './security'

import Cookies from 'js-cookie'

import Login from '@/views/login/Login'
import Layout from '../components/layout/Layout'
import { getPureUrl } from '../util/fns'

Vue.use(Router)

const children = [
  {
    path: 'team-members',
    component: () => import('@/views/team/TeamMembers.vue')
  },
  {
    path: 'general-report',
    component: () => import('@/views/report/GeneralReport.vue')
  },
  {
    path: 'agent-report',
    component: () => import('@/views/report/AgentReport.vue')
  },
  {
    path: 'daily-report',
    component: () => import('@/views/report/DailyReport.vue')
  },
  {
    path: 'recharge-orders',
    component: () => import('@/views/finance/RechargeOrders.vue')
  },
  {
    path: 'withdraw-orders',
    component: () => import('@/views/finance/WithdrawOrders.vue')
  },
  {
    path: 'lottery-bets',
    component: () => import('@/views/bet/LotteryBets.vue')
  },
  {
    path: 'live-bets',
    component: () => import('@/views/bet/LiveBets.vue')
  },
  {
    path: 'sport-bets',
    component: () => import('@/views/bet/SportBets.vue')
  },
  {
    path: '*',
    component: () => import('@/views/NotFound.vue')
  }
]

const mainTitle = document.title

children.forEach(r => (r.beforeEnter = (to, from, next) => {
  document.title = `${menuTextRefs[to.path]} | ${mainTitle}`
  next()
}))

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      beforeEnter (to, from, next) {
        if (security.authenticated) {
          next('/')
        } else {
          document.title = `用户登录 | ${mainTitle}`
          next()
        }
      }
    },
    {
      path: '/',
      component: Layout,
      beforeEnter (to, from, next) {
        if (security.authenticated || Cookies.get('token')) {
          const path = to.path === '/' ? '/general-report' : undefined
          next(path)
          if (security.authorized) {
            next(path)
          } else {
            security.authorize().then(() => next(path)).catch(() => ({}))
          }
        } else {
          const nextUrl = getPureUrl(to.path)
          if (nextUrl === '/') {
            next('/login')
          } else {
            next({path: '/login', query: {next: nextUrl}})
          }
        }
      },
      children
    }
  ]
})



export default router
