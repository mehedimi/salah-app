import parse from "date-fns/parse";
import pluralize from "pluralize";
import { defineStore } from "pinia";
const storage = useStorage("salah-list");
import { useStorage } from "../composables/useStorage.js";
import differenceInMinutes from "date-fns/differenceInMinutes";

const colors = {
  5: "239, 68, 68",
  10: "234, 179, 8",
};

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
      const today = state.list.find((p) => {
        return parse(p.time, "HH:mm", new Date()) > this.now;
      });

      if (today !== undefined) {
        return today;
      }

      return state.list.find((p) => {
        return parse(p.time, "HH:mm", new Date()) < this.now;
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
    diffMinutes(state) {
      return differenceInMinutes(
        parse(state.nextPrayer.time, "HH:mm", new Date()),
        state.now
      );
    },
    color(state) {
      const leftMinutes = Math.abs(state.diffMinutes);
      for (let warnMinute in colors) {
        if (warnMinute >= leftMinutes) {
          return colors[warnMinute];
        }
      }
      return "20, 184, 166";
    },
    statusText(state) {
      const diff = state.diffMinutes;
      let status = "";
      const hour = Math.floor(Math.abs(diff / 60));

      const minute = Math.abs(diff) - hour * 60;

      if (hour > 0) {
        status += `${hour} ${pluralize("hour", hour)} and `;
      }

      return `${status} ${minute} ${pluralize("minute", minute)} ${
        diff < 0 ? "from now" : "left"
      }`;
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
