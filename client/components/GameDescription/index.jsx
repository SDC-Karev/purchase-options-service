import React from 'react';
import faker from 'faker';

import styles from '../../style.css';

const GameDescription = ({ desc }) => (
  <div className={styles.game_description}>
    <div className={styles.game_description_block}>
      <h2>About this Game</h2>
      {desc.about}
    </div>
    <div className={styles.game_description_block}>
      <h2>Mature Content Warning</h2>
      <p>The developers describe the content like this:</p>
      <p><i>{desc.mature_content}</i></p>
    </div>
    <div className={styles.game_description_block}>
      <h2>System Requirements</h2>
      <div className={styles.game_system_reqs_contents_wrapper}>
        <div className={styles.game_system_reqs_data}>
          <div className={styles.sys_req_left_col}>
            <ul>
              <strong>Minimum</strong>
              <br/>
              <ul>
                <li>
                  <strong>OS:</strong>
                  {" Windows 7/8.1/10 (64-bit Version)"}
                </li>
                <li>
                  <strong>Processor:</strong>
                  {" Intel i5-750/AMD Phenom II X4-945"}
                </li>
                <li>
                  <strong>Memory:</strong>
                  {" 8 GB RAM"}
                </li>
                <li>
                  <strong>Graphics:</strong>
                  {" NVIDIA GTX 470 1GB /AMD HD 7870 2GB"}
                </li>
                <li>
                  <strong>Storage:</strong>
                  {" 12 GB available space"}
                </li>
              </ul>
            </ul>
          </div>
          <div className={styles.sys_req_right_col}>
            <ul>
              <strong>Recommended</strong>
              <br/>
              <ul>
                <li>
                  <strong>OS:</strong>
                  {" Windows 7/8.1/10 (64-bit Version)"}
                </li>
                <li>
                  <strong>Processor:</strong>
                  {" Intel i5-2400/AMD FX-8320"}
                </li>
                <li>
                  <strong>Memory:</strong>
                  {" 8 GB RAM"}
                </li>
                <li>
                  <strong>Graphics:</strong>
                  {" NVIDIA GTX 780 3GB /AMD R9 290 4GB"}
                </li>
                <li>
                  <strong>Storage:</strong>
                  {" 12 GB available space"}
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GameDescription;
