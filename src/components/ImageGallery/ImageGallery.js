import { Component } from 'react';
import css from '../ImageGallery/ImageGallery.module.css';


class ImageGallery extends Component {
  render() {
    const { children } = this.props;

    return (
      <ul className={css.imageGallery}>
      {children}
      </ul>
    );
  }
}

export default ImageGallery;