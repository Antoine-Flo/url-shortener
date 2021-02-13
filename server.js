const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const axios = require('axios');

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


  axios.get(url)
    .then(function (response) {
      
        let bothUrl = {
          oldOne: longLink,
          newOne: response.data.result.full_short_link,
        }

        urls.push(bothUrl);
        res.redirect('/');

    })
    .catch(function (error) {
      console.log(error);
    })  
})



app.get('/', (req, res) => {
  res.render('home', {
    urls: urls
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port 3000");
});