<template>
  <div class="calendar">
    <div class="calendar__head-cell">Пн</div>
    <div class="calendar__head-cell">Вт</div>
    <div class="calendar__head-cell">Ср</div>
    <div class="calendar__head-cell">Чт</div>
    <div class="calendar__head-cell">Пт</div>
    <div class="calendar__head-cell">Сб</div>
    <div class="calendar__head-cell">Вс</div>
    <div class="cell--empty" v-for="n in numberEmptyCells" :key="n"></div>
    <calendar-cell
      class="cell"
      v-for="n in numberDaysInMonth"
      :key="n"
      :date="new Date(date.getFullYear(), date.getMonth(), n)"
    >
      {{ n }}
    </calendar-cell>
  </div>
</template>

<script>
import CalendarCell from "./CalendarCell.vue";
export default {
  components: { CalendarCell },
  props: {
    date: Date,
  },
  computed: {
    numberDaysInMonth() {
      return new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDate();
    },
    numberEmptyCells() {
      let firstDayOfWeek = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        1
      ).getDay();
      if (firstDayOfWeek === 0) firstDayOfWeek = 7;
      return firstDayOfWeek - 1;
    },
    dayUrl() {
      return `day/${+this.date}`;
    },
  },
};
</script>

<style scoped>
.calendar {
  width: 900px;
  display: grid;
  grid-template-rows: repeat(6, 100px);
  grid-template-columns: repeat(7, 1fr);
}
</style>