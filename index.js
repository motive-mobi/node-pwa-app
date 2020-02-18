const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

var app = express();

app.engine('ejs', require('ejs').renderFile);
app.set('views',__dirname+'/views');

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
  axios.get("https://www.eventbrite.com.br/d/brazil--americana/all-events/")
    .then(function (response) {
      const $ = cheerio.load(response.data);
      let result = $('body > script:nth-child(6)').html();

      return result;
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(function(result) {
      //console.log('result - ',typeof(result));

      //CONVERTE O RESULTADO PARA OBJETO JSON
      let jsonResult = JSON.parse(result);

      //ACESSA OS VALORES DO PRIMEIRO VALOR DO OBJETO
      let events = Object.values(jsonResult);
      //console.log(events);

      //PASSANDO OS DADOS PARA A VIEW
      res.render('./events.ejs', { events:events });
    });
});

  app.listen(3000, function(){
    console.log('App listen on port 3000');
  });
