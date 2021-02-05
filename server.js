// Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');

// set up the express app
const app = express();

//set port
const PORT = process.env.PORT || 8080;

  // Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require('./routes/APIRoutes')(app);
require('./routes/HTMLRoutes')(app);

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
