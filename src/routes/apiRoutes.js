// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const tableData = require('../data/tableData');
const getShow = require('../app/get_show_info');

// ===============================================================================
// API ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when the api end point name "show" is called.
  // ---------------------------------------------------------------------------

  app.get('/api/show', async function(req, res) {
    // get the show name from the query parameter
    const { query = {} } = req;
    const { name } = query;

    const data = await getShow(name);
    console.log(data);
    res.json(tableData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
};
