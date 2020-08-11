import React from 'react';
import PropTypes from 'prop-types';
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
        <div className={styles.game_purchase_data}>
          <div className={styles.discount_pct_amount}>{`${game.sale_amount}%`}</div>
          <div className={styles.prices}>
            <div className={styles.original_price}>{`\$${(game.game_price/100).toFixed(2)}`}</div>
            <div className={styles.discounted_price}>{`\$${(game.game_price/100 * (1 + game.sale_amount/100)).toFixed(2)}`}</div>
          </div>
          <div className={styles.green_btn}>
            <a className="btn_purchase" href="#"><span>Add To Cart</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PurchaseGame;
