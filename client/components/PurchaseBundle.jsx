import React from 'react';
import styles from '../style.css';


var PurchaseBundle = (props) => (
  <div className={styles.game_purchase_wrapper}>
    <h1 className={styles.h1}>
      Bundle Title
    </h1>
    <div className="bundle_contents">
      <p className={styles.bundle_info}>Promotion details promotion date</p>
      <div className="bundle_contents_items">
        <a href="item">
          Item 1
          <img src="#" />
        </a>
        <a href="item">
          Item 2
          <img src="#" />
        </a>
        <a href="item">
          Item 2
          <img src="#" />
        </a>
      </div>
    </div>
    <div className={styles.games_purchase}>
      <div className={styles.game_purchase_data}>
        <div className={styles.discount_pct_amount}>-50%</div>
        <div className={styles.prices}>
          <div className={styles.original_price}>$100.00</div>
          <div className={styles.discounted_price}>$50.00</div>
        </div>
        <div className={styles.green_btn}>
          <a className="btn_purchase" href="#"><span>Add To Cart</span></a>
        </div>
      </div>
    </div>
  </div>
);

export default PurchaseBundle;