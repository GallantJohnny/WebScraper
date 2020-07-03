import React from 'react';

import styles from './Article.module.css';

const Article = (props) => {
  const isEven = props.index % 2 === 0 ? true : false;
  let topPoints = '';

  if (isEven) {
    topPoints = '0,0 0,100 100,0';
  } else {
    topPoints = '100,100 100,0 0,0';
  }

  const alignment = isEven ? { textAlign: 'right' } : { textAlign: 'left' };

  return (
    <div className={styles.Article}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon fill="white" points={topPoints} />
      </svg>
      <div className={styles.TextContainer} style={alignment}>
        <h2>{props.article.title}</h2>
        <div>{props.article.updated}</div>
        <div><a href={props.article.url} style={{ textDecoration: 'none' }}>[ link ]</a></div>
      </div>
    </div>
  )
}

export default Article;