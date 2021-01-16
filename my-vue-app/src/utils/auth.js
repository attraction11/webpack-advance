import Cookies from 'js-cookie'
import localStorageKeys from '../constants/localStorageKeys'

const TokenKey = 'Admin-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// 是否需要确认密码
export function getPasswordConfirmed () {
  const expiredTime = 5 * 60 * 1000
  const passwordConfirmedTime = parseInt(localStorage.getItem(localStorageKeys.PASSWORD_CONFIRM_TIME)) || 0
  return Date.now() - passwordConfirmedTime < expiredTime
}

export function setPasswordConfirmed () {
  const expiredTime = 5 * 60 * 1000
  return Date.now() - localStorage.setItem(localStorageKeys.PASSWORD_CONFIRM_TIME, Date.now()) < expiredTime
}
