import request from '@/utils/request'
const url = 'http://localhost:3000'

export function regist(data) {
  return request({
    url: `${url}/users/regist`,
    method: 'post',
    data
  })
}
export function login(data) {
  return request({
    url: `${url}/users/login`,
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
