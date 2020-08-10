import React from 'react';
import styles from '../style.css';

const PurchaseBundle = (props) => (
  <div className={styles.game_purchase_wrapper}>
    <div className={styles.game_purchase_block}>
      <h1 className={styles.h1}>
        Bundle Title
      </h1>
      <p className={styles.bundle_info}>Promotion details promotion date</p>
      <div className={styles.bundle_contents}>
        <div className="bundle_contents_items">
          <a href="item">
            Item 1
            <img className={styles.bundle_img} src="#" />
          </a>
          <a href="item">
            Item 2
            <img className={styles.bundle_img} src="#" />
          </a>
          <a href="item">
            Item 2
            <img className={styles.bundle_img} src="#" />
          </a>
        </div>
      </div>
      <div className={styles.game_purchase}>
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
  </div>
);

export default PurchaseBundle;
