import React from 'react';
import styles from '../../style.css';

import GameCategory from './GameCategories.jsx'
import GameLanguages from './GameLanguages.jsx'
import GameRating from './GameRating.jsx'
import ShareBlock from './ShareBlock.jsx'


const temporaryLanguages = {
  English: [1, 1, 1],
  French: [1, 1, 1],
  Italian: [1, 1, 1],
  German: [1, 1, 1],
  "Spanish - Spain": [1, 1, 1],
  Polish: [1, 1, 1],
  "Traditional Chinese": [1, 0, 1],
  Russian: [1, 1, 1],
  Japanese: [1, 1, 1],
};

const temporaryGameRating = {
  details: 'BLOOD AND GORE, INTENSE VIOLENCE, SEXUAL THEMES, USE OF ALCOHOL',
  img: 'https://store.cloudflare.steamstatic.com/public/shared/images/game_ratings/ESRB/m.png',
};

const GameInformationSideBar = ({ game }) => (
  <div className={styles.game_information}>

    <div>
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

    <div>
      <GameLanguages languages={temporaryLanguages} />
    </div>

    <div>
      <GameRating details={temporaryGameRating.details} img={temporaryGameRating.img} />
    </div>

    <div>
      <ShareBlock />
    </div>


  </div>
);

export default GameInformationSideBar;
