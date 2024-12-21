import MovieList from '../../components/MovieList/MovieList';
import { useState, useEffect } from 'react';
import { getTrending } from '../../services/movieAPI';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getTrending();
        setMovies(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <MovieList movies={movies} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
};

export default HomePage;
