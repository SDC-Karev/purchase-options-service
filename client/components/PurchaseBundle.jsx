import React from 'react';
import { PurchaseButton, SalePurchaseButton } from './PurchaseButtons.jsx'
import { BasicTooltip, GameTooltip } from './Tooltips.jsx';
import styles from '../style.css';


const BundleItem = ({ game }) => (
  <a href={styles.bundle_item}>
    <img className={styles.bundle_img} src={game.game_banner}/>
  </a>
);


const PurchaseBundle = ({ bundle }) => (
  <div className={styles.game_purchase_wrapper}>
    <div className={styles.game_purchase_block}>
      <BasicTooltip bundle={bundle} />
      <p className={styles.bundle_info}>Promotion details promotion date</p>
      <div className={styles.bundle_contents}>
        <div clasName={styles.bundle_items_block}>
          <div className="bundle_contents_items">
            {bundle.games.map((game) => <GameTooltip key={game.game_id} game={game} /> )}
          </div>
        </div>

      </div>
      <div className={styles.game_purchase}>
       {(bundle.sale_amount === 0) ? <PurchaseButton price={bundle.bundle_price} /> : <SalePurchaseButton price={bundle.bundle_price} sale_amount={bundle.sale_amount} />}
      </div>
    </div>
  </div>
);

export default PurchaseBundle;
