<template>
  <div class="container">
    <div class="flex flex-wrap w-full justify-center">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="p-4">
        <transition name="fade" mode="out-in">
          <poke-card
            :types="types"
            :url="pokemon.url"
            class="xs:w-1/2 md:w-1/4 xl:w-1/6 "/>
        </transition>
      </div>
    </div>
    <div
      v-if="meta"
      class="flex justify-center w-full">
      <a class="cursor-pointer text-white my-8 no-underline tracking-wide text-lg font-medium bg-black py-3 px-6 rounded-full shadow hover:bg-red"
         href=""
         @click.prevent="more">
        Load More
      </a>
    </div>
    <poke-detail/>
  </div>
</template>

<script>
import PokeCard from "./PokeCard";
import PokeDetail from "./PokeDetail";
import { Bus } from "../bus.js";
export default {
  name: "PokeList",
  components: {
    PokeCard,
    PokeDetail
  },
  data() {
    return {
      types: null,
      pokemons: null,
      meta: null
    };
  },
  mounted() {
    this.getTypes();
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
    async more() {
      try {
        const response = await fetch(this.meta.next);
        const json = await response.json();
        const pokemons = json.results;
        this.pokemons = [...this.pokemons, ...pokemons];
        delete json.results;
        this.meta = json;
      } catch (error) {
        return error;
      }
    },
    async getTypes() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const json = await response.json();
        this.types = json.results;
        this.types.map(
          t => (t.color = "#" + ((Math.random() * 0xffffff) << 0).toString(16))
        );
      } catch (error) {
        return error;
      }
    }
  }
};
</script>
