<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async submitForm() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push("/");
      } catch (error) {
        alert("Login falhou!");
      }
    },
  },
};
</script>

<style scoped></style>
