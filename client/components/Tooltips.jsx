import React from 'react';
import styles from '../style.css';

const BasicTooltip = ({ bundle }) => (
  <h1 className={styles.h1}>
    {bundle.bundle_name}
    <div className={styles.bundle_tooltip}>
      &nbsp;BUNDLE
      <div className={styles.bundle_tooltip_text}>
        Bundles are a special discount on a set of products. If you already own some of the products contained in the bundle, purchasing the bundle will allow you to &quot;complete the set&quot;, paying only for the products you don&apos;t already own while still receiving the full bundle discount on each of those products.
      </div>
    </div>
  </h1>
);

const GameTooltip = ({
  game,
  bundle_id,
  onMouseEnter,
  onMouseExit,
}) => (
  <a
    href="#"
    className={styles.bundle_item}
    onMouseEnter={(e) => onMouseEnter(game, bundle_id, e)}
    onMouseLeave={(e) => onMouseExit(game, bundle_id, e)}
  >
    <div className={styles.bundle_game}>
      <span>
        <img className={styles.bundle_img} src={game.game_banner} alt="Banner for Game" />
      </span>
    </div>
  </a>
);

export {
  BasicTooltip,
  GameTooltip,
};
