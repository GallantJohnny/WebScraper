import React, { Component } from 'react';
import './App.css';

import Form from './components/Form/Form';
import ArticleList from './components/ArticleList/ArticleList';

class App extends Component {
  state = {
    isLoading: false,
    inputValue: '',
    articles: []
  }

  onInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <Form onInputChange={event => this.onInputChange(event)} value={this.state.inputValue} />
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

export default App;
