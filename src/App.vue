<template>
  <LoadingScreen v-if="loading" />
  <TrainDashboard v-else />
</template>

<script>
import LoadingScreen from "./components/LoadingScreen.vue";
import TrainDashboard from "./components/TrainDashboard.vue";

export default {
  data() {
    return { loading: true };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  components: { LoadingScreen, TrainDashboard },
};
</script>
