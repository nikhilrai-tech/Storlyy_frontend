<template>
    <div class="container">
        <h2 class="text-center">Dashboard</h2>
    </div>
    <div class="dashboard">
        
        <div class="table-container">
  <h3 class="text-center">Employee Details</h3>
  <div class="table-wrapper">
    <table class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id" class="table-row">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone_number }}</td>
          <td>{{ item.date_of_birth }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
      <div class="form-container" >
        <h3 class="text-center">Employee Form</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group" >
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formData.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" required>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" v-model="formData.phone_number" required>
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth:</label>
            <input type="date" id="dob" v-model="formData.date_of_birth" required>
          </div>
          <button type="submit" style="margin-left: 200px;">Submit</button>
        <button @click="logout" style="margin: 10px; " type="logout">Logout</button> 

        </form>
      </div>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'DashBoard',
    data() {
      return {
        tableData: [], 
        formData: { name: '', email: '', phone_number: '', date_of_birth: '' } 
      };
    },
    mounted() {
  this.fetchTableData();
  const token = this.$route.query.token;
  localStorage.setItem('token', token);
},
    methods: {
      fetchTableData() {
        axios.get('http://localhost:8000/list_forms/')
          .then(response => {
            this.tableData = response.data;
          })
          .catch(error => {
            console.error('Error fetching table data:', error);
            alert('Error fetching table data. Please try again later.');
          });
      },
      logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }, 
      submitForm() {
        console.log('Form data:', this.formData);
        axios.post('http://localhost:8000', this.formData)
          .then(response => {
            console.log('Form submitted successfully:', response.data);
            this.formData.name = '';
            this.formData.email = '';
            this.formData.phone_number = '';
            this.formData.date_of_birth = '';
            this.fetchTableData();
          })
          .catch(error => {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again later.');
          });
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    justify-content: space-between;
  }
  
  .table-container, .form-container {
    width: 45%;
  }
  .table-container {
  margin-top: 20px;
}

.table-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.table-wrapper {
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th, .custom-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.custom-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.table-row:nth-child(even) {
  background-color: #f2f2f2;
}

.table-row:hover {
  background-color: #ddd;
}
  .form-group {
    margin-bottom: 15px;
    margin-left: 200px;
  }
  
  button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .dashboard {
  display: flex;
  justify-content: space-between;
  position: relative; 
}

button[type="logout"] {
    background-color: #afaa4c;
    color: white;
    padding: 10px;
    border: none;
    width: 20%;
    border-radius: 5px;
    cursor: pointer;
  }
  .text-center {
  text-align: center;
}
.logout-button:hover {
  background-color: #ffeb3b; 
}
  </style>
  