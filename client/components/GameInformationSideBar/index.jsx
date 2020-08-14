import React from 'react';
import styles from '../../style.css';

import GameCategory from './GameCategories.jsx'

const GameInformationSideBar = ({ game }) => (
  <div className={styles.game_information}>
    <div className={styles.right_info_block}>
      <img src="#" alt="Information regarding the game" />
    </div>
    <div className={styles.right_info_block}>
      <GameCategory
        target={"#"}
        img={"https://store.cloudflare.steamstatic.com/public/images/v6/ico/ico_singlePlayer.png"}
        name={"Single-Player"}
      />
      <GameCategory
        target={"#"}
        img={"https://store.cloudflare.steamstatic.com/public/images/v6/ico/ico_achievements.png"}
        name={"Steam Achievements"}
      />
      <GameCategory
        target={"#"}
        img={"https://store.cloudflare.steamstatic.com/public/images/v6/ico/ico_partial_controller.png"}
        name={"Partial Controller Support"}
      />
      <GameCategory
        target={"#"}
        img={"https://store.cloudflare.steamstatic.com/public/images/v6/ico/ico_cloud.png"}
        name={"Steam Cloud"}
      />
      <GameCategory
        target={"#"}
        img={"https://store.cloudflare.steamstatic.com/public/images/v6/ico/ico_remote_play.png"}
        name={"Remote Play on Phone"}
      />
      <GameCategory
        target={"#"}
        img={"https://store.cloudflare.steamstatic.com/public/images/v6/ico/ico_remote_play.png"}
        name={"Remote Play on Tablet"}
      />
      <div className={styles.eula_notice}>
        <div>Requires agreement to a 3rd-party EULA</div>
          <div>
            <a href="http://store.steampowered.com//eula/489830_eula_0" >The Elder Scrolls V: Skyrim Special Edition EULA</a>
            </div>
      </div>
    </div>
    <div className={styles.right_info_block}>
      <img src="#" alt="Information regarding the game" />
    </div>
    <div className={styles.right_info_block}>
      <img src="#" alt="Information regarding the game" />
    </div>
    <div className={styles.right_info_block}>
      <img src="#" alt="Information regarding the game" />
    </div>
    <div className={styles.right_info_block}>
      <img src="#" alt="Information regarding the game" />
    </div>
    <div className={styles.right_info_block}>
      <img src="#" alt="Information regarding the game" />
    </div>
    <div className={styles.right_info_block}>
      <img src="#" alt="Information regarding the game" />
    </div>
    <div className={styles.right_info_block}>
      <img src="#" alt="Information regarding the game" />
    </div>
  </div>
);

export default GameInformationSideBar;
