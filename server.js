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

  https.get(url, (response) => {

    console.log('Status Code : ' + response.statusCode)


    if (response.statusCode == 201) {
      response.on('data', (data) => {
        const newUrlData = JSON.parse(data);
        let bothUrl = {
          oldOne: longLink,
          newOne: newUrlData.result.full_short_link,
        }

        urls.push(bothUrl);

        res.redirect('/');
      })
    } else if (response.statusCode == 400) {

      urls = [];
      console.log(response.statusCode);
      res.redirect('/');
    }
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