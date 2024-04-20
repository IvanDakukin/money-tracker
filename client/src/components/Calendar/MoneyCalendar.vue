<template>
  <div class="calendar">
    <div class="calendar-head">
      <div class="calendar-head__element">Пн</div>
      <div class="calendar-head__element">Вт</div>
      <div class="calendar-head__element">Ср</div>
      <div class="calendar-head__element">Чт</div>
      <div class="calendar-head__element">Пт</div>
      <div class="calendar-head__element">Сб</div>
      <div class="calendar-head__element">Вс</div>
    </div>
    <div class="calendar-body">
      <calendar-cell
        class="cell cell--other-month"
        v-for="n in numberCellsStart"
        :key="n"
        :date="
          new Date(
            date.getFullYear(),
            date.getMonth(),
            n - numberCellsStart
          )
        "
      ></calendar-cell>
      <calendar-cell
        class="cell"
        v-for="n in numberDaysInMonth"
        :key="n"
        :date="new Date(date.getFullYear(), date.getMonth(), n)"
      >
      </calendar-cell>
      <calendar-cell
        class="cell cell--other-month"
        v-for="n in numberCellsEnd"
        :key="n"
        :date="new Date(date.getFullYear(), date.getMonth() + 1, n)"
      ></calendar-cell>
    </div>
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
    numberCellsStart() {
      let firstDayOfWeek = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        1
      ).getDay();
      if (firstDayOfWeek === 0) firstDayOfWeek = 7;
      return firstDayOfWeek - 1;
    },
    numberCellsEnd() {
      let lastDayOfMonth = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDay();
      if (lastDayOfMonth === 0) {
        lastDayOfMonth = 7;
      }
      return 7 - lastDayOfMonth;
    },
  },
};
</script>

<style lang="scss" scoped >
.calendar-head {
  display: flex;
  margin-bottom: 10px;
  &__element {
    font-weight: bold;
    width: 100%;
    padding-left: 5px;
    font-size: 18px;
  }
}
.calendar-body {
  border-left: $thin-border;
  border-top: $thin-border;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.cell {
  border-bottom: $thin-border;
  border-right: $thin-border;
  height: 100px;
  padding: 5px;
  &:nth-child(1) {
    border-top-left-radius: 15px;
  }
  &:nth-child(7) {
    border-top-right-radius: 15px;
  }
  &:nth-last-child(1) {
    border-bottom-right-radius: 15px;
  }
  &:nth-last-child(7) {
    border-bottom-left-radius: 15px;
  }
  &--other-month {
    color: $light-grey;
  }
}
</style>