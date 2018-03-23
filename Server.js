

const express        = require('express');
const elasticsearch  = require ('elasticsearch')
const bodyParser     = require('body-parser');
const app            = express();


const port = 8000;

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
