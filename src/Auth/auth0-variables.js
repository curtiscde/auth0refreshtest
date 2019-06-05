const dev = {
  domain: 'pirefreshtest.eu.auth0.com',
  clientID: 'rwQDKKkc0qK2ukr953I3jgxAM4HcZTht',
  callbackUrl: 'http://localhost:3000/callback',
  audience: 'https://refreshtest.com',
}

const prod = {
  domain: 'pirefreshtest.eu.auth0.com',
  clientID: 'rwQDKKkc0qK2ukr953I3jgxAM4HcZTht',
  callbackUrl: 'https://auth0refreshtest.netlify.com/callback',
  audience: 'https://refreshtest.com',
}

export const AUTH_CONFIG = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;