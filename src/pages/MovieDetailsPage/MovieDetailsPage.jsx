import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieById } from '../../services/movieAPI';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const goBackLink = useRef(location.state ?? '/');

  useEffect(() => {
    if (!movieId) return;

    const getMovie = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getMovieById(movieId);
        setMovieData(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovie();
  }, [movieId]);

  return (
    <>
      <Link className={s.goBtn} to={goBackLink.current}>
        Go back
      </Link>
      {movieData && <MovieDetails movieData={movieData} />}
      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </>
  );
};

export default MovieDetailsPage;
