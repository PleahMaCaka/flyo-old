<script lang="ts">
  import Greet from './lib/components/Greet.svelte'
  import {isRegistered, register} from "@tauri-apps/api/globalShortcut"
  import {onMount} from "svelte"
  import {appWindow} from "@tauri-apps/api/window";

  onMount(async () => {
    console.log("Registering shortcuts")
    if (!await isRegistered('CommandOrControl+`')) {
      console.log("Registering shortcut")
      await register('CommandOrControl+`', async () => {
        await appWindow.isVisible().then(isVisible => {
          if (isVisible) {
            appWindow.hide()
          } else {
            appWindow.show()
          }
        })
        console.log('Shortcut triggered');
      });
    } else {
      console.log("Shortcut already registered")
    }
  })

</script>

<main class="container">
  <h1>Welcome to Tauri!</h1>

  <div class="row">
    <a href="https://vitejs.dev" target="_blank">
      <img alt="Vite Logo" class="logo vite" src="/vite.svg" />
    </a>
    <a href="https://tauri.app" target="_blank">
      <img alt="Tauri Logo" class="logo tauri" src="/tauri.svg" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img alt="Svelte Logo" class="logo svelte" src="/svelte.svg" />
    </a>
  </div>

  <p>
    Click on the Tauri, Vite, and Svelte logos to learn more.
  </p>

  <div class="row">
    <Greet />
  </div>


</main>

<style>
  .logo.vite:hover {
    filter: drop-shadow(0 0 2em #747bff);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00);
  }
</style>
