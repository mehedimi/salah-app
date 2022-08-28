<script setup>
import pluralize from "pluralize";
import { parse, format } from "date-fns";
import { useSalahStore } from "../stores/salah.js";
const store = useSalahStore();
</script>
<template>
  <div class="mt-8">
    <h2 class="text-xl text-gray-600 font-semibold">
      Salah {{ pluralize("List", store.list.length) }} ({{ store.list.length }})
    </h2>
    <nav class="mt-2" v-if="store.list.length">
      <button
        v-for="element in store.lists"
        class="flex p-4 border shadow-sm justify-between rounded-2xl my-4 border-gray-100 w-full bg-white focus:ring-offset-2 focus:ring-2 focus:ring-teal-500"
        @click="store.edit(element)"
      >
        <span class="text-gray-500">{{ element.name }}</span>
        <span class="font-semibold text-gray-400">{{
          format(parse(element.time, "HH:mm", new Date()), "hh:mm a")
        }}</span>
      </button>
    </nav>
    <h2 class="text-center my-4 text-gray-400" v-else>Empty lists.</h2>
  </div>
</template>
