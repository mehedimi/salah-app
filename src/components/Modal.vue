<template>
  <TransitionRoot appear :show="store.isOpen" as="template">
    <Dialog
      as="div"
      @close="store.closeModal"
      class="relative z-10 font-nunito"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-bold leading-6 text-gray-600"
              >
                Salah
              </DialogTitle>
              <div class="mt-6">
                <form @submit.prevent="store.handleForm">
                  <div class="mb-4 relative">
                    <input
                      type="text"
                      id="name"
                      v-model="store.data.name"
                      class="w-full placeholder-transparent border-0 border-b border-b-gray-200 px-0 focus:ring-0 focus:border-b-teal-400 text-gray-500 peer"
                      placeholder="Name"
                    />
                    <label
                      for="name"
                      class="text-gray-500 transition-all absolute left-0 -top-3.5 peer-placeholder-shown:top-2"
                      >Name</label
                    >
                  </div>
                  <div class="mb-4 relative">
                    <label for="time" class="text-gray-500">Time</label>
                    <input
                      v-model="store.data.time"
                      type="time"
                      id="time"
                      class="w-full border-0 border-b border-b-gray-200 p-0 focus:ring-0 focus:border-b-teal-400 text-gray-500"
                      placeholder="Tap to set time"
                    />
                  </div>
                  <div class="mt-4 flex justify-between">
                    <button
                      type="button"
                      @click="store.remove"
                      class="text-red-500"
                      v-if="store.editIndex !== undefined"
                    >
                      Delete
                    </button>
                    <span v-else></span>
                    <div>
                      <button
                        type="button"
                        @click="store.closeModal"
                        class="text-gray-500 mr-4"
                      >
                        Cancel
                      </button>
                      <button
                        class="bg-teal-500 text-white px-6 py-2 text-sm rounded-xl inline-flex gap-x-1.5"
                      >
                        {{ store.editIndex === undefined ? "Add" : "Update" }}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useSalahStore } from "../stores/salah.js";
const store = useSalahStore();
</script>
