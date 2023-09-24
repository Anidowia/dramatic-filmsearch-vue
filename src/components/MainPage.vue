<template>
  <div class = "film-page">
    <div class="intro-image">
      <div class="image-container">
        <img :src="mostPopularItem.poster_path" alt="Most Popular Item Poster" v-if="mostPopularItem">
        <div class="text-over-image">
          <h1>Welcome.</h1> 
          <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
        </div>
      </div>
    </div>
    <h1>MOVIES YOU MUST WATCH</h1>
    <h2 v-for="user in users" :key="user.id">dear {{ user.email }}</h2>
    <div class="carousel">
      <ul class="movie-list">
        <li v-for="movie in movies" :key="movie.id" class="movie-item">
          <router-link :to="getFilmPageUrl(movie.id)">
            <div class="movie-image">
              <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster">
            </div>
          </router-link>
          <div class="movie-details">
            <h2 class="movie-title">{{ movie.title }}</h2>
            <p class="movie-year">{{ getMovieYear(movie.release_date) }}</p>
            <div class="movie-rating">
              <img src="../assets/rating.png" alt="Rating" class="rating-image">
              {{ movie.vote_average }}
            </div>
          </div>
        </li>
      </ul>
      <h1>JOIN TODAY</h1>
      <h3>Get access to maintain your own custom personal lists, track what you've seen and search and filter for what to watch 
      <br>brnext—regardless if it's in theatres, on TV or available on popular streaming services like Netflix, Disney Plus, 
      <br>Amazon Prime Video, Hayu, and Crave.
      <ul>
        <li>
          <h4>
            Enjoy TMDB ad free
          </h4>
        </li>
        <li>
          <h4>
            Maintain a personal watchlist
          </h4>
        </li>
        <li>
          <h4>
            Filter by your subscribed streaming services and find something to watch
          </h4>
        </li>
        <li>
          <h4>
            Log the movies and TV shows you've seen
          </h4>
        </li>
        <li>
          <h4>
            Build custom lists
          </h4>
        </li>
        <li>
          <h4>
            Contribute to and improve our database
          </h4>
        </li>
      </ul>
      </h3>
      <h1>NOW IN CINEMAS</h1>
      <ul class="now-playing-movies">
        <li v-for="movie in nowPlayingMovies" :key="movie.id" class="movie-item">
          <router-link :to="getFilmPageUrl(movie.id)">
            <div class="movie-image">
              <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster">
            </div>
          </router-link>
          <div class="movie-details">
            <h2 class="movie-title">{{ movie.title }}</h2>
            <p class="movie-year">{{ getMovieYear(movie.release_date) }}</p>
            <p class="movie-rating">
              <img src="../assets/rating.png" alt="Rating" class="rating-image">
              {{ movie.vote_average }}
            </p>
          </div>
        </li>
      </ul>
      
    </div>
  </div>
</template>
<script>
import { useLoadUsers } from '@/firebase'; 
import { searchMovies, getNowPlayingMovies, getMostPopularMovieOrTVShow } from '@/api';
import { ref } from 'vue'; 
export default {
  name: 'SearchPage',
  setup() {
    const users = useLoadUsers(); 
    const nowPlayingMovies = ref([]);
    async function fetchNowPlayingMovies() {
      try {
        const movies = await getNowPlayingMovies();
        nowPlayingMovies.value = movies;
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    }
    fetchNowPlayingMovies();
    return {
      users,
      nowPlayingMovies,
    };
  },
  data() {
    return {
      movies: [],
      mostPopularItem: null,
    };
  },
  async mounted() {
    try {
      this.movies = await searchMovies();
    } catch (error) {
      console.error('Error searching movies:', error);
    }
    this.mostPopularItem = await getMostPopularMovieOrTVShow();
  },
  methods: {
    getMoviePosterUrl(posterPath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      }
      return '';
    },
    getMovieYear(releaseDate) {
      if (releaseDate) {
        return releaseDate.slice(0, 4);
      }
      return '';
    },
    getFilmPageUrl(id) {
      return { name: 'FilmPage', params: { id: id } };
    },
  },
};
</script>

<style>
.intro-image {
  margin-right: 15px;
}
.image-container {
  width: 100%; 
  height: 350px; 
  overflow: hidden; 
}
.text-over-image {
  position: relative;
  bottom: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white; 
  padding: 20px; 
  z-index: 2; 
}
.text-over-image h1, h2{
font-weight: bold;
}
.image-container::before {
  content: '';
  position: absolute;
  top: 93px;
  left: 0;
  width: 100%; 
  height: 370px; 
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1; 
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  z-index: 2; 
}
h1 {
  margin-bottom: 20px;
  margin-top: 20px;
}
.film-page {
  margin-left: 50px; 
}
.now-playing-movies {
  margin-left: -31px!important;
}
.carousel {
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}

.movie-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  width: fit-content;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
}

.movie-item {
  position: relative;
  display: inline-block;
  width: 168px;
  height: 237px;
  margin-right: 50px;
}

.movie-image img {
  width: 168px;
  height: 237px;
  object-fit: cover;
  border-radius: 7px;
  filter: drop-shadow(6px 6px 6px rgba(0, 0, 0, 0.36));
}

.movie-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

.movie-title {
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 19px;
  line-height: 20px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-rating {
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 15px;
  line-height: 13px;
  margin: 0;
  color: #ffc907;
}
.rating-image {
  width: 31px;
  height: 16px;
  margin-bottom: -2px;
}
.movie-year {
  margin-bottom: 2px;
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 13px;
  line-height: 13px;
  color: #fff;
}

.now-playing-movies {
  list-style-type: disc;
  margin-left: 20px;
}
</style>
