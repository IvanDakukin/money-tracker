<template>
  <div>
    <div class="year">{{ year }}</div>
    <button @click="decreaseMonth">&lt;</button>
    {{ month }}
    <button @click="increaseMonth">&gt;</button>
    <Calendar :date="date"></Calendar>
  </div>
</template>

<script>
import Calendar from "@/components/MoneyCalendar.vue";
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export default {
  data() {
    return {
      date: new Date(),
    };
  },
  components: {
    Calendar,
  },
  methods: {
    increaseMonth() {
      this.date.setMonth(this.date.getMonth() + 1);
      this.date = new Date(this.date);
    },
    decreaseMonth() {
      this.date.setMonth(this.date.getMonth() - 1);
      this.date = new Date(this.date);
    },
  },
  computed: {
    year() {
      return this.date.getFullYear();
    },
    month() {
      return months[this.date.getMonth()];
    },
  },
  watch: {
    curDate() {
      console.log("asdasd");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
