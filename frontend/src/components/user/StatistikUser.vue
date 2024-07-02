<script setup>
import CountUp from "vue-countup-v3";
</script>
<template>
  <section
    class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14"
  >
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div class="text-center">
        <div
          class="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12"
        >
          <font-awesome-icon
            icon="fa-solid fa-person-pregnant"
            class="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
          />
        </div>
        <h6 class="text-4xl font-bold text-black">
          <count-up :end-val="2000"></count-up>
        </h6>
        <p class="mb-2 font-bold text-md text-black">Ibu Hamil</p>
        <p class="text-gray-800">
          It’s something that’s many of the wisest people in history have kept
          in mind.
        </p>
      </div>
      <div class="text-center">
        <div
          class="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12"
        >
          <font-awesome-icon
            icon="fa-solid fa-child"
            class="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
          />
        </div>
        <h6 class="text-4xl font-bold text-black">
          <count-up :end-val="2000"></count-up>
        </h6>
        <p class="mb-2 font-bold text-md text-black">Baduta</p>
        <p class="text-gray-800">
          For many men, the acquisition of wealth does not end their troubles,
          it only changes them.
        </p>
      </div>
      <div class="text-center">
        <div
          class="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12"
        >
          <font-awesome-icon
            icon="fa-solid fa-child"
            class="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
          />
        </div>
        <h6 class="text-4xl font-bold text-black">
          <count-up :end-val="2000"></count-up>
        </h6>
        <p class="mb-2 font-bold text-md text-black">Balita</p>
        <p class="text-gray-800">
          It's a helluva start, being able to recognize what makes you happy
          today, in this moment.
        </p>
      </div>
      <div class="text-center">
        <div
          class="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12"
        >
          <font-awesome-icon
            icon="fa-solid fa-person-breastfeeding"
            class="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
          />
        </div>
        <h6 class="text-4xl font-bold text-black">
          <count-up :end-val="2000"></count-up>
        </h6>
        <p class="mb-2 font-bold text-md text-black">Ibu Menyusui</p>
        <p class="text-gray-800">
          Happiness is when what you think, what you say, and what you do are in
          harmony.
        </p>
      </div>
    </div>
  </section>
</template>



<style></style>
