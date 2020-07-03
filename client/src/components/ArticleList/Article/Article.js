import React from 'react';

import styles from './Article.module.css';

const Article = (props) => {
  const isEven = props.index % 2 === 0 ? true : false;
  let topPoints = '';
  let bottomPoints = '';

  if (isEven) {
    topPoints = '0,0 0,100 100,0';
    bottomPoints = '0,0 0,100 100,100';
  } else {
    topPoints = '100,100 100,0 0,0';
    bottomPoints = '0,100 100,100 100,0';
  }

  return (
    <div>
      <div className={styles.Article}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="white" points={topPoints} />
        </svg>
        <div className={styles.TextContainer}>
          <h3>Article Title</h3>
          <p>Placholder text about this article.</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="white" points={bottomPoints} />
        </svg>
      </div>
    </div>
  )
}

export default Article;