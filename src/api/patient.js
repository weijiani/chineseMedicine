import request from '@/utils/request'
const url = 'http://localhost:3000'

export function makeAnAppointment(data) {
  return request({
    url: `${url}/patient/appointment`,
    method: 'post',
    data
  })
}

export function getDepOfDoctor(data) {
  return request({
    url: `${url}/doctor/getDepOfDoctor`,
    method: 'post',
    data
  })
}

export function getPayRecordList(data) {
  return request({
    url: `${url}/patient/getPayRecordList`,
    method: 'post',
    data
  })
}

export function getAppointRecordList(data) {
  return request({
    url: `${url}/patient/getAppointRecordList`,
    method: 'post',
    data
  })
}
export function cancelAppoint(data) {
  return request({
    url: `${url}/patient/cancelAppoint`,
    method: 'post',
    data
  })
}
export function getMedicinePayList(data) {
  return request({
    url: `${url}/getMedicalPay`,
    method: 'post',
    data
  })
}
export function postPayRecord(data) {
  return request({
    url: `${url}/patient/postPayRecord`,
    method: 'post',
    data
  })
}

export function deleMedicalPay(data) {
  return request({
    url: `${url}/deleMedicalPay`,
    method: 'post',
    data
  })
}

export function postUserDetail(data) {
  return request({
    url: `${url}/users/postUserDetail`,
    method: 'post',
    data
  })
}
export function getUserDetail(data) {
  return request({
    url: `${url}/users/getUserDetail`,
    method: 'post',
    data
  })
}