// {
//     <showId>: {
//       totalDurationSec: ... // Total duration of the show, across all episodes (seconds)
//       averageEpisodesPerSeason: ... // Average episodes per season, float with max one decimal (e.g. 5.3)
//       episodes: {
//         <episodeId>: {
//           sequenceNumber: s<X>e<Y> // Episode and season number, e.g. "s1e1"
//           shortTitle: ... // Title without "Chapter XXX:" prefix
//           airTimestamp: ... // Air timestamp in epoch time (seconds)
//           shortSummary: ... // First sentence of the summary, without HTML tags
//         },
//         ...
//       }
//     }
//   }

var moment = require('moment');

function reformatData(e) {
  const { show = [], episodes = [] } = e;
  const { id } = show;

  // removed any epside that has not aires
  const cleanEpisodes = episodes.filter(o => o.airstamp);
  // get the total runtime minutes for this serires
  const totalRuntime = cleanEpisodes.reduce((sum, o) => {
    const { runtime = 0 } = o;
    return (sum += runtime);
  }, 0);
  // get the seconds for the duration
  const totalDurationSec = totalRuntime * 60;

  // need the number of seasons to make the average epsiodes
  const totalSeasons = cleanEpisodes.reduce((sum, o) => {
    const { season = 0 } = o;
    return season > sum ? season : sum;
  }, 0);
  const totalEpisodes = cleanEpisodes.length;
  // round to witn a maximun of one decimal
  const averageEpisodesPerSeason =
    Math.round((totalEpisodes / totalSeasons) * 10) / 10;

  const reformatedEpisondes = cleanEpisodes.map(o => {
    const { season = 1, number = 1, name, airstamp, summary } = o;

    // clean up the summary, removed HTML tags
    const shortSummary = summary.replace(/<\/?[^>]+(>|$)/g, '');
    // clean up the Title without "Chapter XXX:" prefix
    const shortTitle = name.slice(name.indexOf(':') + 1).trim();
    return {
      sequenceNumber: `s${season}e${number}`,
      shortTitle,
      airTimestamp: moment(airstamp).format('X'),
      shortSummary,
    };
  });

  var res = {};
  res[id] = {
    totalDurationSec,
    averageEpisodesPerSeason,
    episodes: reformatedEpisondes,
  };

  return res;
}

module.exports = reformatData;
