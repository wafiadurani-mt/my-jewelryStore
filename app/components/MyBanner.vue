<template>
  <div class="bg-white h-auto flex">
    <!-- Banner Content -->
    <div 
      class="flex flex-col md:flex-col w-full md:w-2/5 lg:w-1/5 h-full bg-white p-6 md:p-10 overflow-hidden">
      <!-- Responsive Heading -->
      <h1 class="text-center md:text-left lg:md:text-justify font-sans font-bold text-5xl sm:text-6xl md:text-4xl lg:text-[1.9vw] mt-8 md:mt-12 lg:mt-16">
        It's all About New Year!
      </h1>

      <!-- Paragraph Text -->
      <p class="mt-9 md:mt-6 text-center md:text-left lg:text-center xl:text-justify text-2xl md:text-base lg:text-sm">
        Discover your iconic style. Ethically sourced, consciously crafted.
      </p>

      <!-- Buttons -->
      <div class="mt-6 md:mt-8 ml-0 md:-ml-4 flex flex-col sm:flex-row md:flex-row lg:flex-col xl:flex-row  items-center md  gap-3 sm:gap-4 md:gap-2">
        <!-- Shop Now Button (Full-width on small screens, inline on larger screens) -->
        <button
          class="w-full sm:w-auto inline-flex items-center justify-center
                rounded-full px-5 py-3 sm:px-6 sm:py-3
                text-sm sm:text-base font-medium
                bg-black text-white
                transition-all duration-200
                hover:bg-white hover:text-black
                hover:border-2 hover:border-black
                active:scale-[0.98] 
                whitespace-nowrap">
          Shop Now
        </button>

        <!-- About Us Button (Full-width on small screens, inline on larger screens) -->
        <button
          class="w-full sm:w-auto inline-flex items-center justify-center
                rounded-full px-5 py-3 sm:px-6 sm:py-3
                text-sm sm:text-base font-medium
                bg-white text-black border-2
                transition-colors duration-200
                hover:bg-black hover:text-white
                focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60
                active:scale-[0.98]
                whitespace-nowrap"
          @click="handleNavigation"
        >
          About Us
        </button>
      </div>

    </div>

    <!-- Auto Slider -->
     
    <div class="relative flex-1 overflow-hidden">
      <!-- Gradient overlays on both sides -->
      <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none z-10"></div>
      <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/70 to-transparent pointer-events-none z-10"></div>

      <!-- Slider track -->
      <div
        class="h-full flex items-center relative"
        :style="{
          width: (slides.length / VISIBLE) * 100 + '%',
          transform: `translateX(-${idx * (100 / slides.length)}%)`,
          transition: `transform ${TRANSITION_MS}ms ease-in-out`
        }"
      >
        <!-- Slides -->
        <div
          v-for="(img, i) in slides"
          :key="i"
          class="h-full flex items-center justify-center"
          :style="{ width: (100 / VISIBLE) + '%' }"
        >
          <NuxtImg
            :src="img.src"
            :alt="img.alt"
            width="600"
            height="800"
            class="h-full w-90 object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Dots -->
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        <button
          v-for="i in dotsCount"
          :key="'dot-' + (i-1)"
          class="h-2.5 w-2.5 rounded-full"
          :class="(i-1) === idx ? 'bg-black' : 'bg-black/30 hover:bg-black/60'"
          :aria-label="`Go to slide ${i}`"
          @click="goTo(i-1)"
        />
  </div>
</div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Controls
const VISIBLE = 3          // how many slides visible at once
const AUTOPLAY_MS = 5000   // time between slides (increase to slow down)
const TRANSITION_MS = 500  // animation speed (ms)

const slides = [
  { src: 'images/jewelry-img.jpg', alt: 'Jewelry 1' },
  { src: 'images/leaves.jpg',      alt: 'Jewelry 2' },
  { src: 'images/shirt.jpg',       alt: 'Jewelry 3' },
  { src: 'images/tessa.jpg',       alt: 'Jewelry 4' },
]

const maxIndex = computed(() => Math.max(0, slides.length - VISIBLE))
const dotsCount = computed(() => maxIndex.value + 1)

const idx = ref(0)
let timer

function next() {
  idx.value = (idx.value >= maxIndex.value) ? 0 : idx.value + 1
}
function goTo(i) {
  idx.value = Math.min(Math.max(i, 0), maxIndex.value)
}
function start() {
  stop()
  timer = setInterval(next, AUTOPLAY_MS)
}
function stop() {
  if (timer) clearInterval(timer)
}

onMounted(start)
onUnmounted(stop)

// existing navigation
const handleNavigation = async () => {
  await navigateTo('/about')
}
</script>

<style scoped>
/* Optional custom styles can go here */
</style>
