import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'services/apiServices';
import { Wrapper } from './App.styled';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    totalImages: 0,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        const resp = await fetchImages(query, page);
        if (resp) {
          if (!resp.totalHits) {
            throw new Error('Bad query');
          }
          this.setState(prev => ({
            images:
              page === 1 ? [...resp.hits] : [...prev.images, ...resp.hits],
            totalImages: resp.totalHits,
            error: null,
          }));
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query, isLoading: true, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  renderButtonOrLoader = () => {
    const { isLoading, images, totalImages } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      !!images.length && images.length < totalImages && (
        <Button onLoadMore={this.handleLoadMore} />
      )
    );
  };

  render() {
    const { images, error } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {!error && <Wrapper>{this.renderButtonOrLoader()}</Wrapper>}
        {error && <ErrorMessage error={error} />}
      </>
    );
  }
}
