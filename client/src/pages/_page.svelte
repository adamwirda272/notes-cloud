<script>
    import ToggleTheme from "../components/ToggleTheme.svelte";
    import axios from "axios";

    let ident = $state('');
    let password = $state('');

    let status = $state('')

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_HOST + '/api/login', {
                identifier: ident,
                password: password
            },{
                validateStatus: function(status) {
                    return status < 500
                },

                withCredentials: true
            })
            if (response.status !== 200) {
                status = response.data.message;
                return;
            }
            status = response.data.message;
            sessionStorage.setItem('userInfo', JSON.stringify(response.data.credentials));
            setTimeout(() => {
                window.location.href = '/notes'
            },500)
        } catch (error) {
            console.log(error)
        }
    }
</script>
<style>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--bg-color);
        color: var(--text-color);
        position: relative;
    }

    .login-form {
        background-color: var(--article-bg);
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px var(--shadow-color);
        width: 300px;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background-color: var(--nav-bg);
        color: var(--text-color);
    }

    button {
        width: 100%;
        padding: 0.5rem;
        background-color: var(--button-bg);
        color: var(--button-text);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: var(--link-hover-color);
    }

    .toggle-theme {
        position: absolute;
        top: 15px;
        right: 15px;
    }
</style>
<div class="login-container">
    <div class="toggle-theme">
        <ToggleTheme size='30px'/>
    </div>
    <form class="login-form" onsubmit={onSubmit}>
        <h2>Sign in</h2>
        <div class="form-group">
            <label for="ident">Email or Username</label>
            <input type="text" id="ident" bind:value={ident} required />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" bind:value={password} required />
        </div>
        <p>{status}</p>
        <button type="submit">Login</button>
    </form>
</div>