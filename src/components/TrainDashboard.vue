<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="fill-height d-flex flex-column justify-start align-center pa-6"
        :class="danger ? 'blinking-container' : ''"
        :style="{
          backgroundColor: danger ? '#ffcccc' : '#36454F',
          borderRadius: '12px',
          marginTop: '20px',
          marginRight: '15px',
          marginLeft: '18px',
        }"
      >
        <!-- Header Card -->
        <div
          class="d-flex align-items-center justify-between mb-6"
          style="width: 100%; max-width: 900px; margin: 0 auto"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: flex-start;
            "
          >
            <img
              :src="trainLogo"
              alt="train logo"
              height="140px"
              width="120px"
              style="margin-left: 0px; margin-right: 0px"
            />
          </div>

          <div
            class="d-flex justify-center"
            style="flex: 1; text-align: center"
          >
            <v-card
              class="pa-8 shadow-card elevation-24 rounded-xl"
              style="background-color: #b7d5eb; width: 100%; max-width: 600px"
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
          </div>
          <div></div>
        </div>

        <!-- Train Details Card -->
        <v-card
          class="pa-6 mb-6 text-left shadow-card elevation-12 rounded-lg w-100"
          style="background-color: #b7d5eb"
        >
          <v-card-title class="mb-8 text-h4 font-weight-bold text-primary">
            🚆 Train Details
          </v-card-title>
          <v-card-text class="text-h6 mt-4">
            <div class="d-flex justify-start mb-2">
              <div class="mr-4">
                <i class="fas fa-train"></i> <strong>Train Name:</strong>
                {{ trainDetails.name }}
              </div>
              <div class="ml-16">
                <i class="fas fa-id-badge"></i> <strong>Train ID:</strong>
                {{ trainDetails.id }}
              </div>
            </div>

            <div class="d-flex justify-start">
              <div class="mr-4">
                <i class="fas fa-route"></i> <strong>Route:</strong>
                {{ trainDetails.route }}
              </div>
              <div class="ml-10">
                <i class="fas fa-bolt mr-2"></i>
                <strong>Train Type:</strong> {{ trainDetails.type }}
              </div>
            </div>
          </v-card-text>
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
import trainLogo from "@/assets/train-logo.png";

export default {
  data() {
    return {
      trainDetails: {
        name: "Thomas Express",
        id: "12345",
        route: "Coimbatore ➝ Bengaluru",
        type: "Local Train",
      },
      trainLogo: trainLogo,
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

.blink-border {
  border: 4px solid rgb(170, 13, 13);
  border-radius: 20px;
  padding: 16px;
  margin: 20px;
  background-color: #fff;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    box-shadow: 0 0 10px red, 0 0 20px red;
    border-color: red;
  }
  50% {
    box-shadow: none;
    border-color: transparent;
  }
}
@keyframes blink-glow {
  0% {
    box-shadow: 0 0 10px 2px #d71010;
  }
  50% {
    box-shadow: 0 0 20px 6px #c60e0e;
  }
  100% {
    box-shadow: 0 0 10px 2px #bd0d0d;
  }
}

.blinking-container {
  animation: blink-glow 1s infinite;
}
</style>
