import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '150s',
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
	const randomIds = [];
	for (let i = 0; i < 10; i += 1) {
		randomIds.push(Math.floor(Math.random() * numberOptions) + lowerBound);

	}

	for (let j = 0; j < 10; j += 1) {
			http.get(`http://localhost:3002/api/gameById/${randomIds[j]}`, {
				tags: { name: 'gameById' },
			});
			http.get(`http://localhost:3002/api/bundlesByGameId/${randomIds[j]}`, {
				tags: { name: 'bundlesByGameId' },
			});
	}
}
