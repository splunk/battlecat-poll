class LocalStorage {
    get(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (e) {}
        return null;
    }

    set(key, value) {
        try {
            if (value) {
                window.localStorage.setItem(key, typeof value == 'string' ? value : String(value));
            } else {
                window.localStorage.removeItem(key);
            }
        } catch (e) {}
    }
}

export default new LocalStorage()