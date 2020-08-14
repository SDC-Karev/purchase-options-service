import React from 'react';
import { PurchaseButtonBlock } from './PurchaseButtons.jsx';
import styles from '../style.css';

const PurchaseGame = ({ game }) => (
  <div className={styles.game_purchase_wrapper}>
    <div className={styles.game_purchase_block}>
      <div className="game_purchase_banner">
        <h1>
          {game.game_name}
        </h1>
        <p className={styles.game_purchase_subtitle}>
          Promotion details promotion date
        </p>
      </div>
      <PurchaseButtonBlock price={game.game_price} saleAmount={game.sale_amount} />

    </div>
  </div>
);

export default PurchaseGame;
