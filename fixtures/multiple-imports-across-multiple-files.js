export * from './multiple-imports-across-multiple-files2.js';

export const test = (redirectUrl = '/') => import('user')
  .then(({logout}) => logout(redirectUrl))
