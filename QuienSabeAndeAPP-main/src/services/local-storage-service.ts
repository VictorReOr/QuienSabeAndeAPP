export class LocalStorageService {
    /**
     * Get data from local storage using a key.
     *
     * @param {string} key The key to get the data from local storage.
     * @returns {Object} The data from local storage.
     */
    public static get<T = any>(key: string): T | undefined {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : undefined;
    }

    /**
     * Set data in local storage using a key.
     *
     * @param {string} key The key to set the data in local storage.
     * @param {Object} data The data to set in local storage.
     */
    public static set(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Remove data from local storage using a key.
     *
     * @param {string} key The key to remove the data from local storage.
     */
    public static remove(key: string) {
        localStorage.removeItem(key);
    }
}