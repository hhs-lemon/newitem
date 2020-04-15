import Cookies from 'js-cookie'
import { http } from '../util/http'
import qs from 'querystring'
import { configs } from '../util/config'
import store from '@/store'

const menus = [
  {
    text: '团队管理',
    children: [
      {
        text: '团队成员',
        path: '/team-members',
        icon: 'group'
      }
    ]
  },
  {
    text: '统计报表',
    children: [
      {
        text: '数据总览',
        path: '/general-report',
        icon: 'pie_chart'
      },
      {
        text: '代理报表',
        path: '/agent-report',
        icon: 'table_chart'
      },
      {
        text: '日报表',
        path: '/daily-report',
        icon: 'trending_up'
      }
    ]
  },
  {
    text: '交易查询',
    children: [
      {
        text: '充值订单',
        path: '/recharge-orders',
        icon: 'monetization_on'
      },
      {
        text: '提现订单',
        path: '/withdraw-orders',
        icon: 'payment'
      }
    ]
  },
  {
    text: '投注记录',
    children: [
      {
        text: '彩票乐透',
        path: '/lottery-bets',
        icon: 'star_half'
      },
      {
        text: '体育竞猜',
        path: '/sport-bets',
        icon: 'pool'
      },
      {
        text: '真人电子',
        path: '/live-bets',
        icon: 'videogame_asset'
      }
    ]
  }
]

const refs = {}
menus.forEach(m => (m.children.forEach(s => (refs[s.path] = s.text))))

export const menuTextRefs = refs

const permissions = {}

export const security = {
  authticated: !!Cookies.get('token'),
  subject: false,
  menus: [],
  // menus,
  permissions: [],
  authorized: false,
  login (account, password, valiCode) {
    const params = qs.stringify({account, password, valiCode})
    return new Promise(
      (resolve, reject) => http.post('api/v/user/login', params)
        .then((res) => {
          this.authenticated = true
          Cookies.set('token', res.data.token)
          store.commit('menus/SET_MENUS', menus)
          resolve(res)
        })
        .catch(error => reject(error))
    )
  },
  authorize () {
    return new Promise(
      (resolve, reject) => http.get('api/api/config/getAll')
        .then(response => {
          Object.assign(configs, response.data)
          return http.get('api/v/user/info')
        })
        .then(response => {
          this.authorized = true
          this.subject = response.data
          this.menus = [...menus]
          this.permissions = {...permissions}
          resolve()
        })
        .catch(error => reject(error))
    )
  },
  logout (remote = true) {
    const localLogout = () => {
      this.authenticated = false
      this.subject = false
      this.authorized = false
    }
    if (remote) {
      return new Promise(resolve => http.post('api/v/user/logout').finally(() => {
        Cookies.remove('token')
        localLogout()
        resolve()
      }))
    } else {
      Cookies.remove('token')
      localLogout()
      return Promise.resolve()
    }
  }
}
