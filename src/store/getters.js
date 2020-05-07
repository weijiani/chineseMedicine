const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  username: state => state.user.username,
  depName: state => state.patient.depName,
  doctorName: state => state.patient.doctorName,
  treatTime: state => state.patient.treatTime,
  doctorPay: state => state.patient.doctorPay
}
export default getters
