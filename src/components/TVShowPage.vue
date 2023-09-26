<template>
    <div class="film-page">
      <h1>MOVIES YOU MUST WATCH</h1>
      <div class="carousel">
        <ul class="movie-list">
          <li v-for="result in searchResults" :key="result.id" class="movie-item">
            <router-link :to="getFilmPageUrl(result.id)">
              <div class="movie-image">
                <img :src="getImageUrl(result.poster_path)" :alt="result.title">
              </div>
            </router-link>
            <div class="movie-details">
              <h2 class="movie-title">{{ result.title }}</h2>
              <p class="movie-year">{{ getReleaseYear(result.release_date) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { SearchMoviesBySearch } from '@/api';
  
  export default {
    data() {
      return {
        searchQuery: '',
        searchResults: []
      };
    },
    created() {
      this.searchQuery = this.$route.query.q;
      this.searchMoviesBySearch();
    },
    methods: {
      async searchMoviesBySearch() {
        try {
          this.searchResults = await SearchMoviesBySearch(this.searchQuery);
        } catch (error) {
          console.error('Error searching movies:', error);
        }
      },
      getImageUrl(posterPath) {
        if (posterPath) {
          return `https://image.tmdb.org/t/p/w500${posterPath}`;
        } else {
          return '/placeholder-image.jpg';
        }
      },
      getReleaseYear(dateString) {
        if (dateString) {
          const date = new Date(dateString);
          return date.getFullYear();
        } else {
          return 'Unknown';
        }
      },
      getFilmPageUrl(movieId) {
        return `/film/${movieId}`;
      }
    }
  };
  </script>
  
  <style>
  .film-page {
    margin-left: 50px;
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
    font-size: 16px;
    line-height: 20px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  