import React from 'react';
import styles from '../style.css';

import PurchaseGame from './PurchaseGame.jsx';
import PurchaseBundle from './PurchaseBundle.jsx';

const PurchaseOptions = ({ game, bundles, onBundleItemHover}) => (
  <div className={styles.left_column}>
    <PurchaseGame game={game} />
    {bundles.map((bundle) => <PurchaseBundle key={bundle.bundle_id} onBundleItemHover={onBundleItemHover} bundle={bundle} />)}
  </div>
);

export default PurchaseOptions;
