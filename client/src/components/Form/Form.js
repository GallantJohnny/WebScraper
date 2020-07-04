import React, { Component } from 'react';

import styles from './Form.module.css';

class Form extends Component {
  state = {
    input: ''
  }

  render() {
    let borderBottom = {};

    if (this.props.error !== '') borderBottom = { borderBottom: 'solid red 2px' };

    return (
      <form onSubmit={this.props.onFormSubmitted} className={styles.Form}>
        <label className={styles.Label}>How many pages would you like to scrap?</label>
        {this.props.error !== '' ? <div className={styles.Error}>Please enter a number!</div> : null}
        <input
          disabled={this.props.isLoading}
          onChange={this.props.onInputChange}
          value={this.props.value}
          className={styles.Input}
          name="numOfPages"
          type="number"
          placeholder="e.g. 3"
          min="0"
          style={borderBottom}
        >
        </input>
        <button disabled={this.props.isLoading} className={styles.Button} >Scrap RisingStack!</button>
      </form>
    );
  }
}

export default Form;