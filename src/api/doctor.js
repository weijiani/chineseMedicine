import request from '@/utils/request'
const url = 'http://localhost:3000'

export function getDragList(data) {
  return request({
    url: `${url}/doctor/getDragList`,
    method: 'post',
    data
  })
}

export function postMedicalRecord(data) {
  return request({
    url: `${url}/doctor/postMedicalRecord`,
    method: 'post',
    data
  })
}
export function postMedicalPay(data) {
  return request({
    url: `${url}/postMedicalPay`,
    method: 'post',
    data
  })
}

// postDragList
export function postDragList(data) {
  return request({
    url: `${url}/doctor/postDragList`,
    method: 'post',
    data
  })
}

export function deleteDrug(data) {
  return request({
    url: `${url}/doctor/deleteDrug`,
    method: 'post',
    data
  })
}
// uptateDrug

export function uptateDrug(data) {
  return request({
    url: `${url}/doctor/uptateDrug`,
    method: 'post',
    data
  })
}

export function getMedicalRecordList(data) {
  return request({
    url: `${url}/doctor/getMedicalRecordList`,
    method: 'post',
    data
  })
}