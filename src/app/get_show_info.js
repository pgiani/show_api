const request = require('request-promise');

async function getShow(name) {
  console.log(name);
  try {
    const mainShowInfo = await showGeneralInfo(name);
    const { id } = mainShowInfo;
    if (id) {
      const episodes = await showEpisodeList(id);
      console.log(episodes);
    } else {
      return { id: -1, type: 'Error' };
    }

    return mainShowInfo;
  } catch (err) {
    console.error(err); // TypeError: failed to fetch

    return { id: -1, type: 'Error' };
  }
}

module.exports = getShow;

const showGeneralInfo = showName => {
  const uri = `http://api.tvmaze.com/singlesearch/shows?q=${showName}`;

  return request({ uri, json: true })
    .then(function(htmlString) {
      return htmlString;
    })
    .catch(function(err) {
      console.error(err);
      return {};
    });
};

const showEpisodeList = id => {
  const uri = `http://api.tvmaze.com/shows/${id}/episodes`;

  return request({ uri, json: true })
    .then(function(htmlString) {
      return htmlString;
    })
    .catch(function(err) {
      console.error(err);
      return {};
    });
};
