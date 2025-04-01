<script>
    import ToggleTheme from "./components/ToggleTheme.svelte";
    import ToggleNav from "./components/ToggleNav.svelte";
    import { isNavVisible, isMobile, contentLoaded } from "./components/states";
    import Navigation from "./components/Navigation.svelte";
    import axios from 'axios';
    import { onMount } from "svelte";
    import { notes } from "./lib/memory";
    import ToggleProfileModal from "./components/ToggleProfileModal.svelte";
    import ProfileModal from "./components/ProfileModal.svelte";
    import NotLoaded from "./components/NotLoaded.svelte";

    let { Content, params } = $props();

    const getData = async () => {
        try {
            const auth = await axios.get(import.meta.env.VITE_SERVER_HOST + '/api/refresh_token',{ withCredentials: true, validateStatus: (status) => {return status < 500}})
            if (auth.status !== 200) {
                window.location.href = '/'
                return;
            }
            const get = await axios.get(import.meta.env.VITE_SERVER_HOST + '/api/notes', { withCredentials : true, headers: { Authorization : `Bearer ${auth.data.access_token}` }})
            notes.update(existingNotes => {
                const newNotes = get.data.filter(newNote => 
                    !existingNotes.some(existingNote => existingNote.id === newNote.id)
                );
                return [...existingNotes, ...newNotes]
            })
            contentLoaded.set(true);
        } catch (error) {
            console.log(error)
        }
    }

    onMount(() => {
        getData();
    })
    
</script>
<style>  
    .grid {
        width: 100%;
        height: calc(100% - 44px);
        display: grid;
        grid-template-rows: 1fr;
        grid-template-areas: 'nav article article';
        gap: 0px;
        transition: all 0.25s ease;
        background-color: var(--article-bg);
        color: var(--text-color);
    }
    header {
        padding-right: 10px;
        background-color: var(--header-bg);
        z-index: 10;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        height: 44px;
    }

    nav {
        grid-area: nav;
        background-color: var(--nav-bg);
        overflow: hidden;
        text-wrap: nowrap;
        display: flex;
        flex-direction: column;
    }

    article {
        grid-area: article;
        background-color: var(--article-bg);

    }
</style>
{#if $contentLoaded}
<header class="shadow-sm">
    <div style="display: flex; flex-direction:row; justify-content:center; align-items: center; gap: 10px;; height:100%;">
        <ToggleNav/>
        <h3 class="no-select" style="color: var(--text-color);">NotesCLOUD</h3>
    </div>
    <div style="display: flex;flex-direction:row;">
        <ToggleTheme size='25px'/>
        <ToggleProfileModal/>
    </div>
</header>
<div class='grid' style={`grid-template-columns:${$isMobile ? ($isNavVisible ? '100% 0px 0px':'0px 1fr 1fr'):($isNavVisible ? '300px 1fr 1fr':'0px 1fr 1fr')};`}>
    <nav class="shadow-sm" style={`z-index:${$isMobile ? '10':'0'};`}>
        <Navigation />
    </nav>
    <article class="shadow-sm center" style={`z-index:${$isMobile ? '0':'10'};`}>
        <Content {params} />
    </article>
</div>
<ProfileModal/>
{:else}
<NotLoaded/>
{/if}