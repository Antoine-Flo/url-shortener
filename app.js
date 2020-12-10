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

app.post('/', (req, res) => {

  let longLink = req.body.link;
  
  let url = 'https://api.shrtco.de/v2/shorten?url=' + longLink;

  console.log(url);
  
  https.get(url, (res) => {
    
    console.log(res);

    res.on('data', (data) => {
      
      console.log(data);
    })


  })

})


app.get('/', (req, res) => {
  res.render('home')
})


app.listen(3000, function () {
  console.log("Server started on port 3000");
});