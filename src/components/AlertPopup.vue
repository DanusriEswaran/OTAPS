<!-- App.vue or any other parent component -->
<template>
  <AlertPopup :show="showAlert" message="Train Obstruction Detected!" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import AlertPopup from "@/components/AlertPopup.vue";
import alertSound from "@/assets/alert1.mp3";

const showAlert = ref(false);

onMounted(() => {
  showAlert.value = true;

  const audio = new Audio(alertSound);
  audio.play().catch(() => {
    window.addEventListener("click", () => audio.play(), { once: true });
  });

  setTimeout(() => {
    showAlert.value = false;
  }, 5000);
});
</script>
