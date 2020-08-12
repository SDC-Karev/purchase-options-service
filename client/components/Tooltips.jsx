import React from 'react';
import styles from '../style.css';

const BasicTooltip = ({ bundle }) => (
  <h1 className={styles.h1}>
    {bundle.bundle_name} &nbsp;<div className={styles.bundle_tooltip}>BUNDLE
      <div className={styles.bundle_tooltip_text}>
        Bundles are a special discount on a set of products.  If you already own some of the products contained in the bundle, purchasing the bundle will allow you to &quot;complete the set&quot;, paying only for the products you don't already own while still receiving the full bundle discount on each of those products.
      </div>
    </div>
  </h1>
);

const GameTooltip = ({ game }) => (
  <a href="#" className={styles.bundle_item} >
    <div className={styles.bundle_game} >
      <span><img className={styles.bundle_img} src={game.game_banner}/></span>
      <div className={styles.game_tooltip} >
        <div className={styles.game_tooltip_content}>
          <h3 className={styles.game_tooltip_title}>{game.game_name}</h3>
          <p className={styles.game_tooltip_releasedate}>{
            `${new Date(game.game_release_date).toDateString(). substring(4, 7)} ${new Date(game.game_release_date).getDay()}, ${new Date(game.game_release_date).getFullYear()}`
          }</p>
          <p className={styles.game_tooltip_content}>{`Contains 1 item: ${game.game_name}`}</p>
          <div className={styles.game_tooltip_tag_block}>
            {game.tags.map((tag) => <div className={styles.game_tooltip_tag}>{tag.tag_name}</div>)}
          </div>
        </div>
      </div>
    </div>
  </a>
);

export {
  BasicTooltip,
  GameTooltip,
}