export const useStorage = (key) => {
  return {
    get(defaultValue = []) {
      const data = localStorage.getItem(key);

      if (!data) {
        return defaultValue;
      }

      return JSON.parse(data);
    },
    set(data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
  };
};
