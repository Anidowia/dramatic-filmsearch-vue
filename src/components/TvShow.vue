<template>
    <div class="col-xs-6">
        <ul class="now-playing-movies">
        <li v-for="movie in movies" :key="movie.id" class="movie-item">
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
    <div class="filter-menu mobile">
        <h2>POPULAR SERIES</h2>
        <form >
        <div class="panel panel-mobile">
            <div class="panel-heading" role="tab" id="headingFiltersMobile">
            <a class="panel-title accordion-toggle" role="button" data-toggle="collapse" href="#collapseFiltersMobile" aria-expanded="false" aria-controls="collapseFiltersMobile">
                Filter
            </a>
            <div class="panel-body">
                <hr />
                <button class="btn btn-primary" type="submit" @submit.prevent="applyFilters">Apply Filters</button>
                <a class="btn btn-sm btn-link pull-right" href="#">Clear Selections</a>
            </div>
            </div>
            <div id="collapseFiltersMobile" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingFiltersMobile">
            <div class="panel-body">
                <div class="panel-group" id="filter-menu-mobile" role="tablist" aria-multiselectable="true">
                <div class="panel panel-mobile">
                    <div class="panel-heading" role="tab" id="headingOneMobile">
                    <a class="panel-title accordion-toggle" role="button" data-toggle="collapse" data-parent="#filter-menu-mobile" href="#collapseOneMobile" aria-expanded="true" aria-controls="collapseOneMobile">
                        Genres
                    </a>
                    </div>
                    <div id="collapseOneMobile" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOneMobile">
                    <div class="panel-body">
                        <div class="checkbox"><label><input type="checkbox" name="career_state[]" value="recent_graduate">Comedy</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="career_state[]" value="imposter_syndrome">Crime</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="career_state[]" value="wise_old_head">Documentary</label></div> 
                        <div class="checkbox"><label><input type="checkbox" name="career_state[]" value="recent_graduate">Animation</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="career_state[]" value="recent_graduate">Drama</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="career_state[]" value="recent_graduate">Family</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="career_state[]" value="recent_graduate">Kids</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="career_state[]" value="recent_graduate">War & Politics</label></div>
                    </div>
                    </div>
                </div>
                <div class="panel panel-mobile">
                    <div class="panel-heading" role="tab" id="headingTwoMobile">
                    <a class="panel-title accordion-toggle collapsed" role="button" data-toggle="collapse" data-parent="#filter-menu-mobile" href="#collapseTwoMobile" aria-expanded="false" aria-controls="collapseTwoMobile">
                        Certification
                    </a>
                    </div>
                    <div id="collapseTwoMobile" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwoMobile">
                    <div class="panel-body">
                        <div class="checkbox"><label><input type="checkbox" name="topic[]" value="politics">NR</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="topic[]" value="religion">TV-Y</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="topic[]" value="music">TV-Y7</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="topic[]" value="music">TV-G</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="topic[]" value="music">TV-14</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="topic[]" value="music">TV-MA</label></div>
                    </div>
                    </div>
                </div>
                <div class="panel panel-mobile">
                    <div class="panel-heading" role="tab" id="headingThreeMobile">
                    <a class="panel-title accordion-toggle collapsed" role="button" data-toggle="collapse" data-parent="#filter-menu-mobile" href="#collapseThreeMobile" aria-expanded="false" aria-controls="collapseThreeMobile">
                        Availabilities
                    </a>
                    </div>
                    <div id="collapseThreeMobile" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThreeMobile">
                    <div class="panel-body">
                        <div class="checkbox"><label><input type="checkbox" name="format[]" value="magazine">Stream</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="format[]" value="website">Free</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="format[]" value="vine">Ads</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="format[]" value="tweet">Rent</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="format[]" value="tweet">Buy</label></div>
                    </div>
                    </div>
                </div>
                <div class="panel panel-mobile">
                    <div class="panel-heading" role="tab" id="headingFourMobile">
                    <a class="panel-title accordion-toggle collapsed" role="button" data-toggle="collapse" data-parent="#filter-menu-mobile" href="#collapseFourMobile" aria-expanded="false" aria-controls="collapseFourMobile">
                        Status
                    </a>
                    </div>
                    <div id="collapseFourMobile" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFourMobile">
                    <div class="panel-body">
                        <div class="checkbox"><label><input type="checkbox" name="status[]" value="single">Single</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="status[]" value="married">Married</label></div>
                        <div class="checkbox"><label><input type="checkbox" name="status[]" value="its_complicated">It's complicated</label></div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </form>
    </div>
    </div>
