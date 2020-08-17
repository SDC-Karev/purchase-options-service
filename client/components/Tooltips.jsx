import React from 'react';
import styles from '../style';

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

const BundleItemTooltip = ({ game, style }) => (
  <div className={styles.game_tooltip} style={style}>
    <div className={styles.game_tooltip_spacer} />
    <div className={styles.game_tooltip_content}>
      <h4 className={styles.game_tooltip_title}>{game.game_name}</h4>
      <div className={styles.game_tooltip_releasedate}>
        <span>{`${new Date(game.game_release_date).toDateString().substring(4, 7)} ${new Date(game.game_release_date).getDay()}, ${new Date(game.game_release_date).getFullYear()}`}</span>
      </div>
      <p className={styles.game_tooltip_body_content}>{`Contains 1 item: ${game.game_name}`}</p>
      <div className={styles.game_tooltip_platforms}>
        {game.platforms.map((platform) => <span key={platform.platform_name} className={styles.platform_icon} style={{ backgroundImage: `url('${platform.platform_icon}')` }} />)}
      </div>
      <div className={styles.game_tooltip_tag_block}>
        User Tags:
        <div className={styles.game_tooltip_tag_row}>
          {game.tags.map((tag) => (
            <div key={tag.tag_name} className={styles.game_tooltip_tag}>{tag.tag_name}</div>))}
        </div>
      </div>
    </div>
  </div>
);

const BundleItemTooltipBlock = ({ games }) => (
  <div className={styles.game_tooltip_wrapper}>
    <div className={styles.game_tooltip_container}>
      {Object.keys(games).map((gameKey) => (
        <BundleItemTooltip key={gameKey} game={games[gameKey]} style={games[gameKey].style} />
      ))}
    </div>
  </div>
);

export {
  BasicTooltip,
  GameTooltip,
  BundleItemTooltipBlock,
};
