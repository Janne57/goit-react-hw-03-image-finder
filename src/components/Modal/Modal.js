import css from '../Modal/Modal.module.css';
const { Component } = require('react');
const { createPortal } = require('react-dom');


export default class Modal extends Component {
  modalRoot = document.querySelector('#modal-root');
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown )
  }

  componentWillUnmount() {
    window.removeEventListener('keydown',this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
       this.props.onClose(); 
    }
}

handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
        this.props.onClose();
    }
}

  render() {
    return createPortal(
      <div className={css.modal__backdrop} onClick={this.handleBackdropClick}>
        <div className={css.modal__content}>
          <img src={this.props.dataForModal.webformatURL} alt="" className={css.modal__img} />
          {/* для largeImageURL */}
          {/* <img src={this.props.largeImageURL} alt="" className={css.modal__img} /> */}
        </div>
      </div>,
      this.modalRoot
    );
  }
}
