import { Component } from 'react';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import css from '../ImageGallery/ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    query: null,
    loading: false,
  };


  render() {
    const {query, loading} = this.state;

    return (
      <div> {loading && <div>Loading....</div>}
      <ul className="gallery">
        {/* <ImageGalleryItem /> */}
        {/* {!this.state.query && <li>{this.props.query}</li>} */}
        <li>{this.props.query}</li>
        {/* <li>{this.state.query}</li> */}
      </ul>
      </div>
    );
  }
}
