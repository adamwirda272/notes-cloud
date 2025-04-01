import { writable } from "svelte/store";

export let isNavVisible = writable(true);
export let appTheme = writable(localStorage.getItem("appTheme") || "light");
appTheme.subscribe(value => localStorage.setItem("appTheme", value));

export let isMobile = writable(window.innerWidth < 900);
window.addEventListener('resize', () => isMobile.set(window.innerWidth < 900))