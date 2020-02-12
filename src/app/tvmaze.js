const axios = require('axios');

const API = 'http://api.tvmaze.com';
const showGeneralInfo = showName => {
  const url = `${API}/singlesearch/shows?q=${showName}`;

  return axios
    .get(url)
    .then(function(htmlString) {
      return htmlString;
    })
    .catch(function(err) {
      const { response } = err;
      console.error({ err }, 'AXIOS Error');
      return { response };
    });
};

const showEpisodeList = id => {
  const url = `${API}/shows/${id}/episodes`;

  return axios
    .get(url)
    .then(function(res) {
      return res;
    })
    .catch(function(err) {
      const { response } = err;
      console.error({ err }, 'AXIOS Error');
      return { response };
    });
};

module.exports = { showGeneralInfo, showEpisodeList };
