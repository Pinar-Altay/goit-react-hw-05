import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import { fetchMovieCast } from '../../service/api';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();  
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      if (!movieId) {
        setError('Movie ID is not available');
        setLoading(false);
        return;
      }
      console.log('Fetching cast for movieId:', movieId);  
      try {
        const castData = await fetchMovieCast(movieId);
        console.log('Fetched cast data:', castData);  
        setCast(castData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cast:', err);  
        setError('Failed to load cast');
        setLoading(false);
      }
    };

    getCast();
  }, [movieId]);  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className={css.castList}>
      {cast.length > 0 ? (
        cast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              className={css.actorImage}
            />
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </li>
        ))
      ) : (
        <p>No cast available.</p>
      )}
    </ul>
  );
};

export default MovieCast;
