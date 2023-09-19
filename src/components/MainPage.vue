<template>
  <div class = "film-page">
    <h1>MOVIES YOU MUST WATCH</h1>
    <div class="carousel">
      <ul class="movie-list">
        <li v-for="movie in movies.slice(0, 7)" :key="movie.id" class="movie-item">
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
<style>
.film-page {
  margin-left: 50px; 
}
</style>
<script>
import { searchMovies } from '@/api';

export default {
  name: 'SearchPage',
  data() {
    return {
      movies: [],
    };
  },
  async mounted() {
    try {
      this.movies = await searchMovies();
    } catch (error) {
      console.error('Error searching movies:', error);
    }
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
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.movie-rating {
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  margin: 0;
  color: #ffc907;
}
.rating-image {
  width: 28px;
  height: 14px;
  margin-bottom: -3px;
}
.movie-year {
  font-family: 'Montserrat';
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  margin: 0;
  color: #fff;
}

</style>
