import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Home extends Component {
  login() {
    this.props.auth.login();
  }

  callApi(){
    console.log('Call API Request made');

    const expiresAt = parseInt(localStorage.getItem('expiresAt'), 10);
    const now = new Date().getTime();

    console.log('Check Access Token expiry - ', new Date(expiresAt));
    
    const tokenExpired = now > expiresAt;

    console.log('Token Expired = ', tokenExpired);

    if (!tokenExpired){
      console.log('Token seconds left = ', (expiresAt - now)/1000);
      this.apiRequest();
    }
    else {
      console.log('Token expired so attempt refresh');

      this.props.auth.refreshAccessToken().then(() => {
        this.apiRequest();
      });

    }
    
  }

  apiRequest() {
    console.log('Make API Call with Access Token...');
    console.log(localStorage.getItem('accessToken'));
  }



  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <div>
                <h4>
                  You are logged in!
                </h4>
                <Button onClick={this.callApi.bind(this)}>Call API</Button>
              </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}>
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
