var express = require('express');
var app = express();
const axios = require('axios').default;
const listServers = ['http://localhost:3001', 'http://localhost:3002'];
var index = 0;
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    axios.get(listServers[index])
        .then(function (response) {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
            res.send(error);
        })
    changeServer();    
});

function changeServer() {
    if(index == 0) {
        index = 1
    } else {
        index = 0;
    }
}

app.post('/', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
}) 

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

