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

const getIsLogin = () => {
    return localStorage.getItem('user');
}

const setLoginState = (username) => {
    localStorage.setItem('user', JSON.stringify({username: username}));
}

const removeLoginState = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('products');
    localStorage.removeItem('cart');
}

export { getJSONFromLocalStorage, saveJSONToLocalStorage, removeFromLocalStorage, getIsLogin, setLoginState, removeLoginState };