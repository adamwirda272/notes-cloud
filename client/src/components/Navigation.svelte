<script>
    import { navigate } from "../lib/func";
    import { isMobile, isNavVisible } from "./states";
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
    .und-list {
        width: 100%;
        height: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;
        transition: all 0.25s ease;
        padding: 20px;
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
        font-weight: 600;
        padding: 5px;
    } .notes-icon {
        grid-area: icon;
    } .notes-title {
        grid-area: title;
        padding-left: 5px;
        font-size: large;
    } .last-updated {
        grid-area: date;
    }

    .notes-icon,.notes-title,.last-updated {
        display: flex;
        align-items: center;
    }
</style>
<div class="und-list" style={`opacity:${$isNavVisible ? '1':'0'};`}>
    {#each noteList as note}
        <li>
            <div class="title-li" onclick={() => {navigate('/notes/' + note.id);closeNavOnMobile()}} onkeypress={null} role="button" tabindex=0>
                <svg class="notes-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentcolor" viewBox="0 0 256 256"><path d="M90,96a6,6,0,0,1,6-6h64a6,6,0,0,1,0,12H96A6,6,0,0,1,90,96Zm6,38h64a6,6,0,0,0,0-12H96a6,6,0,0,0,0,12Zm32,20H96a6,6,0,0,0,0,12h32a6,6,0,0,0,0-12ZM222,48V156.69a13.94,13.94,0,0,1-4.1,9.9L166.59,217.9a13.94,13.94,0,0,1-9.9,4.1H48a14,14,0,0,1-14-14V48A14,14,0,0,1,48,34H208A14,14,0,0,1,222,48ZM48,210H154V160a6,6,0,0,1,6-6h50V48a2,2,0,0,0-2-2H48a2,2,0,0,0-2,2V208A2,2,0,0,0,48,210Zm153.52-44H166v35.52Z"></path></svg>
                <span class="notes-title">{note.title}</span>
                <span class="last-updated">{new Date(note.updatedAt).toLocaleString()}</span>
            </div>
        </li>
    {/each}
</div>
<CreateNoteBtn style='padding:5px' />