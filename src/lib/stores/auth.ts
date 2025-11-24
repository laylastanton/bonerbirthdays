import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const CORRECT_PASSWORD = 'iloveboners';
const AUTH_KEY = 'b1_authenticated';

// Initialize auth state from sessionStorage
const storedAuth = browser ? sessionStorage.getItem(AUTH_KEY) === 'true' : false;

export const isAuthenticated = writable<boolean>(storedAuth);

export function checkPassword(password: string): boolean {
	const isValid = password === CORRECT_PASSWORD;
	
	if (isValid && browser) {
		sessionStorage.setItem(AUTH_KEY, 'true');
		isAuthenticated.set(true);
	}
	
	return isValid;
}

export function logout() {
	if (browser) {
		sessionStorage.removeItem(AUTH_KEY);
		isAuthenticated.set(false);
	}
}

