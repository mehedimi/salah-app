import parse from "date-fns/parse";
import { defineStore } from "pinia";
import { useStorage } from "../composables/useStorage.js";

const storage = useStorage("salah-list");

export const useSalahStore = defineStore("salah", {
  state() {
    return {
      list: storage.get(),
      data: {},
      editIndex: undefined,
      isOpen: false,
      now: new Date(),
    };
  },
  getters: {
    nextPrayer(state) {
      const now = new Date();

      const today = state.list.find((p) => {
        return parse(p.time, "HH:mm", new Date()) > now;
      });

      if (today !== undefined) {
        return today;
      }

      return state.list.find((p) => {
        return parse(p.time, "HH:mm", new Date()) < now;
      });
    },
    lists(state) {
      state.list.sort((a, b) => {
        if (
          parse(a.time, "HH:mm", new Date()) <
          parse(b.time, "HH:mm", new Date())
        ) {
          return -1;
        }
        if (
          parse(a.time, "HH:mm", new Date()) >
          parse(b.time, "HH:mm", new Date())
        ) {
          return 1;
        }
        return 0;
      });
      return state.list;
    },
  },
  actions: {
    reset() {
      Object.keys(this.data).forEach((key) => {
        this.data[key] = "";
      });
      this.editIndex = undefined;
    },
    set(data = {}) {
      Object.keys(data).forEach((key) => {
        this.data[key] = data[key];
      });
    },
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
      this.reset();
    },
    handleForm() {
      if (!this.data.name || !this.data.time) {
        return;
      }
      if (this.editIndex === undefined) {
        this.create();
      } else {
        this.update();
      }
      this.closeModal();
    },
    create() {
      this.list.push({
        ...this.data,
      });
      this.save();
    },
    update() {
      this.list.splice(this.editIndex, 1, { ...this.data });
      this.editIndex = undefined;
      this.save();
    },
    edit(item) {
      const index = this.list.indexOf(item);
      this.editIndex = index;
      const data = this.list[index];
      this.set(data);
      this.openModal();
    },
    save() {
      storage.set(this.list);
    },
    remove() {
      this.list.splice(this.editIndex, 1);
      this.save();
      this.closeModal();
    },
  },
});
