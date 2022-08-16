<script setup>
import bg from "../assets/mosque-islam.svg";
import { useSalahStore } from "../stores/salah.js";
const store = useSalahStore();
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${bg})` }"
    class="rounded-3xl bg-teal-500 text-white text-center space-y-2.5 overflow-hidden bg-no-repeat bg-top bg-cover"
  >
    <div class="px-4 py-10 bg-teal-500/60">
      <template v-if="store.nextPrayer">
        <h2 class="text-2xl">{{ store.nextPrayer.name }}</h2>
        <h1 class="text-4xl font-bold">11:20 <span>AM</span></h1>
        <p>Up coming prayer</p>
      </template>
      <div v-else class="py-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
