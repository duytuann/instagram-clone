import { logoutSuccess } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import { ACCESS_TOKEN_KEY, REFRESH_ACCESS_TOKEN_KEY } from './consts';

const Storage = {
    get(key: string, defaultValue: string = '') {
        const value = localStorage.getItem(key);

        return value ? value : defaultValue;
    },

    set(key: string, value: string = '') {
        localStorage.setItem(key, value);
    },

    remove(key: string) {
        localStorage.removeItem(key);
    },

    getAccessToken(): string {
        return this.get(ACCESS_TOKEN_KEY);
    },

    setAccessToken(token: string) {
        this.set(ACCESS_TOKEN_KEY, token);
    },

    setRefreshToken(token: string) {
        this.set(REFRESH_ACCESS_TOKEN_KEY, token);
    },
    clearAll() {
        localStorage.clear();
    },
    removeToken() {
        this.remove(ACCESS_TOKEN_KEY);
        this.remove(REFRESH_ACCESS_TOKEN_KEY);
    },
    logOut() {
        this.removeToken();
        store.dispatch(logoutSuccess());
    },
};

export default Storage;
