<template>
    <nav>
        <ul>
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/dictionary">Dictionary</router-link></li>
        <li><router-link to="/calculator">Calculator</router-link></li>
        <li><router-link to="/employee-management">Employee Management</router-link></li>
        </ul>
    </nav>
</template>
  
  <script>
  export default {
    name: 'V1Navbar'
  }
  </script>