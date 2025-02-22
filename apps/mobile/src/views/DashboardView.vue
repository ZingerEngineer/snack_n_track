<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="history" href="/dashboard/history">
          <FontAwesomeIcon class="text-xl" :icon="faHistory" />
          <ion-label>History</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="home" href="/dashboard/home">
          <FontAwesomeIcon class="text-xl" :icon="faHome" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Scan" href="/dashboard/scan">
          <FontAwesomeIcon class="text-xl" :icon="faWandMagicSparkles" />
          <ion-label>Scan</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faHistory, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
</script>

<style></style>
