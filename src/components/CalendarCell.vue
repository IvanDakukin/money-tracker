<template>
  <div class="cell">
    <router-link class="cell" :to="dayUrl"> {{ date.getDate() }}</router-link>
  </div>
</template>

<script>
export default {
  props: {
    date: Date,
  },
  computed: {
    dayUrl() {
      return `day/${+this.date}`;
    },
  },
};
</script>