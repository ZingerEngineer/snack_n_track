<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="history" href="/dashboard/history">
          <ion-icon :icon="bookmark" />
          <ion-label>History</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="home" href="/dashboard/home">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Scan" href="/dashboard/scan">
          <ion-icon :icon="sparkles" />
          <ion-label>Scan</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from '@ionic/vue'

import { sparkles, bookmark, home } from 'ionicons/icons'
</script>

<style>
ion-tab-bar {
  --background: var(--ion-color-tertiary);
}
</style>
