<script>
    import Greet from "../lib/Greet.svelte"
    import {onMount} from "svelte";

    onMount(() => {
        console.log("mounted")
    })
</script>

<h1>Welcome to SvelteKit</h1>
<Greet />
