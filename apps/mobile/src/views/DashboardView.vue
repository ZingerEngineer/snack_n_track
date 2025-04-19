<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom" class="border-t-4 border-primary">
        <IonTabButton tab="home" href="/dashboard/home">
          <FontAwesomeIcon class="text-xl" :icon="faHome" />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Scan" href="/dashboard/scan">
          <FontAwesomeIcon class="text-xl" :icon="faWandMagicSparkles" />
          <IonLabel>Scan</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
</script>
