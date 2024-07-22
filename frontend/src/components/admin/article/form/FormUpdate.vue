<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { FwbInput, FwbButton, FwbTextarea } from "flowbite-vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const articleData = ref({
  title: "",
  slug: "",
  shortDescription: "",
  content: "",
  images: null,
  imagePreview: null,
});

const fetchArticle = async () => {
  try {
    const data = await store.dispatch("fetchArticleById", route.params.id);
    articleData.value = {
      title: data.title,
      slug: data.slug,
      shortDescription: data.shortDescription,
      content: data.content,
      images: data.images,
      imagePreview: data.images,
    };
  } catch (error) {
    console.error("Error fetching article data:", error);
  }
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  articleData.value.images = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    articleData.value.imagePreview = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleUpdate = async () => {
  const formData = new FormData();
  formData.append("title", articleData.value.title);
  formData.append("slug", articleData.value.slug);
  formData.append("shortDescription", articleData.value.shortDescription);
  formData.append("content", articleData.value.content);
  if (articleData.value.images) {
    formData.append("image", articleData.value.images);
  }

  try {
    await store.dispatch("updateArticle", {
      id: route.params.id,
      articleData: formData,
    });
    alert("Success updated data");
    router.push({ name: "dashboardAdminArtikel" });
  } catch (error) {
    console.error("Error updating article:", error);
  }
};

onMounted(() => {
  fetchArticle();
});
</script>

<template>
  <form @submit.prevent="handleUpdate">
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
        <input type="file" @change="handleImageChange" />
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
