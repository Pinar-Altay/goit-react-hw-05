import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewById } from '../../services/movieAPI';
import s from './MovieReviews.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const getMovieCast = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getReviewById(movieId);
        setReviews(data);
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
      {reviews.length === 0 && <p>we don`t have any reviews for this movie.</p>}
      {
        <ul>
          {reviews.map(review => (
            <li className={s.review} key={review.id}>
              <p className={s.author}>
                <span>Author:</span>
                {review.author}
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      }
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
    </>
  );
};

export default MovieReviews;
