<script>
  import { onMount } from "svelte";
  import Layout from "./Layout.svelte";
  import { appTheme } from "./components/states";

  let CurrentPage = $state(null);
  let routes = $state({});
  let dynamicRoutes = $state([]);
  let currentParams = $state(null);

  const pages = import.meta.glob("./pages/**/_page.svelte");

  async function loadRoutes() {
    for (const path in pages) {
      let routePath = path
        .replace("./pages", "")
        .replace("/_page.svelte", "")
        .toLowerCase();

      if (routePath === "") routePath = "/";
      if (routePath.includes("[")) {
        let regexPath = routePath.replace(/\[([^\]]+)\]/g, "([^/]+)"); // Ubah jadi regex
        dynamicRoutes.push({ regex: new RegExp(`^${regexPath}$`), loader: pages[path] });
      } else {
        routes[routePath] = pages[path];
      }
    }
  }

  async function loadPage(page) {
    try {
      if (routes[page]) {
        CurrentPage = (await routes[page]()).default;
        return;
      }

      for(let { regex, loader } of dynamicRoutes) {
        const match = page.match(regex);
        if (match) {
          let params = match.slice(1);
          let pageComponent = (await loader()).default;
          CurrentPage = pageComponent;
          currentParams = params;
          return;
        }
      }

      CurrentPage = (await import("./pages/noPage.svelte")).default;
    } catch (e) {
      CurrentPage = (await import("./pages/noPage.svelte")).default;
    }
  }

  onMount(async () => {
    await loadRoutes();
    await loadPage(window.location.pathname);

    window.addEventListener("popstate", async () => {
      await loadPage(window.location.pathname);
    });
    window.addEventListener("app:navigate", async () => await loadPage(window.location.pathname));
  });
</script>
<style>
  #root{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
<div id="root" data-theme={$appTheme}>
  {#if window.location.pathname === "/"}
    <CurrentPage params={currentParams}/>
  {:else}
    <Layout Content={CurrentPage} params={currentParams} />
  {/if}
</div>