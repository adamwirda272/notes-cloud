<script>
    import { onMount } from 'svelte';
    import { notes } from '../../../lib/memory';
    import { isMobile, isNavVisible } from '../../../components/states';

    let { params } = $props();
    let noteId = $derived(params)

    let index = $derived($notes.findIndex(v => v.id === noteId[0]));

    onMount(() => {

    })
</script>

<style>
    .parent {
        display: grid;
        grid-template-rows: 50px 1fr;
        grid-template-areas: 'title''content';
        width: 100%;
        height: 100%;
        transition: all 0.25s ease;
        position: relative;
    }
    .title {
        background-color: var(--article-bg);
        color: var(--text-color);
        font-family: Helvetica, Sans-Serif;
        margin: 0;
        outline: none;
        border: none;
        grid-area: title;
        resize: none;
        width: 100%;
        height: 100%;
        line-height: 50px;
        overflow: hidden;
        font-size: large;
        font-weight: 600;
        
    }
    .content {
        background-color: var(--article-bg);
        color: var(--text-color);
        font-family: Helvetica, Sans-Serif;
        font-size: medium;
        overflow-y: auto;
        margin: 0;
        outline: none;
        border: none;
        grid-area: content;
        resize: none;
        width: 100%;
        height: 100%;
    }
    .title, .content {
        padding-left: 25px;
        padding-right: 25px;
        transition: opacity 0.25s ease, color 0.25s ease, background-color 0.25s ease;
    }
    .head-time {
        position: absolute;
        bottom: 15px;
        right: 20px;
    }
</style>

<div class="parent" style={`opacity:${$isMobile && $isNavVisible ? '0':'1'};`}>
    <div class="head-time">Last edited: {new Date($notes[index].updatedAt).toLocaleString()}</div>
    <textarea 
        id="title"
        class="title" 
        spellcheck="false"
        bind:value={$notes[index].title}
        maxlength="20"
        onkeypress={(e) => {if(e.key === 'Enter'){e.preventDefault(); document.getElementById('content').focus()}}}
    >
    </textarea>
    <textarea
        id="content"
        class="content" 
        spellcheck="false"
        bind:value={$notes[index].content}
    >
    </textarea>
</div>