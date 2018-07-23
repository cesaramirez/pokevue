<template>
  <div>
    <div class="flex flex-col items-center justify-center border rounded p-3 shadow hover:shadow-lg cursor-pointer h-48 w-48">
      <transition name="fade" mode="out-in">
        <div v-if="!pokemon"
             key="pokeball"
             class="flex items-center justify-center h-full">
          <div class="pokeball h-16 w-16"/>
        </div>
        <div v-else
             key="pokemon"
             class="flex flex-col items-center"
             @click="open">
          <span class="capitalize text-lg font-medium">{{ pokemon.name }}</span>
          <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
          <span class="text-sm mb-1">
            Nº {{ String(pokemon.id).padStart(3, '0') }}
          </span>
          <div class="flex text-xs">
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
      </transition>
    </div>
  </div>
</template>

<script>
import { Bus } from "@/bus";
export default {
  name: "PokeCard",
  props: {
    url: {
      type: String,
      required: true
    },
    types: {
      type: Array,
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
    },
    setColorType(type) {
      if (type.name == "normal") {
        return "black";
      }
      return this.types.find(t => t.name.includes(type.name)).color;
    },
    open() {
      document.getElementById('body').classList.add('dialog-open')
      Bus.$emit("pokemon-open-detail", {
        pokemon: this.pokemon,
        types: this.types,
        open: true
      });
    }
  }
};
</script>
