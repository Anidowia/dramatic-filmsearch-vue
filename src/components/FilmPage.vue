<template>
  <div class="film-page">
    <div v-if="movie">
      <h2>{{ movie.title }}</h2>
      <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" />
      <p>Description: {{ movie.description }}</p>
      <p>Rating: {{ movie.vote_average }}</p>
      <p>Cast:</p>
      <ul class="cast-list">
        <li
          v-for="actor in movie.cast.slice(0, 4)"
          :key="actor.name"
          class="actor-item"
        >
          <img
            :src="getActorProfileUrl(actor.profile_path)"
            alt="Actor Photo"
            class="actor-photo"
          />
          <span>{{ actor.name }}</span>
        </li>
      </ul>
      <p>Genres: {{ movie.genres.join(", ") }}</p>
      <p>Language: {{ movie.language }}</p>
      <p>Subtitles: {{ movie.subtitles.join(", ") }}</p>
      <button @click="watchTrailer">Watch Trailer</button>
    </div>
    <div v-if="showTrailerModal">
      <div class="modal">
        <iframe :src="trailerUrl" frameborder="0" allowfullscreen></iframe>
        <span class="close-button" @click="closeTrailerModal">&#10005;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMovieDetails, getMovieVideos } from "@/api";

export default {
  name: "FilmPage",
  data() {
    return {
      movie: null,
      showTrailerModal: false,
      trailerUrl: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      this.movie = await getMovieDetails(id);
      const videos = await getMovieVideos(id);
      const trailer = videos.find((video) => video.type === "Trailer");
      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  },
  methods: {
    getMoviePosterUrl(posterPath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      }
      return "";
    },
    getActorProfileUrl(profilePath) {
      if (profilePath) {
        return `https://image.tmdb.org/t/p/w200${profilePath}`;
      }
      return "";
    },
    watchTrailer() {
      this.showTrailerModal = true;
    },
    closeTrailerModal() {
      this.showTrailerModal = false;
    },
  },
};
</script>

<style>
.film-page {
  margin-left: 50px;
}

.cast-list {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.actor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.actor-photo {
  box-sizing: border-box;
  width: 110px;
  height: 145px;
  border: 1px solid #ffffff;
  border-radius: 9px;
}

.actor-item span {
  margin-top: 5px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal iframe {
  width: 80vw;
  height: calc(80vw / 1.77); /* Assuming the video has a 16:9 aspect ratio */
  max-width: 80%;
  max-height: 80vh;
}

@media (max-width: 768px) {
  .modal iframe {
    width: 90vw;
    height: calc(90vw / 1.77); /* Assuming the video has a 16:9 aspect ratio */
    max-width: 90%;
    max-height: 70vh;
  }
}

.close-button {
  position: absolute;
  top: 70px;
  right: 150px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
</style>
