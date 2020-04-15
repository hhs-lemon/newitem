import moment from 'moment'

moment.locale('cn', {
  week: {
    dow: 1
  }
})

export function getMoment () {
  return moment()
}

export function getPureUrl (url) {
  const idx = url.indexOf('?')
  return idx !== -1 ? url.substring(0, idx) : url
}

export function getToday (pattern) {
  return moment().format(pattern || 'YYYY-MM-DD')
}

export function getTodayStart () {
  return moment().startOf('d').format('YYYY-MM-DD HH:mm:ss')
}

export function getTodayEnd () {
  return moment().endOf('d').format('YYYY-MM-DD HH:mm:ss')
}

export function getYesterdayStart () {
  return moment().startOf('d').subtract(1, 'd').format('YYYY-MM-DD HH:mm:ss')
}

export function getYesterdayEnd () {
  return moment().endOf('d').subtract(1, 'd').format('YYYY-MM-DD HH:mm:ss')
}

export function isEmpty (str) {
  return str === undefined || str === null || str === ''
}
