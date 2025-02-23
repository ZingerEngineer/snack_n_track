<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="border-t-4 border-primary">
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
import { faHome, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
</script>
