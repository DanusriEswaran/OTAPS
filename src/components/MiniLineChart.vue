<template>
  <div>
    <!-- Use the Line component from vue-chartjs -->
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from "vue-chartjs"; // Import Line from vue-chartjs
import { ref, watchEffect } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register required chart components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default {
  name: "MiniLineChart",
  components: {
    Line, // Ensure the Line component is used properly here
  },
  props: {
    dataPoints: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#2196f3",
    },
  },
  setup(props) {
    const chartData = ref({
      labels: Array.from({ length: props.dataPoints.length }, (_, i) => i + 1),
      datasets: [
        {
          label: props.label,
          borderColor: props.color,
          backgroundColor: "transparent",
          data: props.dataPoints,
          fill: false,
          tension: 0.4,
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: false,
        },
        y: {
          min: 0,
          max: Math.max(...props.dataPoints) + 1,
          ticks: {
            stepSize: 1,
          },
        },
      },
    });

    watchEffect(() => {
      chartData.value.datasets[0].data = props.dataPoints;
    });

    return { chartData, chartOptions };
  },
};
</script>

<style scoped>
div {
  width: 100%;
  height: 200px;
}
</style>
