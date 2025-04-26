<template>
  <IonPage>
    <IonMenu content-id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonSegmentButton @click="routeToProfileSettings">Profile</IonSegmentButton>
        <IonSegmentButton @click="handleLogout">Logout</IonSegmentButton>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenu-button></IonMenu-button>
          </IonButtons>
          <IonTitle>Settings</IonTitle>
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
const router = useRouter()
const authStore = useAuthStore()

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
