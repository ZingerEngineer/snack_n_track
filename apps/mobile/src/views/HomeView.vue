<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { useAuthStore } from '../stores/auth.store'
import { logOutOutline } from 'ionicons/icons'
import ToastService from '../services/ToastService'
import { useRouter } from 'vue-router'

const router = useRouter()
const { logout, user } = useAuthStore()

const handleLogout = async () => {
  try {
    await logout()
    ToastService.success('Logged out successfully')
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
    ToastService.error('Logout failed')
  }
}
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="w-full h-full">
        <ion-card class="p-2">
          <ion-card-header>
            <ion-card-title>Welcome home.</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="w-full h-full flex flex-row justify-between items-center">
              <div>
                <ion-icon
                  @click="handleLogout"
                  class="text-emerald-400 rounded-xl p-2 text-[3rem]"
                  :icon="logOutOutline"
                />
              </div>
              <div
                class="flex flex-row items-center justify-center bg-emerald-400 px-5 py-2 rounded-full text-white border-emerald-300 border-2 gap-2"
              >
                <p class="">
                  {{ user?.email }}
                </p>
                <img
                  class="w-12 bg-cover bg-center rounded-full"
                  src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid"
                  alt="Random"
                />
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-page {
  color: black;
}
</style>
