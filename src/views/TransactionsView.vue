<template>
  <div class="transactions">
    <button>Добавить доход</button>
    <button>Добавить расход</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: [],
    };
  },
  props: {
    date: Date,
  },
};
</script>

