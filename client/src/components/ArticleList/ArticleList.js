import React from 'react';

import Article from './Article/Article';

import styles from './ArticleList.module.css'

const ArticleList = (props) => {
  let articles = ['Title 1', 'Title 2', 'Title 3', 'Title 4'];

  return (
    <div className={styles.ArticleList}>
      {articles.map((article, i) => (<Article key={i} index={i}></Article>))}
    </div>
  )
}

export default ArticleList;