<template>
  <div class="main-content">
    <div class="date-peeker">
      <div class="date-peeker__item">
        <span class="date-peeker__year">{{ date.getFullYear() }}</span>
      </div>
      <div class="date-peeker__item">
        <button @click="switchToToday" class="date-peeker__today">
          Сегодня
        </button>
      </div>
      <div class="date-peeker__item">
        <button @click="decreaseMonth" class="date-peeker__arrow">
          <span class="material-symbols-outlined"> keyboard_arrow_left </span>
        </button>
      </div>
      <div class="date-peeker__item">
        <button @click="increaseMonth" class="date-peeker__arrow">
          <span class="material-symbols-outlined"> keyboard_arrow_right </span>
        </button>
      </div>
      <div class="date-peeker__item">
        <span class="date-peeker__month">
          {{ month }}
        </span>
      </div>
    </div>
    <Calendar :date="date"></Calendar>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar/MoneyCalendar.vue";
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
    switchToToday() {
      this.date = new Date();
    },
  },
  computed: {
    month() {
      return months[this.date.getMonth()];
    },
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  @extend %main-content;
}

.date-peeker {
  display: flex;
  margin-bottom: 15px;
  &__item {
    @extend %vert-center;
  }
  &__year {
    margin-right: 20px;
    font: {
      size: 30px;
      weight: bold;
    }
  }
  &__month {
    margin-left: 10px;
    font-size: 18px;
  }
  &__arrow {
    @extend %text-button;
    @extend %vert-center;
    padding: 5px;
  }
  &__today {
    @extend %tonal-button;
    padding: 5px;
    margin-right: 10px;
  }
}
</style>
