import css from '../ButtonLoadMore/ButtonLoadMore.module.css';


export default function ButtonLoadMore({onLoadMoreClick }) {
    return (
        <div>
        <button type='button' className={css.button} onClick={onLoadMoreClick}>
          Load more
        </button>
        </div>
      );
}
