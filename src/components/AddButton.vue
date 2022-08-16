<script setup>
import Modal from "./Modal.vue";
import { useSalahStore } from "../stores/salah.js";
const store = useSalahStore();
</script>
<template>
  <div class="h-20"></div>
  <div class="fixed bottom-8 w-full text-center left-0">
    <button
      @click="store.openModal"
      class="bg-teal-500 text-white px-10 py-3 rounded-xl inline-flex gap-x-1.5 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Add Salah
    </button>
  </div>
  <Modal />
</template>
