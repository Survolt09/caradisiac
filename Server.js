
////////////////////////////////////////
//             Server.js              //
////////////////////////////////////////


var app = require('./App');
var port = 9292;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
