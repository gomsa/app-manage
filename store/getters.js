const getters = {
  oauthProvider: state => state.config.oauthProvider,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  mobile: state => state.user.mobile,
  name: state => state.user.name,
  roles: state => state.user.roles,
}
export default getters
