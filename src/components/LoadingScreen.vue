<template>
  <v-container class="loading-container">
    <div class="lottie-container">
      <Vue3Lottie :animationData="animationData" />
    </div>
  </v-container>
</template>

<script>
import { Vue3Lottie } from "vue3-lottie";
import animationData from "@/assets/train-animation.json";

export default {
  components: { Vue3Lottie },
  data() {
    return { animationData };
  },
};
</script>

<style>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* Ensures responsiveness */
  height: 100vh; /* Fallback for full height */
}
.v-container {
  height: 100vh; /* Full viewport height */
}
.lottie-container {
  justify-content: center;
  align-items: center;
  width: 500px; /* Change this to any size */
  height: 300px;
}
</style>
