const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/proxy', express.text(), (req, res) => {
  const jsonData = JSON.parse(req.body);



  const headers = {
    'Content-Type': 'application/json'
  };

  axios.post('https://webhook.site/4bb98beb-5393-4143-9e87-eb65c200d768', jsonData, { headers })
    .then(response => {
      console.log('Data sent to webhook successfully');
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Error sending data to webhook:', error);
      res.sendStatus(500);
    });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
