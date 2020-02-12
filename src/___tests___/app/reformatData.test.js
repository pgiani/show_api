const fs = require('fs').promises;
const reformatData = require('../../app/reformat');

async function getData() {
  const show = await fs.readFile(
    './src/___tests___/__mockData__/stranger-things.json',
    'utf8',
  );
  const episodes = await fs.readFile(
    './src/___tests___/__mockData__/2993.json',
    'utf8',
  );

  return { show: JSON.parse(show), episodes: JSON.parse(episodes) };
}

function getEpsisodeData(all) {
  return all[Object.keys(all)[0]];
}

test('Has ShowID ', async () => {
  const { show } = await getData();
  const { id } = show;
  expect(id).toBe(2993);
});

test('reformatData - ID  ', async () => {
  const { show, episodes } = await getData();
  const data = reformatData({ show, episodes });
  const keys = Object.keys(data);
  expect(keys[0]).toBe('2993');
});

test('reformatData - Total duration  ', async () => {
  const { show, episodes } = await getData();
  const data = getEpsisodeData(reformatData({ show, episodes }));

  const { totalDurationSec } = data;
  expect(totalDurationSec).toEqual(88140);
});

test('reformatData - average epsisode ', async () => {
  const { show, episodes } = await getData();
  const all = reformatData({ show, episodes });
  const data = all[Object.keys(all)[0]];
  const { averageEpisodesPerSeason } = data;
  expect(averageEpisodesPerSeason).toEqual(8.3);
});

// check to see if  Episode and season number, e.g. "s1e1" are reforamted correctly
test('reformatData - Episode and season number', async () => {
  const { show, episodes } = await getData();
  const data = getEpsisodeData(reformatData({ show, episodes }));
  const { episodes: Episodes } = data;
  const firstEp = Episodes[Object.keys(Episodes)[0]];
  const { sequenceNumber } = firstEp;

  expect(sequenceNumber).toMatch(/s(\d\d?)e(\d\d?)/);
});

// check to see if we reformated the Title without "Chapter XXX:" prefix
test('reformatData - shortTitle', async () => {
  const { show, episodes } = await getData();
  const data = getEpsisodeData(reformatData({ show, episodes }));
  const { episodes: Episodes } = data;
  const firstEp = Episodes[Object.keys(Episodes)[0]];
  const { shortTitle } = firstEp;

  var test = shortTitle.includes('Chapter');
  expect(test).toBeFalsy();
});

// check to see if we reformated the airstamp into epoch time
test('reformatData - shortTitle', async () => {
  const { show, episodes } = await getData();
  const data = getEpsisodeData(reformatData({ show, episodes }));
  const { episodes: Episodes } = data;
  const firstEp = Episodes[Object.keys(Episodes)[0]];
  const { airTimestamp } = firstEp;

  // make sure the number and the string are the same
  //a  date time string  will fail here exemple 2016-07-15T12:00:00+00:00
  expect(parseInt(airTimestamp) == parseInt(airTimestamp)).toBeTruthy();
  // make sure the time stap is greates then 1
  expect(parseInt(airTimestamp)).toBeGreaterThan(1);
});

// check to see if we have any HTML tags
test('reformatData - shortSummary', async () => {
  const { show, episodes } = await getData();
  const data = getEpsisodeData(reformatData({ show, episodes }));
  const { episodes: Episodes } = data;
  const firstEp = Episodes[Object.keys(Episodes)[0]];
  const { shortSummary } = firstEp;

  expect(shortSummary).not.toMatch(/<\/?[^>]+(>|$)/g);
});

//  get theses test done
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
