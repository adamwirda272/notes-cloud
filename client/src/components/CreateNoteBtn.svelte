<script>
    import axios from "axios";
    import { navigate } from "../lib/func";
    import { notes } from "../lib/memory";
    import { isMobile, isNavVisible } from "./states";
    let { style } = $props();

    const onSubmit = async () => {
        try {
            const auth = await axios.get(import.meta.env.VITE_SERVER_HOST + '/api/refresh_token',{ withCredentials: true, validateStatus: (status) => {return status < 500}})
            if (auth.status !== 200) {
                window.location.href = '/'; 
                return;
            }
            const response = await axios.post(import.meta.env.VITE_SERVER_HOST + '/api/notes',{
                title: 'Untitled',
                content: ''
            }, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${auth.data.access_token}` },
                validateStatus: (status) => {return status < 500}
            })
            if (response.status === 201) {
                notes.update(currentLoaded => {
                    return [...currentLoaded, response.data.note]
                })
                navigate('/notes/' + response.data.note.id)
                if ($isMobile) {
                    isNavVisible.update(v => !v)
                }
            }
            console.log(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }
</script>
<style>
    .div-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        user-select: none;
        gap: 5px;
        border-radius: 7px;
    } .div-btn:hover {
        background-color: var(--border-color);
    }
</style>
<div onclick={onSubmit} onkeypress={() => null} role='button' tabindex=0 class="div-btn" style={style}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentcolor" viewBox="0 0 256 256"><path d="M228.24,59.76l-32-32a6,6,0,0,0-8.48,0l-96,96A6,6,0,0,0,90,128v32a6,6,0,0,0,6,6h32a6,6,0,0,0,4.24-1.76l96-96A6,6,0,0,0,228.24,59.76ZM125.51,154H102V130.49l66-66L191.51,88ZM200,79.51,176.49,56,192,40.49,215.51,64ZM222,128v80a14,14,0,0,1-14,14H48a14,14,0,0,1-14-14V48A14,14,0,0,1,48,34h80a6,6,0,0,1,0,12H48a2,2,0,0,0-2,2V208a2,2,0,0,0,2,2H208a2,2,0,0,0,2-2V128a6,6,0,0,1,12,0Z"></path></svg>
    <span>New note</span>
</div>