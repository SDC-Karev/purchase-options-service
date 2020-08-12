module.exports = {
  gameById: {
    exists: {
      game_id: 201,
      game_name: 'Test Game',
      game_price: 5000,
      sale_amount: -50,
      game_banner: 'img/url',
      dev_name: 'Test Developer',
      tags: [
        {
          tag_name: 'Indie',
          tag_icon: 'https://s3.amazonaws.com/uifaces/faces/twitter/doronmalki/128.jpg',
        },
      ],
    },
    does_not_exist: 'Game not found',
  },
  bundleByGameId: {
    exists: [
      {
        bundle_id: 201,
        bundle_name: 'Test Bundle',
        bundle_price: 5000,
        sale_amount: -50,
        games: [
          {
            game_id: 201,
            game_name: 'Test Game',
            game_release_date: '2019-05-01T04:00:00.000Z',
            game_banner: 'img/url',
            dev_name: 'Test Developer',
            tags: [
              {
                tag_name: 'Indie',
                tag_icon: 'https://s3.amazonaws.com/uifaces/faces/twitter/doronmalki/128.jpg',
              },
            ],
          },
        ],
      },
    ],
    does_not_exist: 'No bundles found',
  },
};
