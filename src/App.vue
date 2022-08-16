<script setup>
import Modal from "./components/Modal.vue";
import Today from "./components/Today.vue";
import Prayers from "./components/Prayers.vue";
import AddButton from "./components/AddButton.vue";
import NextPrayer from "./components/NextPrayer.vue";
</script>

<template>
  <div class="p-6 font-nunito">
    <Today />
    <NextPrayer />
    <Prayers />
    <AddButton />
  </div>
</template>
