<template>
  <IonPage>
    <IonMenu content-id="main-content">
      <IonHeader>
        <IonToolbar class="border-b-4 px-4 tool-bar-notch-gaurd border-primary">
          <IonTitle slot="start"></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonSegmentButton @click="routeToProfileSettings">Profile</IonSegmentButton>
        <IonSegmentButton @click="handleLogout">Logout</IonSegmentButton>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar class="border-b-4 px-4 tool-bar-notch-gaurd border-primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButton slot="secondary" @click="handleRouteHome" fill="clear">
            <FontAwesomeIcon :icon="faHome" /> Home
          </IonButton>
          <IonTitle slot="start">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonRouterOutlet></IonRouterOutlet>
    </IonPage>
  </IonPage>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/user/auth/auth.store'
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegmentButton,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRouterOutlet,
} from '@ionic/vue'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const router = useRouter()
const authStore = useAuthStore()

const handleRouteHome = () => {
  router.push('/dashboard/home')
}

const handleLogout = async () => {
  try {
    await authStore.logout()
  } catch {
    return
  }
}

const routeToProfileSettings = () => {
  router.push('/user/settings/profile')
}
</script>
