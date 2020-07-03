import React, { Component } from 'react';

import styles from './Form.module.css';

class Form extends Component {
  state = {}

  render() {
    return (
      <form className={styles.Form}>
        <label className={styles.Label}>How many pages would you like to scrap?</label>
        <input className={styles.Input} name="numOfPages" type="number" placeholder="e.g. 3" min="0"></input>
        <button className={styles.Button} >Scrap RisingStack!</button>
      </form>
    );
  }
}

export default Form;