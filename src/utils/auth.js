import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRole() {
  return Cookies.get('role')
}

export function setRole(role) {
  return Cookies.set('role', role)
}

export function removeRole() {
  return Cookies.remove('role')
}

export function getAvatar() {
  return Cookies.get('avatar')
}

export function setAvatar(avatar) {
  return Cookies.set('avatar', avatar)
}

export function removeAvatar() {
  return Cookies.remove('avatar')
}

export function getUserName() {
  return Cookies.get('username')
}

export function setUserName(username) {
  return Cookies.set('username', username)
}

export function removeUserName() {
  return Cookies.remove('username')
}
