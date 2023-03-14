const express = require('express'); //input library express

const app = express();    //create server use express              //   
const bodyParser = require('body-parser')  //use parse
require('./redis');
global.appman = {};


port = process.env.PORT || 3000; //crete port


//console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./router/appRouter'); //import router
// routes(app); //register the route
app.use('/', routes)


app.listen(port, () => {
    console.log('server listening on port ', port)
}); // listen port