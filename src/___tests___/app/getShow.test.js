const fs = require('fs').promises;
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const getShow = require('../../app/get_show_info');

test('get show stranger-things', async () => {
  var mock = new MockAdapter(axios);

  const data = await fs.readFile(
    './src/___tests___/__mockData__/stranger-things.json',
    'utf8',
  );
  const dataEspisodes = await fs.readFile(
    './src/___tests___/__mockData__/2993.json',
    'utf8',
  );

  mock
    .onGet('http://api.tvmaze.com/singlesearch/shows?q=stranger-things')
    .reply(200, JSON.parse(data));
  mock
    .onGet('http://api.tvmaze.com/shows/2993/episodes')
    .reply(200, JSON.parse(dataEspisodes));

  const result = await getShow('stranger-things');
  console.log(result);
  //  expect(result).toEqual(2993);
});
