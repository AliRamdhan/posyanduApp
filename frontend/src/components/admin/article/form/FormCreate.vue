<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbTextarea } from "flowbite-vue";

const store = useStore();
const router = useRouter();

const articleData = ref({
  title: "",
  slug: "",
  shortDescription: "",
  images: null,
  content: "",
  error: null,
  imagePreview: null,
});

const data = computed(() => ({
  title: articleData.value.title,
  slug: articleData.value.slug,
  shortDescription: articleData.value.shortDescription,
  content: articleData.value.content,
  images: articleData.value.images,
}));

const handleImageChange = (e) => {
  const file = e.target.files[0];
  articleData.value.images = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    articleData.value.imagePreview = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("title", articleData.value.title);
  formData.append("slug", articleData.value.slug);
  formData.append("shortDescription", articleData.value.shortDescription);
  formData.append("content", articleData.value.content);
  formData.append("image", articleData.value.images);

  try {
    await store.dispatch("createArticle", formData);
    alert("Success created data");
    router.push({ name: "dashboardAdminArtikel" });
  } catch (error) {
    console.error("Error adding article:", error);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mt-8 flex flex-col gap-4">
      <div class="grid lg:grid-cols-2 gap-4">
        <div>
          <fwb-input
            v-model="articleData.title"
            label="Judul Artikel"
            required
          />
        </div>
        <div>
          <fwb-input v-model="articleData.slug" label="Slug Artikel" required />
        </div>
      </div>
      <div>
        <fwb-textarea
          v-model="articleData.shortDescription"
          :rows="4"
          label="Short Description"
        />
      </div>
      <div>
        <fwb-textarea
          v-model="articleData.content"
          :rows="4"
          label="Isi Artikel"
        />
      </div>
      <div>
        <input type="file" @change="handleImageChange" required />
        <img
          v-if="articleData.imagePreview"
          :src="articleData.imagePreview"
          alt="Image Preview"
          class="mt-4 w-32 h-32 object-cover"
        />
      </div>
    </div>
    <div class="space-x-4 mt-8">
      <fwb-button type="submit" color="default">Simpan</fwb-button>
      <fwb-button
        class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        type="button"
        @click="router.push({ name: 'dashboardAdminArtikel' })"
      >
        Batal
      </fwb-button>
    </div>
  </form>
</template>
