<template>
    <div>
        <div class="flex flex-wrap w-full">
        <div v-for="pokemon in pokemons" :key="pokemon.id" class="w-1/4">
            <poke-card :url="pokemon.url"></poke-card>
        </div>
        </div>
    </div>
</template>

<script>
import PokeCard from "./PokeCard";
export default {
  name: "PokeList",
  data() {
    return {
      pokemons: null
    };
  },
  components: {
    PokeCard
  },
  mounted() {
    this.get();
  },
  methods: {
    async get() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        const json = await response.json();
        this.pokemons = json.results;
      } catch (error) {
        return error;
      }
    }
  }
};
</script>
