const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const https = require('https');

const app = express();

let urls = [];

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.post('/', (req, res) => {

  const longLink = req.body.link;
  
  const url = 'https://api.shrtco.de/v2/shorten?url=' + longLink;
  
  https.get(url, (res) => {
    

    res.on('data', (data) => {
      const newUrlData = JSON.parse(data);
      let newUrl = newUrlData.result.full_short_link;
      urls.push(newUrl)
      
      console.log(urls);

    })
  })
  console.log(urls);
  res.redirect('/');
})



app.get('/', (req, res) => {
  res.render('home', {
    oui: urls
  })
})


app.listen(3000, function () {
  console.log("Server started on port 3000");
});