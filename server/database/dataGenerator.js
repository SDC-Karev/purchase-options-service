const faker = require('faker');
const fs = require('fs');

/*
// generates data for the following tables

  // bundles
    // bundle_id (int), bundle_name (varchar255), bundle_price (int), sale_id (int)
  // bundles_platforms
    // bundle_id (int), platform_id (int)
  // developers
    // dev_id (int), dev_name (varchar255), dev_found_date (date)
  // games
    // game_id (int), game_name (varchar255), game_price (int),
    game_banner (varchar255), game_release_date (date), dev_id (int), sale_id (int)
  // games_bundles
    // game_id (int), bundle_id (int)
  // games_platforms
    // game_id (int), platform_id (int)
  // platforms
    // platform_id (int), platform_name (varchar255),
     platform_class (varchar60), platform_icon(varchar255)
  // sales
    // sale_id (int), sale_name (varchar255), sale_amount(int),
     sale_start_date (date), sale_end_date (date)
  // tags
    // tag_id (int), tag_name (varchar255), tag_icon (varchar255)
  // tags_games
    // tag_id, game_id

// TARGETS:
  // 10,000,000 games
  // ~ 4,000,000 bundles
  // ~ 20,000 developers
  // 3 platforms
  // ~ 5,000,000 sales
  // ~ 20 tags

  // JOINS
    // ~ 8,000,000 bundles_platforms
    // ~ 13,000,000 games_bundles
    // ~ 25,000,000 games_platforms
    // ~ 30,000,000 tags_games

*/

