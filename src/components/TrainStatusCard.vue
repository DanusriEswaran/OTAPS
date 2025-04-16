<template>
  <v-container class="d-flex justify-start mt-12 ml-4">
    <v-card class="train-status-card px-8 py-6" max-width="420" elevation="12">
      <v-card-title class="text-h5 font-weight-bold text-right pr-2">
        🚦 Train Status
      </v-card-title>

      <v-card-text class="text-left text-body-1">
        <div class="mb-4 status-line">
          <span class="status-icon">📶</span> Status:
          <strong>{{ status }}</strong>
        </div>
        <div class="mb-4 status-line">
          <span class="status-icon">💨</span> Speed:
          <strong>{{ speed }} km/h</strong>
        </div>
        <div class="status-line">
          <span class="status-icon">📍</span> Location:
          <strong>Coimbatore</strong>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db, ref as dbRef, onValue } from "@/firebase.js";

const status = ref("Unknown");
const speed = ref(0);

onMounted(() => {
  const trainRef = dbRef(db, "/train");
  onValue(trainRef, (snapshot) => {
    const data = snapshot.val();
    status.value = data?.status || "Unknown";
    speed.value = data?.speed || 0;
  });
});
</script>

<style scoped>
.train-status-card {
  border-radius: 16px;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.15);
  font-size: 20px;
  font-weight: 500;
  transition: 0.3s ease-in-out;
  margin-left: 40px;
}

.train-status-card:hover {
  transform: scale(1.02);
}

.status-line {
  font-size: 20px;
  line-height: 1.6;
}

.status-icon {
  margin-right: 8px;
  font-size: 22px;
}
</style>
