const getters = {
  oauthProvider: state => state.config.oauthProvider,
  token: state => state.user.token,
  roles: state => state.user.roles,
}
export default getters
