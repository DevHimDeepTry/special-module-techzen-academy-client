<template>
  <nav>
    <ul class="navbar">
      <li><router-link to="/" class="nav-link home">Home</router-link></li>
      <li><router-link to="/dictionary" class="nav-link dictionary">Dictionary</router-link></li>
      <li><router-link to="/calculator" class="nav-link calculator">Calculator</router-link></li>
      <li><router-link to="/employee-management" class="nav-link employee">Employee</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'V1Navbar',
};
</script>

<style scoped>
.navbar {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  background-color: #00479d; /* Primary color */
  padding: 10px 0;
  margin: 0;
}

.nav-link {
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-link.home {
  color: #00FF00; /* Green */
}

.nav-link.dictionary {
  color: #FF5300; /* Orange */
}

.nav-link.calculator {
  color: #00FF00; /* Green */
}

.nav-link.employee {
  color: #FF5300; /* Orange */
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
