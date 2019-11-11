const express = require('express');
const cors = require('cors');

//initialization
const app = express();

//settings
app.set('port', process.env.port || 8080)

//middlewares
app.use(express.json());
app.use(cors());
app.options('*', cors());


//routes
app.use(require('./routes/clients.js'));
app.use(require('./routes/users.js'));

//start Server
app.listen(app.get('port'), () => {
  console.log('Server on: ', app.get('port'));
});
