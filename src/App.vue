<template>
  <div id="app">
    <div class="min-h-screen h-full flex flex-col items-center">
      <img src="./assets/pokemon.png" class="my-8 h-12">
      <poke-list/>
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
