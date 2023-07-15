app.post('/proxy', (req, res) => {
  // Assuming the request body contains plain text data
  const textData = req.body;

  let jsonData;
  try {
    // Attempt to parse the plain text data as JSON
    jsonData = JSON.parse(textData);
  } catch (error) {
    console.error('Error parsing plain text data as JSON:', error);
    return res.sendStatus(400);
  }

  const headers = {
    'Content-Type': 'application/json'
  };

  axios.post('https://webhook.api.staging.flowcore.io/event/bergurdavidsen/b23f801d-76d4-49fa-a52e-711088c795cb/proxy-data/create?key=4b882a56-5922-4db3-ac8f-603d848c7aa8', jsonData, { headers })
    .then(response => {
      console.log('Data sent to webhook successfully');
      console.log(jsonData);

      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Error sending data to webhook:', error);
      res.sendStatus(500);
    });
});
