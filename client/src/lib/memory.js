import { writable } from "svelte/store";

export let notes = writable(JSON.parse(localStorage.getItem('notes')) || []);

notes.subscribe(value => {
    localStorage.setItem('notes', JSON.stringify(value))
})