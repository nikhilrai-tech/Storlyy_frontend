<template>
  <div class="registration-page">
    <h2>Registration</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="register-button">Register</button>
    </form>
    <p>Already Registered? <a href="/login">Login</a></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "HomeSome",
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register(event) {
      event.preventDefault(); 
      axios.post('http://localhost:8000/register/', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      .then(response => {
        if (response && response.data) {
          window.alert('Registration successful: ' + response.data.message);
          this.username = '';
          this.email = '';
          this.password = '';
        } else {
          window.alert('Registration failed: Response data is undefined');
        }
      })
      .catch(error => {
        let errorMessage = error.response.data.message || 'An error occurred during registration.';
        window.alert('Registration failed: ' + errorMessage);
      });
    }
  }
};
</script>

<style scoped>
.registration-page {
  background-color: #f0f0f0; 
  padding: 20px;
  border-radius: 10px;
  width: 300px; 
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px; 
}

.register-button {
  width: 100%; 
  background-color: #4CAF50; 
  color: white; 
  padding: 10px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 16px; 
}

.register-button:hover {
  background-color: #45a049; 
}
</style>
