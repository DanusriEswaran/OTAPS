<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="fill-height d-flex flex-column justify-start align-center pa-6"
        :style="{ backgroundColor: danger ? 'red' : '#36454F' }"
      >
        <!-- Header Card -->
        <v-card
          class="pa-8 text-center shadow-card max-width-900 elevation-24 rounded-xl mb-6 mx-auto"
          style="background-color: #b7d5eb"
        >
          <v-card-title class="text-h2 font-weight-bold text-primary">
            OTAPS
          </v-card-title>
          <div>
            <v-card-text
              class="text-subtitle-1 font-weight-medium mt-4 text-grey-darken-2"
            >
              Open Train Accident Prevention System
            </v-card-text>
          </div>
        </v-card>

        <!-- Alert Card -->
        <v-card
          class="pa-6 text-center shadow-card elevation-12 rounded-lg w-100"
          :style="{ backgroundColor: danger ? '#ff4d4d' : '#b7d5eb' }"
        >
          <v-card-title
            class="text-h4 font-weight-bold"
            :class="danger ? 'text-black-darken-4' : 'text-green-darken-3'"
          >
            {{ danger ? "⚠️ Alert!" : "No Alert!" }}
          </v-card-title>
        </v-card>

        <!-- Hidden Audio -->
        <audio ref="alertAudio" :src="file"></audio>

        <!-- Acceleration -->
        <div
          class="d-flex justify-center align-start mt-8"
          style="gap: 20px; flex-wrap: wrap"
        >
          <!-- Acceleration X -->
          <v-card
            class="pa-6 text-center elevation-12 rounded-lg"
            style="background-color: #b7d5eb; height: 100px"
          >
            <div style="flex: 1; min-width: 300px; max-width: 400px">
              <v-card-title class="text-h6 font-weight-bold">
                Acceleration X (Left-Right)
              </v-card-title>
              <v-card-text class="mt-6">
                <h2 class="text-h4 font-weight-bold text-primary">
                  {{ accelX }}
                </h2>
              </v-card-text>
            </div>
          </v-card>

          <!-- Acceleration Y -->
          <v-card
            class="pa-6 text-center elevation-12 rounded-lg"
            style="background-color: #b7d5eb; height: 100px"
          >
            <div style="flex: 1; min-width: 300px; max-width: 400px">
              <v-card-title class="text-h6 font-weight-bold">
                Acceleration Y (Forward-Backward)
              </v-card-title>
              <v-card-text class="mt-6">
                <h2 class="text-h4 font-weight-bold text-primary">
                  {{ accelY }}
                </h2>
              </v-card-text>
            </div>
          </v-card>

          <!-- Acceleration Z -->
          <v-card
            class="pa-6 text-center elevation-12 rounded-lg"
            style="background-color: #b7d5eb; height: 100px"
          >
            <div style="flex: 1; min-width: 300px; max-width: 400px">
              <v-card-title class="text-h6 font-weight-bold">
                Acceleration Z (Up-Down)
              </v-card-title>
              <v-card-text class="mt-6">
                <h2 class="text-h4 font-weight-bold text-primary">
                  {{ accelZ }}
                </h2>
              </v-card-text>
            </div>
          </v-card>
        </div>

        <!-- Distance Card -->
        <v-card
          class="pa-6 text-center shadow-card elevation-12 rounded-lg w-100 mt-8"
          style="background-color: #b7d5eb"
        >
          <v-card-title class="text-h6 font-weight-bold">
            Current Distance
          </v-card-title>
          <v-card-text>
            <h2 class="text-h3 font-weight-bold text-primary">
              {{ distance.toFixed(2) }}
            </h2>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db, ref, onValue } from "@/firebase.js";
import alertAudio from "@/assets/alert.mp3";

export default {
  data() {
    return {
      file: alertAudio,
      danger: false,
      lastDangerState: false,
      accelX: 0,
      accelY: 0,
      accelZ: 0,
      distance: 0,
      userInteracted: false,
      accelXHistory: [],
    };
  },

  methods: {
    playAlertSound() {
      const audio = this.$refs.alertAudio;
      if (audio) {
        audio.play();
      } else {
        console.log("audio element not found");
      }
    },
  },

  mounted() {
    const dangerRef = ref(db, "sensors/danger");
    const accelXRef = ref(db, "sensors/accel_x");
    const accelYRef = ref(db, "sensors/accel_y");
    const accelZRef = ref(db, "sensors/accel_z");
    const distanceRef = ref(db, "sensors/distance");

    window.addEventListener(
      "click",
      () => {
        this.userInteracted = true;
      },
      { once: true }
    );

    // Listen to danger state
    onValue(dangerRef, (snapshot) => {
      const value = snapshot.val();
      if (value === true && !this.lastDangerState) {
        this.playAlertSound();
      }
      this.danger = value;
      this.lastDangerState = value;
    });

    // Listen to acceleration data for X
    onValue(accelXRef, (snapshot) => {
      this.accelX = snapshot.val();
    });

    // Listen to acceleration data for Y
    onValue(accelYRef, (snapshot) => {
      this.accelY = snapshot.val();
    });

    // Listen to acceleration data for Z
    onValue(accelZRef, (snapshot) => {
      this.accelZ = snapshot.val();
    });

    // Listen to distance data
    onValue(distanceRef, (snapshot) => {
      this.distance = snapshot.val();
      // this.distance = value || 0;
      // const step = (targetValue) => {
      //   if (this.animatedDistance < targetValue) {
      //     this.animatedDistance += (targetValue - this.animatedDistance) * 0.05;
      //     requestAnimationFrame(() => step(targetValue));
      //   }
      // };

      // step(this.distance);
    });
  },
};
</script>

<style scoped>
.shadow-card {
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  border: none;
}
.max-width-900 {
  max-width: 900px;
}
</style>
