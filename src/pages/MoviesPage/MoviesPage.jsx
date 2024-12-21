import MovieList from '../../components/MovieList/MovieList';
import MovieSearch from '../../components/MovieSearch/MovieSearch';
import { useEffect, useState } from 'react';
import { getMovies } from '../../services/movieAPI';
import Loader from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MoviesPage = () => {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleSearch = movie => {
    setParams({ movie: movie });
  };

  const movie = params.get('movie');

  useEffect(() => {
    if (!movie) return;

    const handleMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getMovies(movie);
        setMovies(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleMovies();
  }, [movie]);

  return (
    <div>
      <MovieSearch onSearch={handleSearch} />
      <MovieList movies={movies} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
};

export default MoviesPage;
