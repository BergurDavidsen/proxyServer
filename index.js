const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const flowcoreWeb = "https://webhook.api.staging.flowcore.io/event/bergurdavidsen/b23f801d-76d4-49fa-a52e-711088c795cb/proxy-data/create?key=4b882a56-5922-4db3-ac8f-603d848c7aa8";
const webhookSite = "https://webhook.site/4bb98beb-5393-4143-9e87-eb65c200d768";

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/proxy', express.text(), (req, res) => {
  const jsonData = JSON.parse(req.body);



  const headers = {
    'Content-Type': 'application/json'
  };

  axios.post(flowcoreWeb, jsonData, { headers })
    .then(response => {
      console.log('Data sent to webhook successfully');
      console.log(jsonData)

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
