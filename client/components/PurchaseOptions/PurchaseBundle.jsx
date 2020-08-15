import React from 'react';
import { PurchaseButtonBlock } from './PurchaseButtons.jsx';
import { BasicTooltip, GameTooltip } from '../Tooltips.jsx';
import styles from '../../style.css';

const PurchaseBundle = ({ bundle, onMouseEnter, onMouseExit }) => (
  <div className={styles.game_purchase_wrapper}>
    <div className={styles.game_purchase_block}>
      <div className={styles.game_platforms}>
        {bundle.platforms.map((platform) => <span key={platform.platform_id} className={styles.platform_icon} style={{ backgroundImage: `url('${platform.platform_icon}')` }} />) }
      </div>
      <BasicTooltip bundle={bundle} />
      <p className={styles.bundle_info}>
        Promotion details promotion date
      </p>

      <div className={styles.bundle_contents}>
        <div className={styles.bundle_items_block}>
          <div className={styles.bundle_contents_items}>
            {bundle.games.map((game) => (
              <GameTooltip
                key={game.game_id}
                bundle_id={bundle.bundle_id}
                game={game}
                onMouseEnter={onMouseEnter}
                onMouseExit={onMouseExit}
              />
            ))}
          </div>
        </div>
      </div>
      <PurchaseButtonBlock price={bundle.bundle_price} saleAmount={bundle.sale_amount} />
    </div>
  </div>
);

export default PurchaseBundle;
