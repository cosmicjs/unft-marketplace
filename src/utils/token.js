import { APP_KEY } from './constants/appConstants'

export const setToken = token => {
  if (token) {
    localStorage.setItem(APP_KEY, JSON.stringify(token))
  }
}

export const getToken = () => {
  const tokenLocalStorage = localStorage.getItem(`${APP_KEY}`)

  return tokenLocalStorage ? JSON.parse(tokenLocalStorage) : null
}

export const removeToken = () => {
  localStorage.removeItem(APP_KEY)
}
