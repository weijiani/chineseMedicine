import { 
  makeAnAppointment, 
  getDepOfDoctor, 
  getPayRecordList, 
  getAppointRecordList, 
  cancelAppoint,
  getMedicinePayList
 } from '@/api/patient'

const state = {
  depName: undefined,
  doctorName: undefined,
  treatTime: undefined,
  doctorPay: undefined
}

const mutations = {
  setDepName: (state, depName) => {
    state.depName = depName
  },
  setDoctorNameAndPay: (state, payload) => {
    state.doctorName = payload.doctorName
    state.doctorPay = payload.pay
  },
  setTreatTime: (state, treatTime) => {
    state.treatTime = treatTime
  }
}

const actions = {
  makeAnAppointment({ commit }, appointmentInfo) {
    return new Promise((resolve, reject) => {
      makeAnAppointment(appointmentInfo).then(response => {
          resolve(response.data)
      }).catch(error => {
        console.log('makeAnAppointment', error)
        reject(error)
      })
    })
  },
  getDepOfDoctor({ commit }, doctorName) {
    return new Promise((resolve, reject) => {
      getDepOfDoctor({ name: doctorName }).then(response => {
        resolve(response.data[0])
      }).catch(error => {
        console.log('getDepOfDoctor', error)
        reject(error)
      })
    })
  },
  getPayRecordList({ commit }, username) {
    return new Promise((resolve, reject) => {
      getPayRecordList({ username: username }).then(response => {
        resolve(response.data)
      }).catch(error => {
        console.log('getPayRecordList', error)
        reject(error)
      })
    })
  },
  getAppointRecordList({ commit }, username) {
    return new Promise((resolve, reject) => {
      getAppointRecordList({ username: username }).then(response => {
        resolve(response.data)
      }).catch(error => {
        console.log('getAppointRecordList', error)
        reject(error)
      })
    })
  },
  cancelAppoint({ commit }, data) {
    return new Promise((resolve, reject) => {
      cancelAppoint(data).then(response => {
        resolve(response.data)
      }).catch(error => {
        console.log('cancelAppoint', error)
        reject(error)
      })
    })
  },
  getMedicinePayList({ commit }, username) {
    return new Promise((resolve, reject) => {
      getMedicinePayList({ payUsername: username }).then(response => {
        resolve(response.data)
      }).catch(error => {
        console.log('getAppointRecordList', error)
        reject(error)
      })
    })
  }
  
  

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

