import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  stages: [
    { duration: '30s', target: 100 },
    { duration: '2m30s', target: 1000 },
  ],
};

export default function() {
  const applyWeight = () => {
    // we want 80 percent of our requests to be between 80000000 and 10000000
    // we want 20 percent of our requests to be between 1 and 7999999
    // generate a random number, if it is betwen 0 and .8, set bounds to be between 8M and 10M
    // if it is between .81 and 1, set bounds between 1 and 7999999
    const weightNum = Math.random();

    if (weightNum > 0.80) {
      return [7999999, 1];
    }
    return [2000000, 8000000];
  };
  const [numberOptions, lowerBound] = applyWeight();
  const randomId = Math.floor(Math.random() * numberOptions) + lowerBound;

  http.get(`http://localhost:3002/api/bundlesByGameId/${randomId}`, {
    tags: { name: 'gameById' },
  });
}
