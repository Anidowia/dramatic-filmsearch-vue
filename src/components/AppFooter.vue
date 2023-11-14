<template>
  <footer class="footer">
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Dropdown
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button class="dropdown-item" type="button">Action</button>
        <button class="dropdown-item" type="button">Another action</button>
        <button class="dropdown-item" type="button">Something else here</button>
      </div>
    </div>
    <div class="col-about">
      <ul>
        <li><a href="#">THE BASICS</a></li>
        <li><a href="#">ABOUT</a></li>
        <li>
          <a href="https://github.com/Anidowia/dramatic-filmsearch-vue"
            >CONTACT US</a
          >
        </li>
        <li><a href="#">SUPPORT</a></li>
      </ul>
    </div>
    <div class="col-social">
      <ul>
        <li><a href="#">GUIDES</a></li>
        <li><a href="#">TWITTER</a></li>
        <li><a href="#">GUIDES</a></li>
        <li><a href="#">SYSTEM</a></li>
      </ul>
    </div>
    <div class="col-other">
      <ul>
        <li><a href="#">MERCH</a></li>
        <li><a href="#">DISCORD</a></li>
        <li><a href="#">GAMES</a></li>
        <li><a href="#">FILMS</a></li>
      </ul>
    </div>
    <div class="dramatic">
      <img src="../assets/dramatic.png" alt="Logo" class="logo" />
    </div>
    <button class="btn btn-dark" type="button">
      <span><i class="fa-brands fa-github"></i></span><span> Join GitHub</span>
    </button>
  </footer>
</template>

<style>
.footer {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 1961px;
  background: linear-gradient(
    90.53deg,
    rgba(0, 0, 0, 0.75) 0.45%,
    rgba(102, 80, 165, 0.75) 105.51%
  );
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
}
.btn-secondary {
  background-color: #ffc907 !important;
  color: #161214 !important;
  box-shadow: none !important;
  margin-top: 50px;
  margin-left: 50px;
}
.col-about ul li {
  position: relative;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  list-style: none;
  letter-spacing: 0.04em;
  margin-left: 25px;
  margin-top: 20px;
}
.col-about a {
  color: #fff;
  text-decoration: none;
  list-style: none;
  letter-spacing: 0.04em;
}
.col-social {
  margin-left: 236px;
  margin-top: -177px;
}
.col-social a {
  color: #fff;
  text-decoration: none;
  list-style: none;
  letter-spacing: 0.04em;
}
.col-social ul li {
  position: relative;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  list-style: none;
  letter-spacing: 0.04em;
  margin-left: 25px;
  margin-top: 20px;
}
.col-other {
  margin-left: 470px;
  margin-top: -177px;
}
.col-other a {
  color: #fff;
  text-decoration: none;
  list-style: none;
  letter-spacing: 0.04em;
}
.col-other ul li {
  position: relative;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  list-style: none;
  letter-spacing: 0.04em;
  margin-left: 25px;
  margin-top: 20px;
}
.dramatic {
  margin-left: 770px;
  margin-top: -177px;
}
.btn-dark {
  margin-left: 860px;
  margin-top: 10px;
}
</style>
