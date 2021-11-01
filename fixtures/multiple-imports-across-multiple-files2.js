export const test = (redirectUrl = '/') => import('user')
  .then(({logout}) => logout(redirectUrl))
