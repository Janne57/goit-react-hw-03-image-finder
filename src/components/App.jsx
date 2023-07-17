import { Component } from 'react';
import Modal from './/Modal/Modal.js';
import Searchbar from './Searchbar/Searchbar.js';
import ImageGallery from './/ImageGallery/ImageGallery.js';
import ImageGalleryItem from './/ImageGalleryItem/ImageGalleryItem.js';
import ButtonLoadMore from './ButtonLoadMore/ButtonLoadMore.js';
import css from './/App.module.css';
// import * as ImageService from '..//service/img-service.js';
// import * as basicLightbox from 'basiclightbox';
import { ColorRing } from 'react-loader-spinner';



export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    isBtnLoadVisible: false,
    isShowModal: false,
    dataForModal: null,
    largeImageURL: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, images, page } = this.state;

    if ((prevState.query !== query && query !== '') || prevState.page != page) {
      try {
        this.setState({ loading: true });
        //1 вариант
        // const { hits } = await ImageService.getImage({ query, page });
        // this.setState({ images: hits });

        // const images = await ImageService.getImage({ query, page });
        // this.setState({ images });

        //2 вариант через Fetch
        await fetch(
          `https://pixabay.com/api/?q=${query}&key=36926934-069e003b546c638e37e68c3ce&image_type=photo&page=${page}&orientation=horizontal&per_page=12`
        )
          .then(res => res.json())
          .then(images =>
            this.setState(prevState => ({
              images: [
                ...prevState.images,
                ...this.getNormalizedImages(images.hits),
              ],
              isBtnLoadVisible: page < Math.ceil(images.total / 12),
              
            }))
          );
      } catch (error) {
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  //получаем массив с необходимыми свойствами
  getNormalizedImages(array) {
    return array.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));
  }

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('page', this.state.page);
  };

  handleFormSubmit = query => {
    console.log('query', query);
    this.setState({ query, images: [], page: 1 });
  };

  handleImageClick = e => {
    this.setState({
      isShowModal: true,
      // largeImageURL: this.state.images.largeImageURL,
      dataForModal: { webformatURL: e.target.src,},
    });
  };


  toggleModal = () => {
    // this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
    this.setState(({ isShowModal }) => ({ isShowModal: false }));
  };

  render() {

    return (
      <div
        style={{
          // height: '100vh',
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />

        {this.state.images.length !== 0 && (
          <ImageGallery>
            <ImageGalleryItem
              dataArr={this.state.images}
              onImageClick={this.handleImageClick}
            />
          </ImageGallery>
        )}
        {this.state.loading &&
          ((<p>LOADING...</p>,
          <div className={css.spiner}>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            </div>
          ))}
        
        {this.state.isBtnLoadVisible && !this.state.loading && (
          <ButtonLoadMore onLoadMoreClick={this.handleLoadMoreClick} />
        )}
        {this.state.isShowModal && (
          <Modal
            dataForModal={this.state.dataForModal}
            urlLarge={this.state.largeImageURL}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}




















// toggleModal = () => {
  //   this.setState(state => ({isShowModal: !state.isShowModal}))
  // }

  // toggleModal = () => {
  //   this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  // };