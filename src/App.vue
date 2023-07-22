<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
  <div class="container my-5">
    <h1 class="text-center">simulation runner</h1>

    <ul class="nav nav-tabs nav-tabs-frame maintab">
      <li class="nav-item">
        <router-link
          to="/"
          class="nav-link "
          active-class="active"
          aria-current="page"
          >Rewards</router-link
        >
      </li>
    </ul>

    <div class="container tab-frame">
      <router-view />
    </div>
  </div>
</template>



<style lang="scss" scoped>
 

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}




@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
<style lang="scss">

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

html {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  -webkit-text-size-adjust: 100%;
  color: #ffffff;
  //height: 100%;
  // min-height: 100%;
  background-color: #efefef !important;
}

body {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  background-color: #efefef !important;
  min-height: 100vh;
}

.tab-frame{
  min-width: 1024px;
}
.maintab{
  padding-left: 13px;
  padding-right: 13px;
}
.nav-tabs {
    border-bottom: 0px solid #f8f9fa;
}

.nav-tabs-frame .nav-item .nav-link {
  border-top: solid rgb(3, 93, 47);
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

.nav-tabs .nav-item .nav-link.active {
  background-color: #f8f9fa;
}
</style>