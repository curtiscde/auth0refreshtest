function (user, context, callback) {
  
  context.accessToken['https://ruletest.com/ghn'] = user.app_metadata.ghn;
  
  request.get(`https://pokeapi.co/api/v2/pokemon/${user.app_metadata.ghn}`, (err, resp, body) => {    
    context.accessToken['https://ruletest.com/name'] = JSON.parse(body).name;
    callback(null, user, context);    
  });


}