import React, { Component } from 'react';
import './App.css';

import Form from './components/Form/Form';
import ArticleList from './components/ArticleList/ArticleList';
import axios from './axiosConfig';

class App extends Component {
  state = {
    isLoading: false,
    inputValue: '',
    articles: []
  }

  onInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  onFormSubmitted = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios.put('fetch-articles-without-imgs', { numOfPages: this.state.inputValue }).then(response => {
      this.setState({ articles: [...response.data], isLoading: false });
    })
  }

  render() {
    return (
      <div className="App">
        <Form
          onInputChange={event => this.onInputChange(event)}
          onFormSubmitted={e => this.onFormSubmitted(e)}
          value={this.state.inputValue}
          isLoading={this.state.isLoading}
        />
        <ArticleList
          articles={this.state.articles}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default App;
