let journeyData = {};

const express = require('express');
const app = express();

var path = require('path')

var fetch = require('node-fetch')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

const port = 8080;
const server = app.listen(port, listening);
function listening() {
    //console.log("server running")
    console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/all', function (req, res) {
    res.sendFile('dist/index.html');
})

app.get('/test', async (request, response) => {
    response.json();
})

// POST route
app.post('/add', addData);

function addData(req, res) {
    journeyData['departing'] = req.body.departing;
    journeyData['arriving'] = req.body.arriving;
    journeyData['date'] = req.body.travelDate;
    journeyData['daysToTravel'] = req.body.daysToTravel;
    journeyData['weather'] = req.body.weather;
    res.send(journeyData);
}
