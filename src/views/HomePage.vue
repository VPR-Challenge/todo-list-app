<template>
  <div>
    <h2>Bem-vindo à sua To-Do List</h2>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout']),
    logout() {
      this.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Aqui você pode adicionar estilo customizado para a página inicial */
</style>
