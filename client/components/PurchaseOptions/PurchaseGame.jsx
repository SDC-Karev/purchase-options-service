import React from 'react';
import { PurchaseButtonBlock } from './PurchaseButtons';
import styles from '../../style';

const PurchaseGame = ({ game }) => (
  <div className={styles.game_purchase_wrapper}>

    <div className={styles.game_purchase_block}>
      <div className="game_purchase_banner">
        <div className={styles.game_platforms}>
          {(game.platforms) ? game.platforms.map((platform) => <span key={platform.platform_name} className={styles.platform_icon} style={{ backgroundImage: `url('${platform.platform_icon}')` }} />) : null}
        </div>
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
