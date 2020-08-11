import React from 'react';
import PropTypes from 'prop-types';
import { PurchaseButton, SalePurchaseButton } from './PurchaseButtons.jsx'
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
      <div className={styles.game_purchase}>
       {(game.sale_amount === 0) ? <PurchaseButton price={game.game_price} /> : <SalePurchaseButton price={game.game_price} sale_amount={game.sale_amount} />}
      </div>
    </div>
  </div>
);

export default PurchaseGame;
