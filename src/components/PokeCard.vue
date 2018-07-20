<template>
  <div>
    <div class="flex flex-col items-center border rounded p-3 shadow hover:shadow-lg cursor-pointer">
      <span class="capitalize text-lg font-medium">{{ pokemon.name }}</span>
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
  watch: {
    url: function() {
      this.get();
    }
  },
  mounted() {
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
