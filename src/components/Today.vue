<script setup>
import uq from "@umalqura/core";
import { format } from "date-fns";
</script>

<template>
  <div class="text-center py-3 mb-3">
    <h3 class="font-bold text-gray-700">
      {{ format(new Date(), "E, d LLL") }}
    </h3>
    <p class="text-gray-500">{{ uq().format("dd, MMMM yyyy") }} AH</p>
  </div>
</template>
