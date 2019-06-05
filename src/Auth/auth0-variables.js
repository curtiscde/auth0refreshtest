const dev = {
  domain: 'ruletest.eu.auth0.com',
  clientID: '06ODevrf60QH8cYZ9ve6DkoboNIwcmBE',
  callbackUrl: 'http://localhost:3000/callback',
  audience: 'https://ruletest.com',
}

const prod = {
  domain: 'ruletest.eu.auth0.com',
  clientID: '06ODevrf60QH8cYZ9ve6DkoboNIwcmBE',
  callbackUrl: 'https://auth0rulestest.netlify.com/callback',
  audience: 'https://ruletest.com',
}

export const AUTH_CONFIG = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;