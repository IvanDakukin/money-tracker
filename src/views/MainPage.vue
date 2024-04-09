<template>
  <div class="main-content">
    <div class="date-chose">
      <div class="date-chose__item">
        <span class="date-chose__year">{{ date.getFullYear()}}</span>
      </div>
      <div class="date-chose__item">
        <button @click="decreaseMonth" class="date-chose__btn">
          <span class="material-symbols-outlined"> keyboard_arrow_left </span>
        </button>
      </div>
      <div class="date-chose__item">
        <button @click="increaseMonth" class="date-chose__btn">
          <span class="material-symbols-outlined"> keyboard_arrow_right </span>
        </button>
      </div>
      <div class="date-chose__item">
        <span class="date-chose__month">
          {{ month }}
        </span>
      </div>
    </div>
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
    month() {
      return months[this.date.getMonth()];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.main-content {
  padding-top: 10px;
  flex-basis: 100%;
  margin-right: 20px;
}

.date-chose {
  display: flex;
  margin-bottom: 15px;
  &__item {
    display: flex;
    align-items: center;
  }
  &__year {
    margin-right: 40px;
    line-height: 100%;
    font: {
      size: 30px;
      weight: bold;
    }
  }
  &__month {
    margin-left: 10px;
    font-size: 18px;
  }
  &__btn {
    @extend %text-button;
    display: flex;
    align-items: center;
    padding: 5px;
  }
}
</style>
