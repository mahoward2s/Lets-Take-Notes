// Dependencies
const fs = require('fs');
const express = require('express');

// set up the express app
const app = express();
const PORT = process.env.PORT || 8080;

//set port








// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });