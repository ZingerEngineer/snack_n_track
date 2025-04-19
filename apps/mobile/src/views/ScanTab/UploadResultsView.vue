<template>
  <IonPage>
    <IonContent>
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
            <IonCard
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
              <IonCardHeader>
                <IonCardTitle class="text-white">Nutrition Facts</IonCardTitle>
              </IonCardHeader>
              <IonCardContent class="text-xs text-white">
                <IonGrid>
                  <IonRow>
                    <IonCol>Name</IonCol>
                    <IonCol>{{ nutritionData.name }}</IonCol>
                  </IonRow>
                  <IonRow v-if="'type_of_food' in nutritionData">
                    <IonCol>Type of Food</IonCol>
                    <IonCol>{{ nutritionData.type_of_food }}</IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>

            <IonCard
              v-if="'estimated_name' in nutritionData"
              class="p-2 w-full border-2 to-yellow-500 from-yellow-300/50 bg-gradient-to-l border-yellow-500 rounded-2xl shadow-lg"
            >
              <IonCardHeader>
                <IonCardTitle>Estimated Nutrition Facts</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol>Estimated Name</IonCol>
                    <IonCol>{{ nutritionData.estimated_name }}</IonCol>
                  </IonRow>
                  <IonRow v-if="'estimated_typeOfFood' in nutritionData">
                    <IonCol>Estimated Type of Food</IonCol>
                    <IonCol>{{ nutritionData.estimated_typeOfFood }}</IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
            <div class="flex flex-row gap-6 justify-center">
              <IonCard
                class="p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg flex-grow"
              >
                <IonCardHeader>
                  <IonCardTitle class="text-lg">Macronutrients</IonCardTitle>
                </IonCardHeader>
                <IonCardContent class="text-xs">
                  <IonGrid>
                    <IonRow v-if="'proteins' in nutritionData">
                      <IonCol>Proteins</IonCol>
                      <IonCol>{{ formatNutritionString(nutritionData.proteins) }}</IonCol>
                    </IonRow>
                    <IonRow v-if="'carbs' in nutritionData">
                      <IonCol>Carbs</IonCol>
                      <IonCol>{{ formatNutritionString(nutritionData.carbs) }}</IonCol>
                    </IonRow>
                    <IonRow v-if="'fats' in nutritionData">
                      <IonCol>Fats</IonCol>
                      <IonCol>{{ formatNutritionString(nutritionData.fats) }}</IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </div>
            <IonCard
              v-if="'vitamins' in nutritionData"
              class="p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg flex-grow"
            >
              <IonCardHeader>
                <IonCardTitle class="text-lg">Vitamins</IonCardTitle>
              </IonCardHeader>
              <IonCardContent class="text-xs">
                <IonGrid>
                  <IonRow v-for="(vitamin, index) in nutritionData.vitamins" :key="index">
                    <IonCol>{{ vitamin.vitamin_name }}</IonCol>
                    <IonCol>{{ formatNutritionString(vitamin.vitamin_portion) }}</IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </div>
          <div class="flex justify-center mt-4 mb-10 gap-2">
            <IonButton @click="routeToDashBoard" routerLink="/dashboard" color="primary">
              <FontAwesomeIcon class="mr-2 text-lg" :icon="faArrowLeft"></FontAwesomeIcon>
              Go to Dashboard</IonButton
            >
            <IonButton @click="routeToUploadPhoto" routerLink="/dashboard/scan" color="primary">
              <FontAwesomeIcon class="mr-2 text-lg" :icon="faArrowRotateBack"></FontAwesomeIcon>
              Scan Again</IonButton
            >
          </div>
        </div>
        <div v-else class="mt-4 w-full px-8">
          <IonCard
            class="p-2 border-2 to-light from-medium bg-gradient-to-l border-medium-shade rounded-2xl shadow-lg"
          >
            <IonCardHeader>
              <IonCardTitle
                >No Results
                <FontAwesomeIcon :icon="faSadTear"></FontAwesomeIcon>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>No nutrition data available. Please try scanning again.</p>
            </IonCardContent>
          </IonCard>
          <div class="flex flex-row items-center justify-center gap-4">
            <div class="flex justify-center mt-4">
              <IonButton @click="routeToDashBoard" color="primary"
                ><FontAwesomeIcon class="mr-2" :icon="faArrowLeft"></FontAwesomeIcon> Go to
                Dashboard</IonButton
              >
            </div>
            <div class="flex justify-center mt-4">
              <IonButton @click="routeToUploadPhoto" color="primary">
                <FontAwesomeIcon :icon="faArrowRotateBack" class="mr-2"></FontAwesomeIcon>
                Scan again</IonButton
              >
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

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

<style scoped>
IonPage {
  color: black;
}
IonRow,
IonCol,
li {
  font-weight: bold;
}
IonCardTitle {
  font-weight: bold;
}
IonButton {
  font-size: 0.7rem;
}

.top-bar-gaurd {
  margin-top: calc(var(--safe-area-inset-top) + 130px);
}
</style>
