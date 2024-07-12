import axios from 'axios';
import APIConfiguration from './APIConfiguration';

const { TMDB_API_KEY, TMDB_BASE_URL } = APIConfiguration;

export const getNowPlayingMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
