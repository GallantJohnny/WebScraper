import React from 'react';

import Article from './Article/Article';

import styles from './ArticleList.module.css'

const ArticleList = (props) => {
  let render = <div className={styles.loader}>Loading</div>;

  if (!props.isLoading) {
    render = props.articles.map((article, i) => (<Article key={i} index={i} article={article}></Article>));
  }

  return (
    <div className={styles.ArticleList}>
      {render}
    </div>
  )
}

export default ArticleList;