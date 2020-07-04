import React, { Component } from 'react';
import './App.css';

import Form from './components/Form/Form';
import ArticleList from './components/ArticleList/ArticleList';
import Header from './components/Header/Header';
import axios from './axiosConfig';

class App extends Component {
  state = {
    isLoading: false,
    inputValue: '',
    articles: [],
    error: '',
    maxNumOfPages: null
  }

  componentDidMount() {
    axios.get('/maximum-num-of-pages').then(response => {
      this.setState({ maxNumOfPages: response.data });
    })
  }

  onInputChange = (event) => {
    this.setState({ inputValue: event.target.value, error: '' });
  }

  onFormSubmitted = e => {
    e.preventDefault();
    if (this.state.inputValue !== '') {
      this.setState({ isLoading: true });
      axios.put('fetch-articles-without-imgs', { numOfPages: this.state.inputValue }).then(response => {
        this.setState({ articles: [...response.data], isLoading: false });
      })
    } else {
      this.setState({ error: 'Please enter a number!' });
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Form
          onInputChange={event => this.onInputChange(event)}
          onFormSubmitted={e => this.onFormSubmitted(e)}
          value={this.state.inputValue}
          isLoading={this.state.isLoading}
          error={this.state.error}
          maxNumOfPages={this.state.maxNumOfPages}
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
