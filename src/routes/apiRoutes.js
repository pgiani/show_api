const getShow = require('../app/get_show_info');
const savedShow = require('../app/save_show_info.js');
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

    res.json(data);
  });

  // API GET Requests
  // this API point will save show data from the API to a file
  // the purpose of this endpoint is to save data for testing
  // ---------------------------------------------------------------------------

  app.get('/api/saveShow', async function(req, res) {
    // get the show name from the query parameter
    const { query = {} } = req;
    const { name } = query;

    const data = await savedShow(name);

    res.json({ status: 'ok' });
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
};