const generateGames = (callback) => {
  console.log('Writing Games');
  let i = 1; // go to 10000000

  const wStream = fs.createWriteStream('games.csv', { flags: 'a' });
  // wStream.write('game_id,game_name,game_price,game_banner,game_release_date,dev_id,sale_id\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.game_name = faker.lorem.word();
      data.game_price = faker.finance.amount();
      data.game_banner = faker.image.imageUrl();
      data.game_release_date = faker.date.past();
      data.dev_id = (Math.floor(Math.random() * 20000) + 1);
      data.sale_id = (Math.floor(Math.random() * 5000000) + 1);

      if (i === 10000000) {
        wStream.write(`${i},${data.game_name},${data.game_price},${data.game_banner},${data.game_release_date.getFullYear()}-${data.game_release_date.getMonth() + 1}-${data.game_release_date.getDate()},${data.dev_id},${data.sale_id}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        if (i % 500000 === 0) {
          console.log(i);
        }
        ok = wStream.write(`${i},${data.game_name},${data.game_price},${data.game_banner},${data.game_release_date.getFullYear()}-${data.game_release_date.getMonth() + 1}-${data.game_release_date.getDate()},${data.dev_id},${data.sale_id}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 10000000 && ok);

    if (i <= 10000000) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

const generateDevelopers = (callback) => {
  console.log('Writing Developers');
  let i = 1;
  const wStream = fs.createWriteStream('developers.csv', { flags: 'a' });
  // wStream.write('dev_id,dev_name,dev_found_date\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.dev_name = faker.lorem.word();
      data.dev_found_date = faker.date.past();

      if (i === 20000) {
        wStream.write(`${i},${data.dev_name},${data.dev_found_date.getFullYear()}-${data.dev_found_date.getMonth() + 1}-${data.dev_found_date.getDate()}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        if (i % 1000 === 0) {
          console.log(i);
        }
        ok = wStream.write(`${i},${data.dev_name},${data.dev_found_date.getFullYear()}-${data.dev_found_date.getMonth() + 1}-${data.dev_found_date.getDate()}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 20000 && ok);

    if (i <= 20000) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

const generateBundles = (callback) => {
  console.log('Writing Bundles');
  let i = 1;
  const wStream = fs.createWriteStream('bundles.csv', { flags: 'a' });
  // wStream.write('bundle_id,bundle_name,bundle_price,sale_id\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.bundle_name = faker.lorem.word();
      data.bundle_price = faker.finance.amount();
      data.sale_id = (Math.floor(Math.random() * 5000000) + 1);

      if (i === 4000000) {
        wStream.write(`${i},${data.bundle_name},${data.bundle_price},${data.sale_id}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        if (i % 500000 === 0) {
          console.log(i);
        }
        ok = wStream.write(`${i},${data.bundle_name},${data.bundle_price},${data.sale_id}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 4000000 && ok);

    if (i <= 4000000) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

const generatePlatforms = (callback) => {
  console.log('Writing Platforms');
  let i = 1;
  const wStream = fs.createWriteStream('platforms.csv', { flags: 'a' });
  // wStream.write('platform_id,platform_name,platform_class,platform_icon\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.platform_name = faker.lorem.word();
      data.platform_class = faker.lorem.word();
      data.platform_icon = faker.image.imageUrl();

      if (i === 3) {
        wStream.write(`${i},${data.platform_name},${data.platform_class},${data.platform_icon}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        console.log(i);
        ok = wStream.write(`${i},${data.platform_name},${data.platform_class},${data.platform_icon}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 3 && ok);

    if (i <= 3) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

const generateSales = (callback) => {
  console.log('Writing Sales');
  let i = 1;
  const wStream = fs.createWriteStream('sales.csv', { flags: 'a' });
  // wStream.write('sale_id,sale_name,sale_amount,sale_start_date,sale_end_date\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.sale_name = faker.lorem.word();
      data.sale_amount = faker.finance.amount();
      data.sale_start_date = faker.date.past();
      data.sale_end_date = faker.date.future();

      if (i === 5000000) {
        wStream.write(`${i},${data.sale_name},${data.sale_amount},${data.sale_start_date.getFullYear()}-${data.sale_start_date.getMonth() + 1}-${data.sale_start_date.getDate()},${data.sale_end_date.getFullYear()}-${data.sale_end_date.getMonth() + 1}-${data.sale_end_date.getDate()}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        if (i % 500000 === 0) {
          console.log(i);
        }
        ok = wStream.write(`${i},${data.sale_name},${data.sale_amount},${data.sale_start_date.getFullYear()}-${data.sale_start_date.getMonth() + 1}-${data.sale_start_date.getDate()},${data.sale_end_date.getFullYear()}-${data.sale_end_date.getMonth() + 1}-${data.sale_end_date.getDate()}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 5000000 && ok);

    if (i <= 5000000) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

const generateTags = (callback) => {
  console.log('Writing Tags');
  let i = 1;
  const wStream = fs.createWriteStream('tags.csv', { flags: 'a' });
  // wStream.write('tag_id,tag_name,tag_icon\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.tag_name = faker.lorem.word();
      data.tag_icon = faker.image.imageUrl();

      if (i === 20) {
        wStream.write(`${i},${data.tag_name},${data.tag_icon}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        console.log(i);
        ok = wStream.write(`${i},${data.tag_name},${data.tag_icon}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 20 && ok);

    if (i <= 20) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

// generate join tables data

const generateBundlesPlatformsJoin = (callback) => {
  console.log('Writing Bundles-Platforms');
  let i = 1;
  const wStream = fs.createWriteStream('bundles_platforms.csv', { flags: 'a' });
  // wStream.write('bundle_id,platform_id\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.bundle_id = Math.floor(Math.random() * 4000000) + 1;
      data.platform_id = Math.floor(Math.random() * 3) + 1;

      if (i === 8000000) {
        wStream.write(`${data.bundle_id},${data.platform_id}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        if (i % 500000 === 0) {
          console.log(i);
        }
        ok = wStream.write(`${data.bundle_id},${data.platform_id}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 8000000 && ok);

    if (i <= 8000000) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

const generateGamesBundlesJoin = (callback) => {
  console.log('Writing Games-Bundles');
  let i = 1;
  const wStream = fs.createWriteStream('games_bundles.csv', { flags: 'a' });
  // wStream.write('game_id,bundle_id\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.game_id = Math.floor(Math.random() * 10000000) + 1;
      data.bundle_id = Math.floor(Math.random() * 4000000) + 1;

      if (i === 13000000) {
        wStream.write(`${data.game_id},${data.bundle_id}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        if (i % 500000 === 0) {
          console.log(i);
        }
        ok = wStream.write(`${data.game_id},${data.bundle_id}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 13000000 && ok);

    if (i <= 13000000) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

const generateGamesPlatformsJoin = (callback) => {
  console.log('Writing Games-Platforms');
  let i = 1;
  const wStream = fs.createWriteStream('games_platforms.csv', { flags: 'a' });
  // wStream.write('game_id,platform_id\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.game_id = Math.floor(Math.random() * 10000000) + 1;
      data.platform_id = Math.floor(Math.random() * 3) + 1;

      if (i === 25000000) {
        wStream.write(`${data.game_id},${data.platform_id}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        if (i % 500000 === 0) {
          console.log(i);
        }
        ok = wStream.write(`${data.game_id},${data.platform_id}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 25000000 && ok);

    if (i <= 25000000) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

const generateTagsGamesJoin = () => {
  console.log('Writing Tags-Games');
  let i = 1;
  const wStream = fs.createWriteStream('tags_games.csv', { flags: 'a' });
  // wStream.write('tag_id,game_id\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    do {
      const data = {};
      data.tag_id = Math.floor(Math.random() * 20) + 1;
      data.game_id = Math.floor(Math.random() * 10000000) + 1;

      if (i === 30000000) {
        wStream.write(`${data.tag_id},${data.game_id}\n`, (err) => {
          if (err) throw err;
          wStream.end();
          console.log('Finished writing');
        });
      } else {
        if (i % 500000 === 0) {
          console.log(i);
        }
        ok = wStream.write(`${data.tag_id},${data.game_id}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 30000000 && ok);

    if (i <= 30000000) {
      wStream.once('drain', generateAndWrite);
    }
  };
  generateAndWrite();
};

const generateGamesByGameId = (callback) => {
  console.log('Writing Games');
  let i = 1; // go to 10000000

  const wStream = fs.createWriteStream('./server/database/csv_data/game_3.csv', { flags: 'a' });
  // wStream.write('game_id,game_name,game_price,game_banner,game_release_date,dev_id,sale_id\n', (err) => {
  //   if (err) throw err;
  // });

  const generateAndWrite = () => {
    let ok;
    const platforms = {
      1: { platform_name: 'Mac', platform_icon: faker.image.imageUrl() },
      2: { platform_name: 'Windows', platform_icon: faker.image.imageUrl() },
      3: { platform_name: 'Steam + Linux', platform_icon: faker.image.imageUrl() },
    };

    const tags = {
      1: { tag_name: 'fun', tag_icon: faker.image.imageUrl() },
      2: { tag_name: 'riveting', tag_icon: faker.image.imageUrl() },
      3: { tag_name: 'for kids', tag_icon: faker.image.imageUrl() },
      4: { tag_name: 'for adults', tag_icon: faker.image.imageUrl() },
      5: { tag_name: 'mystery', tag_icon: faker.image.imageUrl() },
      6: { tag_name: 'addicting', tag_icon: faker.image.imageUrl() },
      7: { tag_name: 'hot', tag_icon: faker.image.imageUrl() },
      8: { tag_name: 'in demand', tag_icon: faker.image.imageUrl() },
      9: { tag_name: 'exclusive', tag_icon: faker.image.imageUrl() },
      10: { tag_name: 'wonderful', tag_icon: faker.image.imageUrl() },
      11: { tag_name: 'engaging', tag_icon: faker.image.imageUrl() },
      12: { tag_name: 'family', tag_icon: faker.image.imageUrl() },
      13: { tag_name: 'favorite', tag_icon: faker.image.imageUrl() },
      14: { tag_name: 'on sale', tag_icon: faker.image.imageUrl() },
      15: { tag_name: 'limited time only', tag_icon: faker.image.imageUrl() },
      16: { tag_name: 'mysterious', tag_icon: faker.image.imageUrl() },
      17: { tag_name: 'amazing', tag_icon: faker.image.imageUrl() },
      18: { tag_name: 'first person', tag_icon: faker.image.imageUrl() },
      19: { tag_name: 'platformer', tag_icon: faker.image.imageUrl() },
      20: { tag_name: 'puzzle', tag_icon: faker.image.imageUrl() },
    };

    do {
      const data = {};
      const platformsPicked = {};
      const tagsPicked = {};
      data.platforms = [];
      data.tags = [];
      for (let j = 1; j <= 3; j += 1) {
        const randomIndex = Math.floor(Math.random() * 3) + 1;
        if (platformsPicked[randomIndex] === undefined) {
          platformsPicked[randomIndex] = 1;
          data.platforms.push(
            {
              platform_id: randomIndex,
              platform_name: platforms[randomIndex].platform_name,
              platform_icon: platforms[randomIndex].platform_icon,
            },
          );
        }
      }

      for (let j = 1; j <= 20; j += 1) {
        const randomIndex = Math.floor(Math.random() * 20) + 1;
        if (tagsPicked[randomIndex] === undefined) {
          tagsPicked[randomIndex] = 1;
          data.tags.push(
            {
              tag_id: randomIndex,
              tag_name: tags[randomIndex].tag_name,
              tag_icon: tags[randomIndex].tag_icon,
            },
          );
        }
      }

      data.game_name = faker.lorem.word();
      data.game_price = faker.finance.amount();
      data.game_banner = faker.image.imageUrl();
      data.game_release_date = new Date(faker.date.past());
      data.game_dev_name = faker.lorem.word();
      data.game_sale_amount = faker.finance.amount() * -1;

      if (i === 1000) {
        wStream.write(`${i}|${data.game_name}|${data.game_price}|${data.game_banner}|${data.game_release_date.getFullYear()}-${data.game_release_date.getMonth() + 1}-${data.game_release_date.getDate()}|${data.game_dev_name}|${data.game_sale_amount}|${JSON.stringify(data.platforms)}|${JSON.stringify(data.tags)}\n`, (err) => {
          if (err) throw err;
          wStream.end();
        });
      } else {
        if (i % 500000 === 0) {
          console.log(i);
          console.log(data.platforms);
        }
        ok = wStream.write(`${i}|${data.game_name}|${data.game_price}|${data.game_banner}|${data.game_release_date.getFullYear()}-${data.game_release_date.getMonth() + 1}-${data.game_release_date.getDate()}|${data.game_dev_name}|${data.game_sale_amount}|${JSON.stringify(data.platforms)}|${JSON.stringify(data.tags)}\n`, (err) => {
          if (err) throw err;
        });
      }
      i += 1;
    } while (i <= 1000 && ok);

    if (i <= 1000) {
      wStream.once('drain', generateAndWrite);
    } else {
      callback();
    }
  };
  generateAndWrite();
};

generateGamesByGameId(() => console.log('finished writing'));


// (() => {
//   generateGames(() => {
//     generateDevelopers(() => {
//       generateBundles(() => {
//         generatePlatforms(() => {
//           generateSales(() => {
//             generateTags(() => {
//               generateBundlesPlatformsJoin(() => {
//                 generateGamesBundlesJoin(() => {
//                   generateGamesPlatformsJoin(generateTagsGamesJoin);
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// })();

module.exports = {
  generateTagsGamesJoin,
  generateGamesPlatformsJoin,
  generateGamesBundlesJoin,
  generateBundlesPlatformsJoin,
  generateTags,
  generateSales,
  generatePlatforms,
  generateBundles,
  generateDevelopers,
  generateGames,
};
