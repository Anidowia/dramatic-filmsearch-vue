<template>
  <header class="header">
    <router-link to="/">
      <img src="../assets/dramatic.png" alt="Logo" class="logo">
    </router-link>
    <nav class="navigation">
      <ul>
        <li> <router-link to="/"><a>HOME</a></router-link></li> 
        <li> <router-link to="/tvshow"><a>TV SHOWS</a></router-link></li> 
        <li><a href="#">MOVIES</a></li>
        <li> <router-link to="/discuss"><a>DISCUSS</a></router-link></li> 
        <li>
          <form class="search-form" @submit.prevent="searchMovies">
            <input type="text" v-model="searchQuery" placeholder="Search">
            <router-link :to="{ path: '/search', query: { q: searchQuery } }">
              <img src="../assets/search.png" alt="Search icon" class="search-icon">
            </router-link>
          </form>
        </li>
        <li class="btn-wrapper">
        <span v-if="isLoggedIn">
          <router-link to="/sign" @click="signOut" class="btn btn-outline"> LOGOUT </router-link>
        </span>
        <span v-else>
        <router-link to="/sign" class="btn btn-outline"> LOGIN </router-link>
      </span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '@/firebase'

const router = useRouter()
const isLoggedIn = ref(false)

onAuthStateChanged(auth, function (user) {
  if (user) {
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

const signOut = () => {
  auth.signOut()
    .then(() => {
      router.push('/');
    })
    .catch(error => {
      console.log(error.code);
    });
};

const searchQuery = ref('')
const searchMovies = () => {
  router.push({ name: 'SearchResult', query: { q: searchQuery.value } })
}
</script>

<style>
.header {
  width: 100%;
  height: 93px;
  background: linear-gradient(90.53deg, rgba(0, 0, 0, 0.75) 0.45%, rgba(102, 80, 165, 0.75) 105.51%);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.logo {
  width: 180px;
  height: 49px;
  object-fit: contain;
  margin-left: 49px;
}

.navigation ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  padding: 49px;
}

.navigation ul li {
  margin: 0 10px;
  flex-shrink: 0;
}

.navigation ul li:first-child {
  margin-left: 0;
}

.navigation ul li:first-child a {
  font-weight: bold;
  margin-left: 147px;
  margin-right: auto;
}

.navigation ul li a {
  color: #fff;
  position: relative;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  padding: 0 10px;
  letter-spacing: 0.04em;
  margin-right: 7px;
  flex-shrink: 0;
}

.navigation ul li a.active,
.navigation ul li a:hover {
  color: #FFC907;
}

.navigation ul li:not(:first-child) a {
  margin-left: 32px;
}

.navigation ul li a::before {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #FFC907;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-out;
}

.navigation ul li a.active::before,
.navigation ul li a:hover::before {
  transform: scaleX(0);
}

.navigation ul li:last-child {
  position: absolute;
  width: 74px;
  height: 17px;
  top: 21px;
}

.navigation ul li:last-child form {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 15px;
}

.search-form {
  display: flex;
  align-items: center;
  margin-left: 85px;
  cursor: pointer;
}
.search-form input[type="text"] {
  position: relative; 
  width: 200px;
  height: 37px;
  background-color: #3B567D;
  color: #fff;
  border: none;
  border-radius: 18.5px;
  padding: 0 40px 0 10px; 
}

.search-icon {
  position: absolute;
  width: 21px;
  height: 21px;
  right: 63px;
  top: -11px;
}

.search-form input[type="text"]::placeholder {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  color: #A2B3CD;
}

.btn-outline {
  width: 99px;
  height: 37px;
  color: #000 !important;
  background-color: #ffc907 !important;
  font-weight: bold;
  border-radius: 18.5px !important;
  line-height: 30px!important; 
  text-align: center!important;
}

.btn-outline:hover,
.btn-outline:active,
.btn-outline:focus,
.btn-outline.active {
  background: #000 !important;
  color: #ffffff !important;  
}
.btn-wrapper {
  margin-left: auto; 
}
</style>