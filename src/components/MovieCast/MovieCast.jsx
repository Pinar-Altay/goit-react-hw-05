import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastById } from '../../services/movieAPI';
import s from './MovieCast.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const defaultImg =
    'https://dummyimage.com/100x150/cdcdcd/000.jpg&text=No+poster';

  useEffect(() => {
    if (!movieId) return;

    const getMovieCast = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getCastById(movieId);
        setCasts(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  return (
    <>
      <ul className={s.casts}>
        {casts.map(cast => (
          <li key={cast.id}>
            <p>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                    : defaultImg
                }
                alt="actor"
              />
            </p>
            <p>
              <span>Actor:</span> {cast.name}
            </p>
            <p>
              <span>Character:</span> {cast.character}
            </p>
          </li>
        ))}
      </ul>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </>
  );
};

export default MovieCast;
