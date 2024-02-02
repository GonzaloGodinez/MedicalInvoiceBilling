const db = require('../config/connection');
const { User, Provider } = require('../models');
const userSeeds = require('./userSeeds.json');
const providerSeeds = require('./providerSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Provider', 'providers');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < providerSeeds.length; i++) {
      const { _id, providerAuthor } = await Provider.create(providerSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: providerAuthor },
        {
          $addToSet: {
            providers: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
