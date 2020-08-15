import React from 'react';
import styles from '../../style.css';

const ShareBlock = () => (
  <div>
    <a href={'#'} className={styles.blue_btn}>
      <span>Share</span>
    </a>
    <a href={'#'} className={styles.blue_btn}>
      <span>Embed</span>
    </a>
    <a href={'#'} className={styles.blue_btn}>
      <span className={styles.report_span}>
        <i className={styles.report_icon}></i>
        &nbsp;
      </span>
    </a>

  </div>
);

export default ShareBlock;