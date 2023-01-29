import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'services/apiServices';
import { Wrapper } from './App.styled';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchImages(query, page);
        if (resp) {
          if (!resp.totalHits) {
            throw new Error('Bad query');
          }
          setImages(prevImages =>
            page === 1 ? [...resp.hits] : [...prevImages, ...resp.hits]
          );
          setTotalImages(resp.totalHits);
          setError(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchData();
    }
  }, [page, query]);

  const handleSubmit = query => {
    setQuery(query);
    setIsLoading(true);
    setPage(1);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const renderButtonOrLoader = () => {
    return isLoading ? (
      <Loader />
    ) : (
      !!images.length && images.length < totalImages && (
        <Button onLoadMore={handleLoadMore} />
      )
    );
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {!error && <Wrapper>{renderButtonOrLoader()}</Wrapper>}
      {error && <ErrorMessage error={error} />}
    </>
  );
};
