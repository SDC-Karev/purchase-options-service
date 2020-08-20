import React from 'react';
import styles from '../../style';

import PurchaseGame from './PurchaseGame';
import PurchaseBundle from './PurchaseBundle';

const PurchaseOptionsBlock = ({
  game,
  bundles,
  onBundleItemMouseEnter,
  onBundleItemMouseExit,
}) => (
  <div className={styles.purchase_options}>
    <PurchaseGame game={game} />
    {bundles.map((bundle) => (
      <PurchaseBundle
        key={bundle.bundle_id}
        bundle={bundle}
        onMouseEnter={onBundleItemMouseEnter}
        onMouseExit={onBundleItemMouseExit}
      />
    ))}
  </div>
);

export default PurchaseOptionsBlock;
