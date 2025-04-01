import { writable } from "svelte/store";

export let contentLoaded = writable(false)

export let isNavVisible = writable(true);
export let appTheme = writable(localStorage.getItem("appTheme") || "light");
appTheme.subscribe(value => {localStorage.setItem("appTheme", value);document.documentElement.setAttribute("data-theme",value);});

export let isMobile = writable(window.innerWidth < 700);
window.addEventListener('resize', () => isMobile.set(window.innerWidth < 700))

export let isProfileVisible = writable(false);

export let currentPage = writable(window.location.pathname);
window.addEventListener("app:navigate", () => {
    currentPage.set(window.location.pathname);
});

export let userInfo = writable(JSON.parse(sessionStorage.getItem('userInfo')) || {});