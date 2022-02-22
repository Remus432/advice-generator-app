<script lang="ts">
  // GSAP
  import { gsap } from "gsap"
  // Core
  import { onMount } from "svelte"

  let randDiceNumb: number = 0
  let diceDots

  onMount(() => {
    diceDots = Array.from(document.querySelectorAll(".dice__dot")).filter(item => !item.classList.contains("dice__dot--placeholder"))

    diceDots.forEach((dot, i) => {
      if (i == 2 || i == 4) {
        dot.classList.add("hide")
      }
    })
  })

  const generateRandDice = () => {
  

    setInterval(() => {
      randDiceNumb = 1 + Math.round((Math.random() * (5 - 1 + 1)))

      console.log(randDiceNumb)

      diceDots.forEach(dot => {
        if (!dot.classList.contains("hide")) {
          dot.classList.add("hide")
        } else {
          dot.classList.remove("hide")
          dot.classList.add("hide")
        }
      })
    
      if (randDiceNumb === 1) {
        diceDots[3].classList.remove("hide")
      }

      if (randDiceNumb === 2) { 
        diceDots[0].classList.remove("hide")
        diceDots[3].classList.remove("hide")
      }

      if (randDiceNumb === 3) {
        diceDots[0].classList.remove("hide")
        diceDots[3].classList.remove("hide")
        diceDots[6].classList.remove("hide")
      }

      if (randDiceNumb === 4) {
        diceDots[0].classList.remove("hide")
        diceDots[1].classList.remove("hide")
        diceDots[5].classList.remove("hide")
        diceDots[6].classList.remove("hide")
      }

      if (randDiceNumb === 5) {
        diceDots[0].classList.remove("hide")
        diceDots[1].classList.remove("hide")
        diceDots[3].classList.remove("hide")
        diceDots[5].classList.remove("hide")
        diceDots[6].classList.remove("hide")
      }

      if (randDiceNumb === 6) {
        diceDots.forEach(dot => dot.classList.remove("hide"))
        diceDots[3].classList.add("hide")
      }

    }, 1500)
  }
</script>

<div on:click={generateRandDice} class="dice"> 
  <div class="dice__dots">
    <div class="dice__dot dice__dot--1"></div>
    <div class="dice__dot dice__dot--placeholder"></div>
    <div class="dice__dot dice__dot--2"></div>
    <div class="dice__dot dice__dot--3"></div>
    <div class="dice__dot dice__dot--4"></div>
    <div class="dice__dot dice__dot--5"></div>
    <div class="dice__dot dice__dot--6"></div>
    <div class="dice__dot dice__dot--placeholder"></div>
    <div class="dice__dot dice__dot--7"></div>
  </div>
</div>

<style lang="scss">
  @use "../styles/variables";

  .dice {
    animation: rotateDice 5s forwards ease-in;
    background-color: variables.$color-darkblue;
    border-radius: 4px;
    height: 2.8rem;
    perspective: 900px;
    position: relative;
    transform-style: preserve-3d;
    width: 2.8rem;

    &__dots {
      animation: scaleDot 1s backwards infinite ease-in;
      align-items: center;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 100%;
      justify-items: center;
      padding: 4px;
      position: absolute;
      transform: scale(1);
      width: 100%;
    }

    &__dot {
      background-color: variables.$color-green--neon;
      border-radius: 50%;
      height: 3px;
      opacity: 1;
      width: 3px;

      &--placeholder, &--placeholder {
        opacity: 0;
      }

        // &--3, &--5 {
        //   opacity: 0;
        // }
    }
  }

  @keyframes scaleDots {
    from {
      transform: scale(1);
    }

    to {
      transform: scale(0);
    }
  }

  @keyframes rotateDice {
    0% {
      transform: rotateZ(0);
    }

    35% {
      transform: rotateZ(180deg);
    }

    70% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
</style>