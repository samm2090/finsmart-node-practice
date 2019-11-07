const express = require('express');

//initialization
const app = express();

//settings
app.set('port', process.env.port || 8080)

//middlewares
app.use(express.json());

//routes
app.use(require('./routes/clients.js'));
app.use(require('./routes/users.js'));

//start Server
app.listen(app.get('port'), ()=>{
  console.log('Server on: ', app.get('port'));
});
