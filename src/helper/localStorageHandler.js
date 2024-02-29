const getJSONFromLocalStorage = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
}

const saveJSONToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}

const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export { getJSONFromLocalStorage, saveJSONToLocalStorage, removeFromLocalStorage };