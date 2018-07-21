<template>
  <div>
    <div class="flex flex-col items-center border rounded p-3 shadow hover:shadow-lg cursor-pointer h-32">
      <transition name="fade" mode="out-in">
        <div v-if="!pokemon"
             key="pokeball"
             class="flex items-center justify-center h-full">
          <div class="pokeball h-16 w-16"/>
        </div>
        <div v-else
             key="pokemon"
             class="flex flex-col items-center">
          <span class="capitalize text-lg font-medium">{{ pokemon.name }}</span>
          <img :src="pokemon.sprites.front_default" alt="">
        </div>
      </transition>
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
      this.pokemon = null;
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
