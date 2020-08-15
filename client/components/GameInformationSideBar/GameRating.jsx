import React from 'react';
import styles from '../../style.css';

const GameRating = ({ details, img}) => (
  <div>
    <div className={styles.game_rating_block}>
      <div className={styles.game_rating_details}>
        <div className={styles.game_rating_image}>
          <img src={img} />
        </div>
        <div className={'game_rating_text_block'}>
          <div className={styles.game_rating_details_description}>
            <p>{details}</p>
          </div>
        </div>
      </div>
      <div className={styles.game_rating_provider}>
        Rating for: ESRB
      </div>
    </div>
  </div>
);

export default GameRating;
