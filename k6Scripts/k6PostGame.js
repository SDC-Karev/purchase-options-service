import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  stages: [
    { duration: '30s', target: 100 },
    { duration: '2m30s', target: 1000 },
  ],
};

var url = 'http://localhost:3002/api/games';
const payload = JSON.stringify({
  game_name: "Halo",
  game_price: 50.40,
  game_banner: "game banner",
  game_release_date: "2020-04-05",
  game_dev_name: "Ajax",
  game_sale_amount: -5.4,
  platforms: [
    {
      platform_name: "platform one",
      platform_icon: "platform icon"
    },
  ],
  tags: [
    {
      tag_name: "tag one",
      tag_icon: "tag icon"
    },
  ],
});

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  export default function() {
    http.post(url, payload, params);
  }
