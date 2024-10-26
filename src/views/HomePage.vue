<template>
  <div>
    <h2>Bem-vindo à sua To-Do List</h2>
    <button @click="handleLogout">Logout</button>
    <div class="container">
      <div
        class="column"
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        @dragover.prevent
        @drop="drop($event, columnIndex)"
      >
        <h3>{{ column.title }}</h3>
        <div
          class="card"
          v-for="(card, cardIndex) in column.cards"
          :key="cardIndex"
          draggable="true"
          @dragstart="dragStart(cardIndex, columnIndex)"
        >
          {{ card }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      columns: [
        {
          title: "Coluna 1",
          cards: ["Card 1", "Card 2", "Card 3"],
        },
        {
          title: "Coluna 2",
          cards: ["Card 4", "Card 5", "Card 6"],
        },
        {
          title: "Coluna 3",
          cards: ["Card 7", "Card 8", "Card 9"],
        },
      ],
      draggedCard: null,
      draggedColumn: null,
    };
  },
  methods: {
    ...mapActions(["logout"]),

    async handleLogout() {
      try {
        const response = await this.logout();
        if (response && response.status === 200) {
          this.$router.push('/login');
        }
      } catch (error) {
        console.error("Falha ao tentar deslogar:", error);
      }
    },

    dragStart(cardIndex, columnIndex) {
      this.draggedCard = cardIndex;
      this.draggedColumn = columnIndex;
    },

    drop(event, columnIndex) {
      const draggedCardContent =
        this.columns[this.draggedColumn].cards[this.draggedCard];
      this.columns[this.draggedColumn].cards.splice(this.draggedCard, 1);
      this.columns[columnIndex].cards.push(draggedCardContent);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Arial", sans-serif;
  background-color: #e8f0fe;
}

.container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.column {
  flex: 1;
  margin: 0 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: background-color 0.3s ease;
}

.column:hover {
  background-color: #f0f0f0;
}

.column h3 {
  margin-bottom: 10px;
  color: #333;
}

.card {
  background-color: #fffae5;
  border: 1px solid #ffdd57;
  border-radius: 5px;
  padding: 12px;
  margin: 10px 0;
  text-align: center;
  cursor: move;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
