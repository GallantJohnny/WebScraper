import React from 'react';

import styles from './Header.module.css';

const Header = (props) => (
  <div className={styles.Header}>
    <h2>Welcome !</h2>
    <p className={styles.HeaderText}>You can search for articles without images on the RisingStack blog webpage. You may specify how many pages will be searched. If you enter 1, all pages will be searched.</p>
  </div>
);

export default Header;