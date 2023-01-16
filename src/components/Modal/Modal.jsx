import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleToggleModalOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleToggleModalOnEsc);
  }

  handleToggleModalOnEsc = evt => {
    if (evt.key === 'Escape' || evt.target === evt.currentTarget) {
      this.props.toggleModal({ status: false });
    }
  };

  render() {
    const { src, alt } = this.props;

    return (
      <div className={css.Overlay} onClick={this.handleToggleModalOnEsc}>
        <div className={css.Modal}>
          <img className={css.img} src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
