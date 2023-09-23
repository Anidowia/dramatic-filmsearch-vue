import axios from 'axios';

const API_KEY = '0c5b3b41d086a7ac043870cb4fe001ea';

export const searchMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const SearchMoviesBySearch = async (query) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
    );
    const { title, poster_path, overview, vote_average, credits } = response.data;
    const cast = credits.cast.map((actor) => ({
      name: actor.name,
      profile_path: actor.profile_path,
    }));

    return {
      title,
      poster_path,
      description: overview,
      vote_average,
      cast,
      genres: response.data.genres.map((genre) => genre.name),
      language: response.data.original_language,
      subtitles: response.data.spoken_languages.map((language) => language.name),
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
export const getMovieVideos = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    return response.data.results.map((video) => ({
      type: video.type,
      key: video.key,
    }));
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    return [];
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    return [];
  }
};

export const getNowAiringTVShows = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching latest TV shows:', error);
    return [];
  }
};

export const getMostPopularMovieOrTVShow = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    );
    const results = response.data.results;
    if (results.length > 0) {
      const mostPopularItem = results[0];
      const posterPath = mostPopularItem.poster_path;
      const posterUrl = `https://image.tmdb.org/t/p/original${posterPath}`;
      return {
        title: mostPopularItem.title || mostPopularItem.name,
        poster_path: posterUrl, 
        media_type: mostPopularItem.media_type,
      };
    } else {
      console.log('The list of popular series is empty.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching latest series:', error);
    return null;
  }
};
