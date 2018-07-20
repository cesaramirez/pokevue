<template>
  <div id="app">
    <div class="h-screen flex flex-col justify-center items-center">
      <img src="./assets/pokemon.png">
      <poke-list></poke-list>
    </div>
  </div>
</template>

<script>
import PokeList from "@/components/PokeList";
export default {
  name: "app",
  components: {
    PokeList
  }
};
</script>
