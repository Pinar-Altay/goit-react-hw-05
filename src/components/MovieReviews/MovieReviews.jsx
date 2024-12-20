import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import { fetchMovieReviews } from '../../service/api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      if (!movieId) {
        setError('Movie ID is not available');
        setLoading(false);
        return;
      }
      console.log('Fetching reviews for movieId:', movieId);  
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        console.log('Fetched reviews data:', reviewsData);  
        setReviews(reviewsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);  
        setError('Failed to load reviews');
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={css.reviewsContainer}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={css.review}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieReviews;
