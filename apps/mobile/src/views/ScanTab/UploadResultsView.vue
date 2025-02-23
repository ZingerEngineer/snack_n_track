<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from '@ionic/vue'
import { useScanStore } from '../../stores/scan.store'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '../../stores/loading.store'
import formatNutritionString from './util/uploadResults'
import { faCircleCheck, faSadTear } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faArrowRotateBack } from '@fortawesome/free-solid-svg-icons'
const router = useRouter()
const scanStore = useScanStore()
const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading)

const routeToDashBoard = () => {
  scanStore.reset()
  router.push('/dashboard/home')
}
const routeToUploadPhoto = () => {
  scanStore.reset()
  router.push('/scan/upload')
}

const nutritionData = computed(() => scanStore.nutritionData)

watch(nutritionData, (newValue) => {
  if (newValue) {
    scanStore.setNutritionData(newValue)
  }
})
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="mt-[17rem] w-full h-full flex justify-center items-center">
        <div
          v-if="nutritionData && !isLoading"
          class="w-full px-8 flex justify-center items-center flex-col gap-6"
        >
          <img
            v-if="scanStore.imagePath"
            :src="scanStore.imagePath ? scanStore.imagePath : ''"
            class="w-1/2 h-1/2 rounded-lg shadow-lg border-2 border-primary mt-4"
          />
          <div class="flex flex-col gap-6 w-full justify-center">
            <ion-card
              v-if="'name' in nutritionData"
              class="relative p-2 w-full border-2 to-primary from-primary/50 bg-gradient-to-l border-primary rounded-2xl shadow-lg"
            >
              <div
                class="absolute top-2 right-2 flex flex-row items-center justify-center rounded-lg bg-white p-2 gap-2"
              >
                <p class="text-primary text-xs">Approved</p>
                <FontAwesomeIcon
                  class="text-primary text-lg"
                  :icon="faCircleCheck"
                ></FontAwesomeIcon>
              </div>
              <ion-card-header>
                <ion-card-title class="text-white">Nutrition Facts</ion-card-title>
              </ion-card-header>
              <ion-card-content class="text-xs text-white">
                <ion-grid>
                  <ion-row>
                    <ion-col>Name</ion-col>
                    <ion-col>{{ nutritionData.name }}</ion-col>
                  </ion-row>
                  <ion-row v-if="'type_of_food' in nutritionData">
                    <ion-col>Type of Food</ion-col>
                    <ion-col>{{ nutritionData.type_of_food }}</ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>

            <ion-card
              v-if="'estimated_name' in nutritionData"
              class="p-2 w-full border-2 to-yellow-500 from-yellow-300/50 bg-gradient-to-l border-yellow-500 rounded-2xl shadow-lg"
            >
              <ion-card-header>
                <ion-card-title>Estimated Nutrition Facts</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-grid>
                  <ion-row>
                    <ion-col>Estimated Name</ion-col>
                    <ion-col>{{ nutritionData.estimated_name }}</ion-col>
                  </ion-row>
                  <ion-row v-if="'estimated_typeOfFood' in nutritionData">
                    <ion-col>Estimated Type of Food</ion-col>
                    <ion-col>{{ nutritionData.estimated_typeOfFood }}</ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
            <div class="flex flex-row gap-6 justify-center">
              <ion-card
                class="p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg flex-grow"
              >
                <ion-card-header>
                  <ion-card-title class="text-lg">Macronutrients</ion-card-title>
                </ion-card-header>
                <ion-card-content class="text-xs">
                  <ion-grid>
                    <ion-row v-if="'proteins' in nutritionData">
                      <ion-col>Proteins</ion-col>
                      <ion-col>{{ formatNutritionString(nutritionData.proteins) }}</ion-col>
                    </ion-row>
                    <ion-row v-if="'carbs' in nutritionData">
                      <ion-col>Carbs</ion-col>
                      <ion-col>{{ formatNutritionString(nutritionData.carbs) }}</ion-col>
                    </ion-row>
                    <ion-row v-if="'fats' in nutritionData">
                      <ion-col>Fats</ion-col>
                      <ion-col>{{ formatNutritionString(nutritionData.fats) }}</ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-card-content>
              </ion-card>
            </div>
            <ion-card
              v-if="'vitamins' in nutritionData"
              class="p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg flex-grow"
            >
              <ion-card-header>
                <ion-card-title class="text-lg">Vitamins</ion-card-title>
              </ion-card-header>
              <ion-card-content class="text-xs">
                <ion-grid>
                  <ion-row v-for="(vitamin, index) in nutritionData.vitamins" :key="index">
                    <ion-col>{{ vitamin.vitamin_name }}</ion-col>
                    <ion-col>{{ formatNutritionString(vitamin.vitamin_portion) }}</ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
          </div>
          <div class="flex justify-center mt-4 mb-10 gap-2">
            <ion-button @click="routeToDashBoard" routerLink="/dashboard" color="primary">
              <FontAwesomeIcon class="mr-2 text-lg" :icon="faArrowLeft"></FontAwesomeIcon>
              Go to Dashboard</ion-button
            >
            <ion-button @click="routeToUploadPhoto" routerLink="/dashboard/scan" color="primary">
              <FontAwesomeIcon class="mr-2 text-lg" :icon="faArrowRotateBack"></FontAwesomeIcon>
              Scan Again</ion-button
            >
          </div>
        </div>
        <div v-else class="mt-4 w-full px-8">
          <ion-card
            class="p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg"
          >
            <ion-card-header>
              <ion-card-title
                >No Results
                <FontAwesomeIcon :icon="faSadTear"></FontAwesomeIcon>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>No nutrition data available. Please try scanning again.</p>
            </ion-card-content>
          </ion-card>
          <div class="flex flex-row items-center justify-center gap-4">
            <div class="flex justify-center mt-4">
              <ion-button @click="routeToDashBoard" color="primary"
                ><FontAwesomeIcon class="mr-2" :icon="faArrowLeft"></FontAwesomeIcon> Go to
                Dashboard</ion-button
              >
            </div>
            <div class="flex justify-center mt-4">
              <ion-button @click="routeToUploadPhoto" color="primary">
                <FontAwesomeIcon :icon="faArrowRotateBack" class="mr-2"></FontAwesomeIcon>
                Scan again</ion-button
              >
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-page {
  color: black;
}
ion-row,
ion-col,
li {
  font-weight: bold;
}
ion-card-title {
  font-weight: bold;
}
ion-button {
  font-size: 0.7rem;
}

.top-bar-gaurd {
  margin-top: calc(var(--safe-area-inset-top) + 130px);
}
</style>
