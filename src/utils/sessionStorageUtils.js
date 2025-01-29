// Function to set an item in session storage
export const setSessionStorageItem = (key, value) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};

// Function to get an item from session storage
export const getSessionStorageItem = (key) => {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

// Function to remove an item from session storage
export const removeSessionStorageItem = (key) => {
    window.sessionStorage.removeItem(key);
};

// Function to set an item in local storage
export const setLocalStorageItem = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

// Function to get an item from local storage
export const getLocalStorageItem = (key) => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

// Function to remove an item from local storage
export const removeLocalStorageItem = (key) => {
    window.localStorage.removeItem(key);
};