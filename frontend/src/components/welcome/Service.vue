<script setup>
import ServiceHomeCard from "../card/ServiceHomeCard.vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Register the Swiper and SwiperSlide components
</script>

<template>
  <div
    class="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12"
  >
    <div class="grid gap-24 row-gap-8 lg:grid-cols-5">
      <div class="grid gap-8 lg:col-span-2">
        <swiper
          :spaceBetween="30"
          :centeredSlides="true"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
          :modules="[Autoplay, Navigation]"
          class="mySwiper"
        >
          <swiper-slide>
            <ServiceHomeCard
              name1="Imunisasi"
              description1="Posyandu kami menyediakan layanan imunisasi lengkap untuk bayi dan balita guna memastikan kesehatan dan perlindungan mereka dari berbagai penyakit."
              name2="Pemantauan Gizi"
              description2="Kami melakukan pengecekan rutin gizi dan tumbuh kembang anak untuk memastikan mereka mendapatkan asupan nutrisi yang optimal."
            />
          </swiper-slide>
          <swiper-slide>
            <ServiceHomeCard
              name1="Pendidikan Kesehatan"
              description1="Kami memberikan edukasi kesehatan bagi ibu dan anak, termasuk informasi mengenai nutrisi, kebersihan, dan perawatan kesehatan dasar."
              name2="Konsultasi Kesehatan"
              description2="Konsultasi dengan tenaga kesehatan profesional untuk berbagai masalah kesehatan yang dialami oleh ibu dan anak."
            />
          </swiper-slide>
          <swiper-slide>
            <ServiceHomeCard
              name1="Pemeriksaan Kesehatan"
              description1="Pemeriksaan kesehatan rutin untuk seluruh keluarga guna memastikan kondisi kesehatan yang optimal dan deteksi dini penyakit."
              name2="Pelayanan Gizi"
              description2="Penyuluhan dan penanganan gizi untuk ibu dan anak, termasuk pemberian vitamin dan makanan tambahan bagi yang membutuhkan."
            />
          </swiper-slide>
        </swiper>
      </div>
      <div
        class="grid border divide-y rounded lg:col-span-3 sm:grid-cols-2 sm:divide-y-0 sm:divide-x"
      >
        <div class="flex flex-col justify-between p-10">
          <div>
            <p class="text-lg font-semibold text-gray-800 sm:text-base">
              Layanan Posyandu
            </p>
            <p
              class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl"
            >
              Komprehensif
            </p>
          </div>
          <div>
            <p class="text-lg font-semibold text-gray-800 sm:text-base">
              Tenaga Kesehatan
            </p>
            <p
              class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl"
            >
              Profesional
            </p>
          </div>
          <div>
            <p class="text-lg font-semibold text-gray-800 sm:text-base">
              Edukasi Kesehatan
            </p>
            <p
              class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl"
            >
              Terbaik
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-between p-10">
          <div>
            <p class="text-lg font-semibold text-gray-800 sm:text-base">
              Konsultasi Kesehatan
            </p>
            <p
              class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl"
            >
              Gratis
            </p>
          </div>
          <div>
            <p class="text-lg font-semibold text-gray-800 sm:text-base">
              Pemantauan Tumbuh Kembang
            </p>
            <p
              class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl"
            >
              Rutin
            </p>
          </div>
          <div>
            <p class="text-lg font-semibold text-gray-800 sm:text-base">
              Pemeriksaan Kesehatan
            </p>
            <p
              class="text-2xl font-bold text-deep-purple-accent-400 sm:text-xl"
            >
              Menyeluruh
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
