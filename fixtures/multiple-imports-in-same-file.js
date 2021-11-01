const onLogout = (redirectUrl = '/') => import('user')
  .then(({logout}) => logout(redirectUrl))
const onLogout2 = (redirectUrl = '/') => import('user')
  .then(({logout}) => logout(redirectUrl))
