<template>
    <div>
        <div v-if="pokemon" class="flex flex-col items-center">
            <span>{{ pokemon.name }}</span>
            <img :src="pokemon.sprites.front_default" alt="">
        </div>
    </div>
</template>

<script>
export default {
  name: "PokeCard",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pokemon: null
    };
  },
  mounted() {
    console.log("card");
    this.get();
  },
  methods: {
    async get() {
      try {
        const response = await fetch(this.url);
        const json = await response.json();
        this.pokemon = json;
      } catch (error) {
        return error;
      }
    }
  }
};
</script>
