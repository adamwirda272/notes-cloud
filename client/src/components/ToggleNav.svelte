<script>
    import { isNavVisible } from "./states";
</script>
<style>
    .nav-btn {
        cursor: pointer;
        height: 100%;
        padding-left: 15px;
        padding-right: 15px;
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--text-color);
    } .nav-btn:hover {background-color: var(--shadow-color);}
</style>
<button class="center nav-btn" aria-label="Toggle Nav" onclick={() => isNavVisible.update(value => !value)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128ZM40,70H216a6,6,0,0,0,0-12H40a6,6,0,0,0,0,12ZM216,186H40a6,6,0,0,0,0,12H216a6,6,0,0,0,0-12Z"></path></svg>
</button>