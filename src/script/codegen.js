const { join } = require('path');
const telescope = require('@osmonauts/telescope');

const protoDirs = [join(__dirname, '../proto')];
const outPath = join(__dirname, '../../src/codegen');

telescope
  .default({
    protoDirs,
    outPath,
    options: {
      prototypes: {
        methods: {
          fromJSON: true,
          toJSON: true,
        },
      },
      reactQuery: {
        enabled: true,
      },
    },
  })
  .then(() => {
    console.log('✨ all done!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
