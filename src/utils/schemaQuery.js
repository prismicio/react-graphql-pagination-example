/* eslint-disable no-console */
const fetch = require('node-fetch');
const fs = require('fs');

const repoId = 'prismic-pagination-demo';

fetch(`https://${repoId}.cdn.prismic.io/api`)
  .then((r) => r.json())
  .then((data) => {
    const ref = data.refs.find((r) => r.id === 'master');
    if (!ref) return;
    fetch(
      `https://${repoId}.cdn.prismic.io/graphql?query=%7B%20__schema%20%7B%20types%20%7B%20kind%20name%20possibleTypes%20%7B%20name%20%7D%20%7D%20%7D%20%7D`,
      {
        headers: {
          'prismic-ref': ref.ref,
        },
      },
    )
      .then((result) => result.json())
      .then((result) => {
        const filteredResults = result;
        const filteredData = result.data.__schema.types.filter(
          (type) => type.possibleTypes !== null,
        );
        filteredResults.data.__schema.types = filteredData;
        fs.writeFileSync('./src/utils/fragmentTypes.json', JSON.stringify(filteredResults.data), (err) => {
          if (err) {
            console.error('Error writing fragmentTypes file', err);
          } else {
            console.log('Fragment types successfully extracted!');
          }
        });
      });
  });
