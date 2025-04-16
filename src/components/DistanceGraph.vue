<template>
  <v-container class="mt-12">
    <v-card class="distance-graph-card pa-6" elevation="12">
      <v-card-title class="text-h5 font-weight-bold text-center">
        📈 Distance Graph
      </v-card-title>
      <v-card-text class="chart-container">
        <Line
          v-if="chartData.labels"
          :chart-data="chartData"
          :chart-options="chartOptions"
        />
        <div
          v-else
          class="d-flex align-center justify-center"
          style="height: 300px"
        >
          <span>Loading chart data...</span>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

// Default chart data with initial sample values
const chartData = ref({
  labels: ["10:00", "10:01", "10:02", "10:03", "10:04", "10:05"],
  datasets: [
    {
      label: "Distance (m)",
      backgroundColor: "rgba(25, 118, 210, 0.5)",
      borderColor: "rgba(25, 118, 210, 1)",
      borderWidth: 2,
      data: [0, 5, 9, 14, 18, 25],
      fill: false,
      tension: 0.2,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Distance (m)",
      },
    },
    x: {
      title: {
        display: true,
        text: "Time",
      },
    },
  },
});

// Update chart data from Firebase
import { db, ref as dbRef, onValue } from "@/firebase.js";

onMounted(() => {
  const distanceRef = dbRef(db, "/distance");
  onValue(distanceRef, (snapshot) => {
    const raw = snapshot.val();
    if (raw) {
      const entries = Object.entries(raw);
      chartData.value.labels = entries.map(([time]) => time);
      // Destructure without the unused variable 'time'
      chartData.value.datasets[0].data = entries.map(([, value]) => value);
    }
  });
});
</script>

<style scoped>
.distance-graph-card {
  border-radius: 16px;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.15);
}

.chart-container {
  position: relative;
  width: 100%;
  height: 300px;
}
</style>
