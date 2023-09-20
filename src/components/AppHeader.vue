<template>
  <header class="header">
    <router-link to="/">
      <img src="../assets/dramatic.png" alt="Logo" class="logo">
    </router-link>
    <nav class="navigation">
      <ul>
        <li><a href="#">HOME</a></li>
        <li><a href="#">TV SHOWS</a></li>
        <li><a href="#">MOVIES</a></li>
        <li><a href="#">NEW</a></li>
        <li>
          <form class="search-form">
            <input type="text" v-model="searchQuery" placeholder="Search">
            <router-link :to="{ path: '/search', query: { q: searchQuery } }">
              <img src="../assets/search.png" alt="Search icon" class="search-icon">
            </router-link>
          </form>
        </li>
        <li class="btn-wrapper">
          <router-link to="/login" class="btn btn-outline">LOGIN</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    searchMovies() {
      this.$router.push({ name: 'SearchResult', query: { q: this.searchQuery } });
    }
  }
};
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
  margin-left: 30px;
}

.navigation ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  padding: 0;
}

.navigation ul li {
  margin: 0 10px;
  flex-shrink: 0;
}

.navigation ul li:first-child {
  margin-left: 0;
}

.navigation ul li:first-child a {
  color: #fff;
  font-weight: bold;
  margin-left: 147px;
  margin-right: auto;
}

.navigation ul li a {
  position: relative;
  color: #A1B1CB;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  text-decoration: none;
  padding: 0 10px;
  letter-spacing: 0.04em;
  margin-right: 7px;
  margin-left: 32px;
  flex-shrink: 0;
}

.navigation ul li a.active,
.navigation ul li a:hover {
  color: #FFFFFF;
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
  width: 69px;
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