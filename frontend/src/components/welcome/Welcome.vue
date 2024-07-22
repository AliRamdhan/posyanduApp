<template>
  <section
    class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
  >
    <div class="grid gap-5 row-gap-8 lg:grid-cols-2">
      <div class="flex flex-col justify-center">
        <div class="max-w-xl mb-6">
          <div>
            <p
              class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-gray-300"
            >
              POSYANDU RW 10
            </p>
          </div>
          <h2
            class="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Segala yang Anda<br class="hidden md:block" />
            butuhkan untuk kesehatan komunitas
            <span class="inline-block text-deep-purple-accent-400"
              >ada di sini</span
            >
          </h2>
          <p class="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Posyandu menyediakan layanan kesehatan penting, memastikan
            kesejahteraan ibu dan anak. Ini adalah pilar komunitas kita,
            menawarkan pendidikan, imunisasi, dan dukungan gizi kepada semua
            yang membutuhkannya.
          </p>
        </div>
        <router-link
          to="/signin"
          class="group inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800 p-3"
        >
          Yuk Periksa Perkembangan!
          <svg
            class="inline-block w-3 ml-2 group-hover:translate-x-10 transition-all duration-300"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path
              d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"
            ></path>
          </svg>
        </router-link>
      </div>
      <div class="relative">
        <svg
          class="absolute w-full text-teal-accent-400"
          fill="currentColor"
          viewBox="0 0 600 392"
        >
          <rect x="0" y="211" width="75" height="181" rx="8"></rect>
          <rect x="525" y="260" width="75" height="132" rx="8"></rect>
          <rect x="105" y="83" width="75" height="309" rx="8"></rect>
          <rect x="210" y="155" width="75" height="237" rx="8"></rect>
          <rect x="420" y="129" width="75" height="263" rx="8"></rect>
          <rect x="315" y="0" width="75" height="392" rx="8"></rect>
        </svg>
        <svg
          class="relative w-full text-deep-purple-accent-400"
          fill="currentColor"
          viewBox="0 0 600 392"
        >
          <rect x="0" y="311" width="75" height="81" rx="8"></rect>
          <rect x="525" y="351" width="75" height="41" rx="8"></rect>
          <rect x="105" y="176" width="75" height="216" rx="8"></rect>
          <rect x="210" y="237" width="75" height="155" rx="8"></rect>
          <rect x="420" y="205" width="75" height="187" rx="8"></rect>
          <rect x="315" y="83" width="75" height="309" rx="8"></rect>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
