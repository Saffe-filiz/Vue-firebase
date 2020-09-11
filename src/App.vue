<template>
  <div id="app">
      <Navigation/>
        <!--<transition name="move">-->
          <router-view :key="$route.path"></router-view>
        <!--</transition>-->
  </div>
</template>

<script>
  import Navigation from './components/Navigation.vue';
  import './assets/css/app.css'

export default {
  name: 'app',

    components: {
      Navigation,
    },
}
</script>

