import s from './MovieDetails.module.css';

const MovieDetails = ({ movieData }) => {
  const { title, release_date, poster_path, vote_average, overview, genres } =
    movieData;
  const genresView = genres.map(genre => genre.name).join(' ');
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const date = new Date(release_date).getFullYear();
  const defaultImg =
    'https://dummyimage.com/300x450/cdcdcd/000.jpg&text=No+poster';

  return (
    <>
      <div className={s.wrapper}>
        <div>
          <img
            className={s.img}
            src={poster_path ? posterUrl : defaultImg}
            alt="poster"
          />
        </div>
        <div>
          <p className={s.title}>
            {title} ({date})
          </p>
          <p>User score: {vote_average}</p>
          <p className={s.view}>Overview</p>
          <p>{overview}</p>
          <p className={s.view}>Genres</p>
          <p>{genresView}</p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default MovieDetails;
