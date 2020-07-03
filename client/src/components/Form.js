import React, { Component } from 'react';

class Form extends Component {
  state = {}

  render() {
    return (
      <form>
        <label for="numOfPages">How many pages would you like to scrap?</label>
        <input name="numOfPages" type="number" placeholder="Number of pages (1 = all pages)"></input>
        <button>Scrap RisingStack!</button>
      </form>
    );
  }
}