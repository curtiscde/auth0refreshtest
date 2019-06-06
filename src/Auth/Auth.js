import history from '../history';
import auth0 from 'auth0-js';
import axios from 'axios';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'code',
    scope: 'openid offline_access',
    audience: AUTH_CONFIG.audience,
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(code) {

    axios.post(`https://${AUTH_CONFIG.domain}/oauth/token`, {
      grant_type: 'authorization_code',
      client_id: AUTH_CONFIG.clientID,
      // client_secret: AUTH_CLIENT_SECRET,
      code: code,
      redirect_uri: AUTH_CONFIG.callbackUrl,
    }).then(res => {
      const expiresAt = JSON.stringify((res.data.expires_in * 1000) + new Date().getTime());

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('refreshToken', res.data.refresh_token);
      localStorage.setItem('expiresAt', expiresAt);
      localStorage.setItem('accessToken', res.data.access_token);

      history.replace('/home');

    });
  }

  logout() {
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    return localStorage.getItem('isLoggedIn');
  }

  refreshAccessToken() {

    return new Promise((resolve, reject) => {
      axios.post(`https://${AUTH_CONFIG.domain}/oauth/token`, {
        grant_type: 'refresh_token',
        client_id: AUTH_CONFIG.clientID,
        refresh_token: localStorage.getItem('refreshToken')
      }).then(res => {
        console.log('Refresh attempt successful');
  
        const expiresAt = JSON.stringify((res.data.expires_in * 1000) + new Date().getTime());
  
        localStorage.setItem('expiresAt', expiresAt);
        localStorage.setItem('accessToken', res.data.access_token);
  
        console.log('New expiry = ', new Date(parseInt(expiresAt,10)));

        resolve();
      });
  
    });

  }

}