<template>
  <div id="app">
    <div
      :class="{ 'justify-center' : loading}"
      class="min-h-screen h-full flex flex-col items-center">
      <div v-if="loading"
           class="pokeball h-16 w-16"/>
      <transition name="fade" mode="out-in">
        <img v-if="!loading"
             src="./assets/pokemon.png"
             class="my-8 h-12">
      </transition>
      <transition name="fade" mode="out-in">
        <poke-list/>
      </transition>
    </div>
  </div>
</template>

<script>
import PokeList from "@/components/PokeList";
import { Bus } from "./bus.js";
export default {
  name: "app",
  components: {
    PokeList
  },
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    Bus.$on("loading-data", val => {
      console.log(val);
      this.loading = val;
    });
  }
};
</script>
