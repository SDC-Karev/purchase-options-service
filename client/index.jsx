import React from 'react';
import ReactDOM from 'react-dom';
import PurchaseOptions from './PurchaseOptions';

// const paths = window.location.pathname.split('/');
// const gameId = paths[paths.length - 2];

const pathToId = window.location.pathname;
const reg = /[0-9]+/g;
const id = pathToId.match(reg);
const gameId = id[0];

ReactDOM.render(<PurchaseOptions gameId={gameId} />, document.getElementById('purchase-options'));
