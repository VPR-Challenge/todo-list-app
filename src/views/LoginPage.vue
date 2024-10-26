<template>
  <div class="login-container">
    <h2 class="text-center text-2xl font-bold mb-6">Login</h2>
    <form @submit.prevent="submitForm" class="login-form">
      <div class="form-group">
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          required
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="password" class="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          class="form-input"
        />
      </div>
      <button type="submit" class="submit-button" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: null,
    };
  },
  methods: {
    ...mapActions(['login']),
    async submitForm() {
      this.loading = true;
      this.error = null;
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/');
      } catch (error) {
        this.error = error.message || 'Login failed!';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

.submit-button {
  padding: 12px;
  background-color: #42b983;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:disabled {
  background-color: #a0d6b8;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
  background-color: #358a6e;
}

.error-message {
  margin-top: 16px;
  color: red;
  text-align: center;
}

@media (max-width: 480px) {
  .login-container {
    padding: 15px;
  }

  .form-input {
    padding: 10px;
    font-size: 14px;
  }

  .submit-button {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
