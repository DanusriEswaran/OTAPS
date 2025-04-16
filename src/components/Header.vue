<template>
  <v-app-bar
    :color="isConnected ? 'primary' : 'red darken-3'"
    dark
    flat
    elevate-on-scroll
  >
    <v-container class="d-flex justify-center align-center">
      <v-card
        class="combined-card px-6 py-3 d-flex align-center"
        width="100%"
        elevation="12"
        color="#e0eafc"
      >
        <span class="train-icon">🚄</span>
        <span
          class="text-h4 font-weight-bold text-uppercase flex-grow-1 text-center"
          >OTAPS Dashboard</span
        >
        <v-card
          :color="isConnected ? 'success' : 'error'"
          class="status-chip px-4 py-2"
          text-color="white"
          flat
        >
          <v-card-text class="text-center white--text">
            <span v-if="isConnected">✅</span>
            <span v-else>⚠️</span>
            {{ isConnected ? "Connected" : "Disconnected" }}
          </v-card-text>
        </v-card>
      </v-card>
    </v-container>
  </v-app-bar>

  <v-container class="d-flex justify-start mt-12">
    <TrainStatusCard />
  </v-container>

  <!-- <v-container class="d-flex justify-end mt-12">
    <DistanceGraph />
  </v-container> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db, ref as dbRef, onValue } from "@/firebase.js";
import TrainStatusCard from "@/components/TrainStatusCard.vue";
// import DistanceGraph from "@/components/DistanceGraph.vue";

function playAlertSound() {
  const audio = new Audio("/alert.mp3");
  audio.play();
}

const isConnected = ref(false);

onMounted(() => {
  playAlertSound();
  const statusRef = dbRef(db, "/status/connection");
  onValue(statusRef, (snapshot) => {
    isConnected.value = snapshot.val() === "online";
  });
});
</script>

<script>
export default {
  name: "OTAPSHeader",
};
</script>

<style scoped>
.v-app-bar {
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.train-icon {
  font-size: 32px;
  margin-right: 12px;
  display: inline-block;
  animation: bounce 1s infinite;
}

.combined-card {
  border-radius: 12px;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.status-chip {
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  min-width: 160px;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
