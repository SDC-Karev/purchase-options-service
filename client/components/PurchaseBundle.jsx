import React from 'react';
import { PurchaseButton, SalePurchaseButton } from './PurchaseButtons.jsx'
import styles from '../style.css';


const BundleItem = ({ game }) => (
  <a href={styles.bundle_item}>
    <img className={styles.bundle_img} src={game.game_banner} />
  </a>
);

const PurchaseBundle = ({ bundle }) => (
  <div className={styles.game_purchase_wrapper}>
    <div className={styles.game_purchase_block}>
      <h1 className={styles.h1}>
        {bundle.bundle_name} <span className={styles.bundle_tooltip}></span>
      </h1>
      <p className={styles.bundle_info}>Promotion details promotion date</p>
      <div className={styles.bundle_contents}>
        <div className="bundle_contents_items">
          {bundle.games.map((game) => <BundleItem key={game.game_id} game={game} /> )}
        </div>
      </div>
      <div className={styles.game_purchase}>
       {(bundle.sale_amount === 0) ? <PurchaseButton price={bundle.bundle_price} /> : <SalePurchaseButton price={bundle.bundle_price} sale_amount={bundle.sale_amount} />}
      </div>
    </div>
  </div>
);

export default PurchaseBundle;
