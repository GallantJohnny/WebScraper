import React from 'react';

import styles from './Form.module.css';

const Form = (props) => {
  let borderBottom = {};

  if (props.error !== '') borderBottom = { borderBottom: 'solid red 2px' };

  return (
    <form onSubmit={props.onFormSubmitted} className={styles.Form}>
      <label className={styles.Label}>How many pages would you like to scrap?</label>
      {props.error !== '' ? <div className={styles.Error}>Please enter a number!</div> : null}
      <input
        disabled={props.isLoading}
        onChange={props.onInputChange}
        value={props.value}
        className={styles.Input}
        name="numOfPages"
        type="number"
        placeholder="e.g. 3"
        min="0"
        max={props.maxNumOfPages}
        style={borderBottom}
      >
      </input>
      <button disabled={props.isLoading} className={styles.Button} >Scrap RisingStack!</button>
    </form>
  );
}

export default Form;