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

  axios.post('https://webhook.api.staging.flowcore.io/event/bergurdavidsen/b23f801d-76d4-49fa-a52e-711088c795cb/test3/create?key=4b882a56-5922-4db3-ac8f-603d848c7aa8', jsonData, { headers })
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
