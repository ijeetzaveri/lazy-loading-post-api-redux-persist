const LocalStorageService = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing data in localStorage: ${error.message}`);
    }
  },

  getItem: (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error(
        `Error retrieving data from localStorage: ${error.message}`
      );
      return null;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data from localStorage: ${error.message}`);
    }
  },
};

export default LocalStorageService;
