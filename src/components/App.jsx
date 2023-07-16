import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar.js';
// import ImageGallery from './/ImageGallery/ImageGallery.js';
// import * as ImageService from '..//service/img-service.js';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
  };

  handleFormSubmit = query => {
    console.log('query', query);
    this.setState({ query, images: [], page: 1 });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    // const { query, images, page } = this.state;

    // console.log('this.state.query', query);

    if (prevState.query !== query && query !== '') {
      try {
        //1 вариант
        // const { result } = await ImageService.getImage({ query, page });
        // this.setState({ images: result });

        //2 вариант через Fetch
        const { hits } = await fetch(
          `https://pixabay.com/api/?q=${query}&key=36926934-069e003b546c638e37e68c3ce&image_type=photo&page=${page}&orientation=horizontal&per_page=12`
        )
          .then(res => res.json())
          .then(images => this.setState({ images: hits }));

          //так выводится
          // await fetch(
          //   `https://pixabay.com/api/?q=${query}&key=36926934-069e003b546c638e37e68c3ce&image_type=photo&page=${page}&orientation=horizontal&per_page=12`
          // )
          //   .then(res => res.json())
          //   .then(images => this.setState({ images }));
           
      } catch (error) {}
    }
  }

  render() {
    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* <ImageGallery query={this.state.query} /> */}
        <ul className="gallery">
          {/* <ImageGalleryItem /> */}
          {/* {!this.state.query && <li>{this.props.query}</li>} */}
          {/* {this.state.images.map(image => {
            return (
              <li>
                <img src={image.hits} alt="" />
              </li>
            );
          })} */}

          {/* <li>{this.state.query}</li> */}
        </ul>
      </div>
    );
  }
}
