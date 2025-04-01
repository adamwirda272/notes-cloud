<script>
    import axios from "axios";


    import { contentLoaded, isMobile, isProfileVisible, userInfo } from "./states";

    const logout = async () => {
        try {
            await axios.delete(import.meta.env.VITE_SERVER_HOST + '/api/logout',{ withCredentials: true });
            setTimeout(() => {
                window.location.href = '/';
                contentLoaded.set(false);
                localStorage.removeItem('notes');
            }, 500)
        } catch (error) {
            setTimeout(() => {
                window.location.href = '/';
                contentLoaded.set(false);
                localStorage.removeItem('notes');
            }, 500)
        }
    }

</script>
<style>
    .bg {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        z-index: 30;
        transition: background 0.25s ease;
    }
    .container {
        width: 300px;
        height: auto;
        position: absolute;
        top: 44px;
        right: 10px;
        background-color: var(--header-bg);
        z-index: 40;
        transform-origin: top right;
        transition: transform 0.25s ease;
        border-radius: 25px;
        box-shadow: 0px 0px 20px 0 rgb(0 0 0 / 0.2);
        overflow: hidden;
    }
    .container-mobile {
        position: absolute;
        width: 100vw;
        height: 90dvh;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--header-bg);
        z-index: 40;
        transform-origin: bottom;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        transition: transform 0.25s ease;
        box-shadow: 0px 0px 20px 0 rgb(0 0 0 / 0.1);
    }
    .profile-content {
        color: var(--text-color);
        width: 100%;
        height: auto;
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
    } .username {
        font-size: large;
        font-weight: 600;
    } .email {
        color: var(--secondary-text-color);
    }
    .logout {
        width: 100%;
        height: 50px;
        color: rgb(255, 52, 52);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    } .logout:hover {
        background-color: var(--border-color);
    }

    .logout-mobile {
        color: rgb(255, 52, 52);
        padding: 20px;
        cursor: pointer;
    }
</style>
{#if $isProfileVisible}
    <div class="bg" style={`background-color: ${$isMobile ? 'rgba(0, 0, 0, 0.3)':'transparent'};`} onclick={() => isProfileVisible.update(v => !v)} onkeydown={null} role="button" tabindex=0>
    </div>
{/if}
<div class={`${$isMobile ? 'container-mobile':'container'}`} style={`transform: scaleX(${$isProfileVisible ? ($isMobile ? '100%': '100%'):($isMobile ? '100%':'0%')}) scaleY(${$isProfileVisible ? '100%':'0%'});`}>
    <div class="profile-content">
        <div class="username">{$userInfo.username}</div>
        <div class="email">{$userInfo.email}</div>
    </div>
    <div class={`${$isMobile ? 'logout-mobile':'logout'}`} onclick={logout} onkeydown={null} role="button" tabindex=0>
        Sign out
    </div>
</div>