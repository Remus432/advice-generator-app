<script lang="ts">
  // Graphic Assets
  import PatternDividerMobile from "../assets/images/pattern-divider-mobile.svg"
  import PatternDividerDesktop from "../assets/images/pattern-divider-desktop.svg"
  import IconDice from "../assets/images/icon-dice.svg"
  // Components
  import Dice from "./Dice.svelte"
  // Audio
  import BineTest from "../bine-test.wav"
  // Utilities
  import { renderAudioVisualizer } from "../utilities/index"

  let adviceId: string = "117"
  let adviceQuote: string = `"It is easy to sit up and take notice, what's difficult is getting up and taking action."`

  const generateAdvice = async () => {
    const res = await fetch("https://api.adviceslip.com/advice")
    const { slip } = await res.json()

    adviceId = slip.id
    adviceQuote = slip.advice

    document.querySelector(".advice-card").style.backgroundColor = "unset"
    renderAudioVisualizer(BineTest)
  }

  
</script>

<article class="advice-card">
  <!-- <audio autoplay={true} loop={true} id="test" controls>
    <source src={BineTest} />
  </audio> -->
  <audio id="real-audio" controls>
    <source src={BineTest} />
  </audio>
  <canvas height="500" width="500" id="output"></canvas>
  <p class="advice-card__id">Advice #{adviceId}</p>
  <h1 class="advice-card__quote">{adviceQuote}</h1>
  <img 
    class="advice-card__divider" 
    srcset="{PatternDividerMobile} 360w, {PatternDividerDesktop} 1000w"
    sizes="(max-width: 1000px) 360px, 1000px"
    src={PatternDividerMobile} 
    alt="" />
  <div on:click={generateAdvice} class="advice-card__dice">
    <Dice />
  </div>
</article>

<style lang="scss">
  @use "../styles/variables";
  @use "../styles/query";

  .advice-card {
    background-color: variables.$color-darkblue--grayish;
    box-shadow: 3rem 5rem 8rem rgba(0, 0, 0, .1);
    border-radius: 1rem;
    cursor: pointer;
    padding: variables.$spacing-l variables.$spacing-s variables.$spacing-xxl variables.$spacing-s; 
    position: relative;
    text-align: center;
    transition: all .6s ease-in-out;

    &:hover {
      transform: translateY(-10px);
    }

    audio {
      position: absolute;
      visibility: hidden;
      opacity: 0;
    }

    &__id {
      color: variables.$color-green--neon;
      font-size: 1.1rem;
      letter-spacing: 3.5px;
      margin-bottom: variables.$spacing-s;
      text-transform: uppercase;
    }

    &__quote {
      color: variables.$color-cyan--light;
      font-size: 2.4rem;
      margin-bottom: variables.$spacing-s;
    }

    &__divider {
      margin-inline: auto;
      width: 100%;
    }

    &__dice {
      align-items: center;
      background-color: variables.$color-green--neon;
      border-radius: 50%;
      bottom: -3.2rem;
      display: flex;
      height: 6.4rem;
      justify-content: center;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      width: 6.4rem;
    }

    @include query.respond(desktop) {
      padding-inline: variables.$spacing-xl;
      padding-bottom: 7.2rem;
      max-width: 54rem;

      &__id { font-size: 1.3rem; }
      &__quote { 
        font-size: 2.8rem; 
        margin-bottom: variables.$spacing-l;
      }

      &__dice {
      
        &::before {
          box-shadow: 0 0 4rem variables.$color-green--neon;
          border-radius: 50%;
          content: "";
          height: 100%;
          left: 0;
          opacity: 0;
          position: absolute;
          top: 0;
          transition: opacity .6s ease-in;
          width: 100%;
        }

        &:hover { cursor: pointer; }

        &:hover::before {
          opacity: 1;
        }
      }
    }
  }
</style>