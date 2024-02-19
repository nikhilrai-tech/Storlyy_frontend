<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
    <p>Not registered yet? <a href="/">Register</a></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AboutSome",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('Please fill in all fields.');
        return;
      }

      axios.post('http://localhost:8000/login/', {
        username: this.email,
        password: this.password
      })
      .then(response => {
        window.alert('Login successful: ' + response.data.message);
        console.log('Login successful:', response);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      })
      .catch(error => {
        window.alert('Login failed: ' + error.response.data.error);
        console.error('Login failed:', error);
      });
      this.email = '';
      this.password = '';
    }
  }
};
</script>

<style scoped>
.login-page {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.login-button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #45a049;
}

a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  color: darkblue;
}
</style>
