<script lang="ts">
  // Components
  import AdviceCard from "./components/AdviceCard.svelte"
  // Audio
  import BineTest from "./bine-test.wav"
  // Core
  import { onMount } from "svelte"

</script>

<main>
  <AdviceCard />
</main>

<style lang="scss" global>
  @use "./index" as *;

  canvas {
    border-radius: 1rem;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
</style>
