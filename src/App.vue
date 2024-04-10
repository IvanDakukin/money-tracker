<template>
  <header class="header">
    <span class="header__title">Money Tracker</span>
  </header>

  <main class="main">
    <aside class="aside">
      <nav class="nav">
        <div class="nav__header">Навигация</div>
        <ul>
          <li class="nav__item">Категории</li>
          <li class="nav__item">Кошельки</li>
          <li class="nav__item">Регулярные платежи</li>
        </ul>
      </nav>
    </aside>
    <router-view />
  </main>
</template>

<style lang="scss">
body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.header {
  @extend %box_shadow;
  height: 60px;
  padding: 15px 0 15px 40px;
  background-color: $main-color;
  display: flex;
  align-items: center;

  &__title {
    font-size: 35px;
    font-weight: bold;
    text-shadow: 3px 3px 4px rgba(66, 68, 90, 0.8);
    user-select: none;
    cursor: pointer;
    color: $light-color;
  }
}

.main {
  display: flex;
  height: 100vh;
}

.aside {
  min-width: 200px;
  border-right: $thin-border;
  margin-right: 20px;
}

.nav {
  &__header {
    font-weight: bolder;
    font-size: 18px;
    padding: 10px 10px;
    border-bottom: $thin-border;
  }

  &__item {
    @extend %text-button;
    text-align: start;
    padding: 13px 10px;
    margin: 5px;
  }
}
</style>
