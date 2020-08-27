import React from 'react';
import ReactDOM from 'react-dom';
import PurchaseOptions from './PurchaseOptions';

const paths = window.location.pathname.split('/');
const gameId = paths[paths.length - 2];
ReactDOM.render(<PurchaseOptions gameId={gameId} />, document.getElementById('purchase-options'));
