<template>
  <div v-if="show"
       class="z-50 flex items-center justify-center pin dialog-detail">
    <div class="bg-white xl:w-2/5 md:w-1/2 h-auto border p-4 rounded relative">
      <div class="absolute pin-r pin-t">
        <button
          type="button"
          @click.prevent="close">
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-black h-4 w-4 m-4 hover:text-red" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
        </button>
      </div>
      <div class="text-center mb-6 flex flex-col items-center">
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
      <div class="flex w-full flex-wrap px-4 bg-green-lighter mb-6 rounded py-3">
        <p class="text-center text-xl w-full mb-3">Profile</p>
        <div class="w-1/2 tracking-wide my-2">
          <span class="font-medium text-lg">Weight:</span> {{ pokemon.weight }}
        </div>
        <div class="w-1/2 tracking-wide my-2">
          <span class="font-medium text-lg">Height:</span> {{ pokemon.height }}
        </div>
        <div class="w-1/2 tracking-wide my-2">
          <span class="font-medium text-lg">Base experience:</span> {{ pokemon.base_experience }}
        </div>
        <div class="w-full tracking-wide my-2">
          <span class="font-medium text-lg">Abilities:</span>
          <template v-for="(ability, index) in pokemon.abilities">
            <span :key="ability.slot"
                  class="mx-1">
              {{ ability.ability.name }}
              {{ index + 1 == pokemon.abilities.length ? '' : ',' }}
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
      <div class="mt-6 bg-teal-lighter py-3 rounded">
        <p class="text-center text-xl">Stats</p>
        <div class="flex flex-wrap w-full">
          <div v-for="stat in pokemon.stats"
               :key="stat.stat.name"
               class="flex flex-col w-1/3 text-center my-2">
            <span class="text-4xl font-medium">{{ stat.base_stat }}</span>
            <span class="tracking-wide">{{ stat.stat.name }}</span>
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
      types: []
    };
  },
  mounted() {
    Bus.$on("pokemon-open-detail", data => {
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
    },
    close() {
      document.getElementById("body").classList.remove("dialog-open");
      this.show = false;
    }
  }
};
</script>

<style>
.dialog-detail {
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
