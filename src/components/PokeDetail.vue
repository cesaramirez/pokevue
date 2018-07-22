<template>
  <div v-if="show"
       class="absolute z-50 flex items-center justify-center h-screen pin bg-detail">
    <div class="bg-white xl:w-2/5 md:w-1/2 h-auto border p-4 rounded">
      <div class="text-center mb-10 flex flex-col items-center">
        <div class="mb-2">
          <span class="text-lg font-medium tracking-wide capitalize">{{ pokemon.name }}</span>
          <span class="text-sm tracking-wide mx-2">#{{ String(pokemon.id).padStart(3, '0') }}</span>
        </div>
        <div class="flex text-sm">
          <template v-for="type in pokemon.types" v-if="types">
            <span
              :key="type.slot"
              :style="'background-color:' + setColorType(type.type)"
              class="mx-1 rounded-full px-2 py-1 text-white">
              {{ type.type.name }}
            </span>
          </template>
        </div>
      </div>
      <div class="flex w-full">
        <div class="bg-indigo-lighter p-2 rounded mx-2 w-1/2">
          <p class="text-center tracking-wide font-medium">Default</p>
          <div class="flex w-full">
            <div class="flex flex-col items-center w-1/2">
              <img
                :src="pokemon.sprites.front_default"
                :alt="pokemon.name">
              <span class="text-xs tracking-wide">Front Default</span>
            </div>
            <div class="flex flex-col items-center">
              <img
                :src="pokemon.sprites.back_default"
                :alt="pokemon.name">
              <span class="text-xs tracking-wide">Back Default</span>
            </div>
          </div>
        </div>
        <div class="bg-blue-lighter p-2 rounded mx-2 w-1/2">
          <p class="text-center tracking-wide font-medium">Shiny</p>
          <div class="flex w-full">
            <div class="flex flex-col items-center w-1/2">
              <img :src="pokemon.sprites.front_shiny" :alt="pokemon.name">
              <span class="text-xs tracking-wide">Frony Shiny</span>
            </div>
            <div class="flex flex-col items-center w-1/2">
              <img :src="pokemon.sprites.back_shiny" :alt="pokemon.name">
              <span class="text-xs tracking-wide">Back Shiny</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Bus } from "@/bus";
export default {
  data() {
    return {
      show: false,
      pokemon: null,
      types: null
    };
  },
  mounted() {
    Bus.$on("pokemon-detail", data => {
      this.pokemon = data.pokemon;
      this.types = data.types;
      this.show = true;
    });
  },
  methods: {
    setColorType(type) {
      if (type.name == "normal") {
        return "black";
      }
      return this.types.find(t => t.name.includes(type.name)).color;
    }
  }
};
</script>

<style scoped>
.bg-detail {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
