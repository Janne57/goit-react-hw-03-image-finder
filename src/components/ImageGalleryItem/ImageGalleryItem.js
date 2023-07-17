import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export default function ImageGalleryItem({ dataArr, onImageClick }) {
  return (
    <>
      {dataArr.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <li className={css.imageGalleryItem} key={id}>
            <img
              className={css.imageGalleryItem__image}
              src={webformatURL}
              alt=""
              onClick={onImageClick}
            />
          </li>
        );
      })}
    </>
  );
}

