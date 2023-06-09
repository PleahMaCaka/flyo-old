<script>
    import Greet from "../lib/Greet.svelte"
    import {onMount} from "svelte";
    import {registerTrayMenuEvents} from "../tauri/TrayMenuHandler"

    onMount(() => {
        console.log("mounted")
        registerTrayMenuEvents()
    })
</script>

<h1>Welcome to SvelteKit</h1>
<a href="/config">config</a>
<Greet />
