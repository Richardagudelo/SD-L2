var express = require('express');
var app = express();
const axios = require('axios').default;
const port = process.argv[2];

app.get('/', function (req, res) {
  log = { 
      host: req.headers.host,
      method: req.method,
      timestamp: new Date()
  }
  console.log(log);
  sendLogToM(log);
  res.send('Hello World from server port ' + port);
});

function sendLogToM (log) {
    axios.post('http://localhost:3000', log)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log('ERROR');
      });
}

app.listen(port, function () {
  console.log('Example app listening on port: ', port);
});


