<template>
  <ion-page>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-segment-button @click="routeToProfileSettings">Profile</ion-segment-button>
        <ion-segment-button @click="handleLogout">Logout</ion-segment-button>
      </ion-content>
    </ion-menu>
    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-router-outlet></ion-router-outlet>
    </ion-page>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.store'
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
import ToastService from '../../services/ToastService'
const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  try {
    authStore.logout()
    router.push('/login')
    ToastService.success('Logged out successfully')
  } catch (error) {
    ToastService.error('Error logging out')
    return
  }
}

const routeToProfileSettings = () => {
  router.push('/user/settings/profile')
}
</script>
