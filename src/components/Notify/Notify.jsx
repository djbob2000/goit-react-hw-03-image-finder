import React from 'react';
import css from './Notify.module.css';

const Notify = ({ message }) => {
  return <p className={css.Notify}>{message}</p>;
};

export default Notify;
