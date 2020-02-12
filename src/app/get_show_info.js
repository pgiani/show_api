const reformatData = require('./reformat');
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
    }

    return reformatData({ show: data, episodes: episodes.data });
  } catch (err) {
    console.error(err);
    return { id, status };
  }
}

module.exports = getShow;
