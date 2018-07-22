<template>
  <div class="container">
    <div class="flex flex-wrap w-full justify-center">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="p-4">
        <poke-card :url="pokemon.url" class="xs:w-1/2 md:w-1/4 xl:w-1/6 "/>
      </div>
    </div>
    <div
      v-if="meta"
      class="flex justify-center w-full">
      <a class="cursor-pointer text-white my-8 no-underline tracking-wide text-lg font-medium bg-black py-3 px-6 rounded-full shadow hover:bg-red"
         href=""
         @click.prevent="next">
        Load More
      </a>
    </div>
  </div>
</template>

<script>
import PokeCard from "./PokeCard";
import { Bus } from "../bus.js";
export default {
  name: "PokeList",
  components: {
    PokeCard
  },
  data() {
    return {
      pokemons: null,
      meta: null
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    async get() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=15"
        );
        const json = await response.json();
        this.pokemons = json.results;
        delete json.results;
        this.meta = json;
      } catch (error) {
        return error;
      } finally {
        Bus.$emit("loading-data", false);
      }
    },
    async previous() {
      try {
        const response = await fetch(this.meta.previous);
        const json = await response.json();
        this.pokemons = null;
        this.pokemons = json.results;
        delete json.results;
        this.meta = json;
      } catch (error) {
        return error;
      }
    },
    async next() {
      try {
        const response = await fetch(this.meta.next);
        const json = await response.json();
        const pokemons = json.results;
        console.log(pokemons);
        // console.log(typeof this.pokemons);
        this.pokemons = [...this.pokemons, ...pokemons];
        // delete json.results;
        // this.meta = json;
      } catch (error) {
        return error;
      }
    }
  }
};
</script>
