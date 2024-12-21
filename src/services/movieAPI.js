import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGI4NGI0ZDE2YWNiODAyMTZlZjNlMTgxNTk3NzVlZCIsIm5iZiI6MTczMzE5MDUyMi4zNzIsInN1YiI6IjY3NGU2MzdhYWY4OWVkNzYyMzdkZWNlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPo15R_75Wh6NaYbAkInu18loCx56sFwX_oDnE2g0EA',
  },
};

export const getTrending = async () => {
  const { data } = await axios.get(
    '/trending/movie/day?language=en-US',
    options
  );
  return data.results;
};

export const getMovies = async query => {
  const { data } = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data.results;
};

export const getMovieById = async id => {
  const { data } = await axios.get(`/movie/${id}?language=en-US`, options);
  return data;
};

export const getCastById = async id => {
  const { data } = await axios.get(
    `/movie/${id}/credits?language=en-US`,
    options
  );
  return data.cast;
};

export const getReviewById = async id => {
  const { data } = await axios.get(
    `/movie/${id}/reviews?language=en-US&page=1`,
    options
  );
  return data.results;
};
