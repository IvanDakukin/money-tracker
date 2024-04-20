class Transaction {
  id;
  date;
  sum;
  title;

  constructor(id, date, sum, title) {
    this.id = id;
    this.date = date;
    this.sum = sum;
    this.title = title;
  }

  get id() {
    return this.id;
  }

  get date() {
    return this.date;
  }
  set date(date) {
    this.date = date;
  }

  get sum() {
    return this.sum;
  }
  set sum(sum) {
    this.sum = sum;
  }

  get title() {
    return this.title;
  }
  set title(title) {
    this.title = title;
  }
}

module.exports = Transaction;
