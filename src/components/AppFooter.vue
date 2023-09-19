<template>
  <footer class="footer">
    <div class="dropdown">
        <select>
          <option value="option1">English</option>
          <option value="option2">Polska</option>
          <option value="option3">Русский</option>
        </select>
    </div>
    <div class="column1">
      <h3>Navigation</h3>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
      </ul>
    </div>
    <div class="column">
      <h3>General Info</h3>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>
    <div class="column">
      <h3>Contact</h3>
      <p>Phone: 123-456-7890</p>
    </div>
  </footer>
</template>

<style>
.footer {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 1961px;
  background: #161214;
}

.dropdown {
  position: relative;
  width: 131px;
  left: 81px;
  top: 35px;
  background: #362F33;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  color: #FFFFFF;
  mix-blend-mode: normal;
  opacity: 0.8;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.dropdown select {
  width: 100%;
  height: 100%;
  background-color: #362F33;
  border: none;
  outline: none;
  color: #FFFFFF;
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 30px;
  opacity: 0.8;
  appearance: none;
}

.dropdown select:focus {
  box-shadow: none;
}

.column {
  height: 35px;
  float: left;
  margin-left: 60px; 
  padding: 60px;
  box-sizing: border-box;
}

.column1 {
  height: 35px;
  width: calc(33.33% - 20px);
  float: left;
  margin-left: 20px; 
  padding: 60px;
  box-sizing: border-box;
}

.column h3, .column1 h3 {
  color: #fff;
}

.column ul, .column1 ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.column ul li, .column1 ul li {
  margin-bottom: 10px;
}

.column ul li a, .column1 ul li a {
  color: #fff;
  text-decoration: none;
}

.column p {
  color: #fff;
}
</style>
