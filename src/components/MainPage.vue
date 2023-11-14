<template>
  <div class="film-page">
    <div class="intro-image">
      <div class="image-container">
        <img
          :src="mostPopularItem.poster_path"
          alt="Most Popular Item Poster"
          v-if="mostPopularItem"
        />
        <div class="text-over-image">
          <h1>Welcome.</h1>
          <h2>
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
        </div>
      </div>
    </div>
    <h1>MOVIES YOU MUST WATCH</h1>
    <h2 v-if="currentUser">
      Welcome, {{ currentUser.email }}. <router-link to="/"></router-link>
    </h2>
    <h2 v-for="user in users" :key="user.id">dear {{ user.email }}</h2>
    <div class="carousel">
      <ul class="movie-list">
        <li v-for="movie in movies" :key="movie.id" class="movie-item">
          <router-link :to="getFilmPageUrl(movie.id)">
            <div class="movie-image">
              <img
                :src="getMoviePosterUrl(movie.poster_path)"
                alt="Movie Poster"
              />
            </div>
          </router-link>
          <div class="movie-details">
            <h2 class="movie-title">{{ movie.title }}</h2>
            <p class="movie-year">{{ getMovieYear(movie.release_date) }}</p>
            <div class="movie-rating">
              <img
                src="../assets/rating.png"
                alt="Rating"
                class="rating-image"
              />
              {{ Math.round(movie.vote_average * 10) / 10 }}
            </div>
          </div>
        </li>
      </ul>
      <h1>JOIN TODAY</h1>
      <h3>
        Get access to maintain your own custom personal lists, track what you've
        seen and search and filter for what to watch <br />next—regardless if
        it's in theatres, on TV or available on popular streaming services like
        Netflix, Disney Plus, <br />Amazon Prime Video, Hayu, and Crave.
        <ul>
          <li>
            <h4>Enjoy TMDB ad free</h4>
          </li>
          <li>
            <h4>Maintain a personal watchlist</h4>
          </li>
          <li>
            <h4>
              Filter by your subscribed streaming services and find something to
              watch
            </h4>
          </li>
          <li>
            <h4>Log the movies and TV shows you've seen</h4>
          </li>
          <li>
            <h4>Build custom lists</h4>
          </li>
          <li>
            <h4>Contribute to and improve our database</h4>
          </li>
        </ul>
      </h3>
      <h1>NOW IN CINEMAS</h1>
      <ul class="now-playing-movies">
        <li
          v-for="movie in nowPlayingMovies"
          :key="movie.id"
          class="movie-item"
        >
          <router-link :to="getFilmPageUrl(movie.id)">
            <div class="movie-image">
              <img
                :src="getMoviePosterUrl(movie.poster_path)"
                alt="Movie Poster"
              />
            </div>
          </router-link>
          <div class="movie-details">
            <h2 class="movie-title">{{ movie.title }}</h2>
            <p class="movie-year">{{ getMovieYear(movie.release_date) }}</p>
            <p class="movie-rating">
              <img
                src="../assets/rating.png"
                alt="Rating"
                class="rating-image"
              />
              {{ Math.round(movie.vote_average * 10) / 10 }}
            </p>
          </div>
        </li>
      </ul>
      <button class="chatbox-button" @click="toggleChatbox">CHAT</button>
      <div class="chatbox-container" v-if="showChatbox">
        <label class="chat-btn" for="check">
          <i class="fa fa-commenting-o comment"></i>
          <i class="fa fa-close close"></i>
        </label>
        <div class="wrapper">
          <div class="header">
            <h6>Let's Chat - Online</h6>
          </div>
          <div class="text-center p-2">
            <span>Please fill out the form to start chat!</span>
          </div>
          <div class="chat-form">
            <input
              type="text"
              class="form-control"
              placeholder="Name"
              v-model="name"
            />
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              v-model="email"
            />
            <textarea
              class="form-control"
              placeholder="Your Text Message"
              v-model="message"
            ></textarea>
            <button @click="submitForm" class="btn btn-success btn-block">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoadUsers, db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  searchMovies,
  getNowPlayingMovies,
  getMostPopularMovieOrTVShow,
} from "@/api";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "SearchPage",
  computed: {
    currentUser() {
      const store = useStore();
      return store.state.currentUser;
    },
  },
  setup() {
    const users = useLoadUsers();
    const nowPlayingMovies = ref([]);
    async function fetchNowPlayingMovies() {
      try {
        const movies = await getNowPlayingMovies();
        nowPlayingMovies.value = movies;
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
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
      showChatbox: false,
      name: "",
      email: "",
      message: "",
    };
  },
  async mounted() {
    try {
      this.movies = await searchMovies();
    } catch (error) {
      console.error("Error searching movies:", error);
    }
    this.mostPopularItem = await getMostPopularMovieOrTVShow();
    const socket = new WebSocket("ws://localhost:3001");
    socket.addEventListener("message", (event) => {
      const data = event.data;
      if (
        data.includes("name") &&
        data.includes("email") &&
        data.includes("message")
      ) {
        this.updateFormFromConsole(JSON.parse(data));
      }
    });
  },
  methods: {
    getMoviePosterUrl(posterPath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
      }
      return "";
    },
    getMovieYear(releaseDate) {
      if (releaseDate) {
        return releaseDate.slice(0, 4);
      }
      return "";
    },
    getFilmPageUrl(id) {
      return { name: "FilmPage", params: { id: id } };
    },
    toggleChatbox() {
      this.showChatbox = !this.showChatbox;
    },
    submitForm() {
      if (this.name && this.email && this.message) {
        const messageData = {
          text: this.message,
          name: this.name,
          email: this.email,
        };

        const chatboxCollection = collection(db, "chatbox");
        addDoc(chatboxCollection, messageData);

        fetch("http://localhost:3000/addMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        })
          .then(() => {
            alert("Sent successfully!");
            this.name = "";
            this.email = "";
            this.message = "";
          })
          .catch((error) => {
            console.error("Error while sending:", error);
          });
      }
    },
    async updateFormFromConsole(data) {
      this.name = data.name || "";
      this.email = data.email || "";
      this.message = data.message || "";
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
.text-over-image h1,
h2 {
  font-weight: bold;
}
.image-container::before {
  content: "";
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
  margin-left: -31px !important;
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
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 19px;
  line-height: 20px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-rating {
  font-family: "Montserrat";
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
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 13px;
  line-height: 13px;
  color: #fff;
}

.now-playing-movies {
  list-style-type: disc;
  margin-left: 20px;
}

/* chatbox */
.chatbox-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ffc907;
  color: rgb(0, 0, 0);
  border: none;
  font-weight: bold;
  border-radius: 18.5px !important;
  cursor: pointer;
  z-index: 1000;
}

.chatbox-button:hover {
  background: #000 !important;
  color: #ffffff !important;
}

.chatbox-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  z-index: 1000;
}

.btn-success {
  background: linear-gradient(
    90.53deg,
    rgba(0, 0, 0, 0.75) 0.45%,
    rgba(102, 80, 165, 0.75) 105.51%
  );
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
}
</style>
