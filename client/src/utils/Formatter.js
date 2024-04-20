const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Авгутса",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

export default class Formatter {
  static dateToSentense(value) {
    if (!value) return "";
    if (!(value instanceof Date)) value = new Date(value);
    return `${value.getDate()} ${
      months[value.getMonth()]
    } ${value.getFullYear()}`;
  }
}
