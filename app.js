const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const https = require('https');

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));


app.post('/', function (req, res) {

  const [data, value] = req.body.shorten;
  const url = 'https://api.shrtco.de/v2/shorten?url=' + data;


  https.get(url, (res) => {


    res.on("data", function (data) {
      const newUrlData = JSON.parse(data);
      newUrl = newUrlData.result.short_link;
      console.log(newUrl);
    })
  })
  res.redirect('/');

})


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})


app.listen(3000, function () {
  console.log("Server started on port 3000");
});