</template>

<script>
import { searchMovies, getNowPlayingMovies, getMostPopularMovieOrTVShow } from '@/api';
import { ref } from 'vue'; 
export default {
  name: 'TvShow',
  setup() {
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
      nowPlayingMovies,
    };
  },
  data() {
    return {
      movies: [],
      mostPopularItem: null,
      selectedGenres: [], 
    selectedCertifications: [], 
    selectedAvailabilities: [], 
    selectedStatus: [],
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
    }
  },
  applyFilters() {
    const filteredMovies = this.movies.filter((movie) => {
    // Фильтрация по жанрам
    if (this.selectedGenres.length > 0 && !this.selectedGenres.includes(movie.genre)) {
      return false;
    }
    // Фильтрация по сертификации (certification)
    if (this.selectedCertifications.length > 0 && !this.selectedCertifications.includes(movie.certification)) {
      return false;
    }
    // Фильтрация по доступности (availability)
    if (this.selectedAvailabilities.length > 0 && !this.selectedAvailabilities.includes(movie.availability)) {
      return false;
    }
    // Фильтрация по статусу
    if (this.selectedStatus.length > 0 && !this.selectedStatus.includes(movie.status)) {
      return false;
    }
    return true; // Если фильм соответствует всем выбранным фильтрам
  });

  // Обновите список фильмов
  this.movies = filteredMovies;
  },
};
</script>

<style>
.filter-menu  {
    margin-left: 50px; 
    margin-right: 50px; 
}
/*** Accordion Toggles ***/
.panel-heading {
  position: relative;
}
.panel-heading .accordion-toggle:after {
  font-family: 'Glyphicons Halflings';
  content: "\e260";
  position: absolute;
  right: 16px;
}
.panel-heading .accordion-toggle.collapsed:after {
  font-family: 'Glyphicons Halflings';
  content: "\e259";
}
/*** Filter Menu ***/
/* Panels */
.filter-menu .panel {
  border-radius: 0;
  border: 1px solid #eeeeee;
}
.filter-menu .panel-heading {
  background: #fff;
  padding: 0;
}
.filter-menu .panel-title {
  color: #333333;
  font-weight: bold;
  display: block;
  padding: 16px;
}
.filter-menu a.panel-title {
  color: #333333;
}
.filter-menu a.panel-title:hover,
.filter-menu a.panel-title:focus {
  color: #333333;
  text-decoration: none;
}
.filter-menu .panel-body {
  padding: 16px;
}
/* Inner Panels */
.filter-menu .panel-group {
  margin: -16px;
}
.filter-menu .panel-group .panel-title {
  background: #eee;
  transition: color, 0.5s, ease;
}
.filter-menu .panel-group .panel-title:hover {
  color: #333333;
  text-decoration: none;
  background: #777777;
}
.filter-menu .panel-group .panel + .panel {
  margin-top: 0;
}
/*** Filter Menu - Mobile ***/
/* Panels - Mobile */
.filter-menu.mobile .btn-link {
  color: #f9f9f9;
}
.filter-menu.mobile hr {
  margin-top: 0;
  border-top-color: #4B6473;
}
.filter-menu.mobile .panel {
    width: 40vh;
}
.filter-menu.mobile .panel-group .panel-heading + .panel-collapse > .panel-body {
  border-color: #4B6473;
}
.filter-menu.mobile .panel {
  border-color: #4B6473;
  background: #30404a;
  color: #f9f9f9;
}
.filter-menu.mobile .panel-heading {
  background: #30404a;
}
.filter-menu.mobile a.panel-title {
  color: #f9f9f9;
}
.filter-menu.mobile a.panel-title:hover {
  color: #f9f9f9;
}
.filter-menu.mobile .panel-group .panel {
  border-color: #4B6473;
}
.filter-menu.mobile .panel-group .panel-title {
  background: #3f5460;
}
.filter-menu.mobile .panel-group .panel-title:hover {
  color: #f9f9f9;
  background: #30404a;
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
    position: absolute;
  list-style-type: disc;
  margin-left: 422px !important;
  margin-top: 45px ;
}

.btn-primary {
  background-color: #ffc907;
  color: black;
  border-color: #000;
}

.btn-primary:hover,
.btn-primary:active,
.btn-primary:focus,
.btn-primary.active {
  background: #000 !important;
  color: #ffffff !important;  
  border-color: #eee !important;
}

</style>