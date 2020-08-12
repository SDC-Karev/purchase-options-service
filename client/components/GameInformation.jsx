import React from 'react';
import styles from '../style.css';

const GameInformation = ({ game }) => (
  <div className={styles.right_column}>
    <img src={game.game_banner} alt="Information regarding the game" />
  </div>
);

export default GameInformation;
