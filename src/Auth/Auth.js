import history from '../history';
import auth0 from 'auth0-js';
import axios from 'axios';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

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
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(code) {

    axios.post(`https://${AUTH_CONFIG.domain}/oauth/token`, {
      grant_type: 'authorization_code',
      client_id: AUTH_CONFIG.clientID,
      client_secret: 'YnO6DAu4b8YH8xb0oZG9P99CWvIO9_lD83pXUhATs2Z8Ie_v0MSAZya4-BuVartS',
      code: code,
      redirect_uri: 'http://localhost:3000/callback',
    }).then(res => {
      const expiresAt = JSON.stringify((res.data.expires_in * 1000) + new Date().getTime());

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('refreshToken', res.data.refresh_token);
      localStorage.setItem('expiresAt', expiresAt);
      localStorage.setItem('accessToken', res.data.access_token);

      history.replace('/home');

    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    // let expiresAt = this.expiresAt;
    // return new Date().getTime() < expiresAt;
    return localStorage.getItem('isLoggedIn');
  }
}
