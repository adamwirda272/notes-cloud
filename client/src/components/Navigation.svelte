<script>
    import { navigate } from "../lib/func";
    import { currentPage, isMobile, isNavVisible } from "./states";
    import { notes } from "../lib/memory";
    import CreateNoteBtn from "./CreateNoteBtn.svelte";

    let noteList = null;

    notes.subscribe(v => {
        noteList = v
    })

    const closeNavOnMobile = () => {
        if ($isMobile) {
            isNavVisible.update(v => !v)
        }
    }

</script>
<style>
    .container {
        width: 100%;
        height: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        overflow-x: hidden;
        transition: all 0.25s ease;
        padding: 20px;
        text-wrap: nowrap;
    }
    li{
        list-style: none;
        cursor: pointer;
        height: auto;
        border-radius: 7px;
        border-bottom: 1px solid var(--border-color);
        margin-bottom: 2px;
        text-wrap: none;
        display: flex;
        align-items: center;
    } li:hover {
        background-color: var(--border-color);
    }
    .title-li {
        display: grid;
        align-items: center;
        grid-template-areas: 'icon title''date date';
        grid-template-rows: 1fr 1fr;
        grid-template-columns: auto 1fr;
        font-size: medium;
        width: 100%;
        height: 100%;
        padding: 5px;
        padding-left: 15px;
    } .notes-icon {
        grid-area: icon;
        color: var(--primary-color);
    } .notes-title {
        grid-area: title;
        padding-left: 5px;
        font-size: large;
    } .last-updated {
        grid-area: date;
        font-size: small;
        color: var(--secondary-text-color);
    }

    .notes-icon,.notes-title,.last-updated {
        display: flex;
        align-items: center;
    }
</style>
<div class="container" style={`opacity:${$isNavVisible ? '1':'0'};`}>
    {#each noteList as note}
        <li style={`background-color:${$currentPage === '/notes/'+note.id ? 'var(--border-color)':'none'};`}>
            <div class="title-li" onclick={() => {navigate('/notes/' + note.id);closeNavOnMobile()}} onkeypress={null} role="button" tabindex=0>
                <svg class="notes-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentcolor" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H156.69A15.92,15.92,0,0,0,168,219.31L219.31,168A15.92,15.92,0,0,0,224,156.69V48A16,16,0,0,0,208,32ZM96,88h64a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16Zm32,80H96a8,8,0,0,1,0-16h32a8,8,0,0,1,0,16ZM96,136a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm64,68.69V160h44.7Z"></path></svg>
                <span class="notes-title">{note.title}</span>
                <span class="last-updated">{new Date(note.updatedAt).toLocaleString()}</span>
            </div>
        </li>
    {/each}
</div>
<CreateNoteBtn style='padding-left:20px;padding-bottom:10px;padding-top:10px;opacity:{$isNavVisible ? '1':'0'};' />