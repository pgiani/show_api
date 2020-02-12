var fs = require('fs').promises;
const { showGeneralInfo, showEpisodeList } = require('./tvmaze');

async function getShow(name) {
  try {
    let episodes = {};
    const mainShowInfo = await showGeneralInfo(name);
    // get the show ID and check the API call status for a 200 sucess
    const { data = {}, status = 404 } = mainShowInfo;
    const { id } = data;
    if (status === 200 && id) {
      // get ALL the episodes for this show ID
      episodes = await showEpisodeList(id);

      await fs.writeFile(
        `./src/___tests___/__mockData__/${name}.json`,
        JSON.stringify(data, null, '\t'),
      );
      await fs.writeFile(
        `./src/___tests___/__mockData__/${id}.json`,
        JSON.stringify(episodes.data, null, '\t'),
      );
    }
  } catch (err) {
    console.error(err);
    return;
  }
}

module.exports = getShow;
