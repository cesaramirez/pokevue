<template>
  <div class="container">
    <div class="flex flex-wrap w-full">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="md:w-1/4 xl:w-1/6 p-4">
        <poke-card :url="pokemon.url"/>
      </div>
    </div>
    <div
      v-if="meta"
      class="flex justify-center w-full">
      <button
        v-show="meta.previous ? true : false"
        type="button"
        class="mx-4"
        @click.prevent="previous">Prev</button>
      <button
        type="button"
        class="mx-4"
        @click.prevent="next">Next</button>
    </div>
  </div>
</template>

<script>
import PokeCard from "./PokeCard";
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
          "https://pokeapi.co/api/v2/pokemon?limit=24"
        );
        const json = await response.json();
        this.pokemons = json.results;
        delete json.results;
        this.meta = json;
      } catch (error) {
        return error;
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
        this.pokemons = null;
        this.pokemons = json.results;
        delete json.results;
        this.meta = json;
      } catch (error) {
        return error;
      }
    }
  }
};
</script>
