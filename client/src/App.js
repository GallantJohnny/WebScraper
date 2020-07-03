import React, { Component } from 'react';
import './App.css';

import Form from './components/Form/Form';
import ArticleList from './components/ArticleList/ArticleList';

class App extends Component {
  state = {
    isLoading: false
  }

  render() {
    return (
      <div className="App">
        <Form />
        <ArticleList />
      </div>
    );
  }
}

export default App;
