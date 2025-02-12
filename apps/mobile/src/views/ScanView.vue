<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { useScanStore } from '../stores/scan.store'
import { faCameraAlt, faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const { pickPhotoHandler, resetPhoto, anaylsePhotoHandler, imagePath, nutritionData } =
  useScanStore()
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="content-wrapper h-full flex flex-col items-center justify-center">
        <div class="w-full h-full flex flex-col justify-center items-center gap-4">
          <div class="flex flex-col w-full h-full justify-center items-center">
            <div
              @click="pickPhotoHandler"
              class="bg-primary-shade relative w-full h-full flex justify-center items-center z-[1]"
            >
              <FontAwesomeIcon
                :icon="faCameraAlt"
                class="text-[15rem] absolute z-[1] text-white/30 left-1 rotate-12"
              ></FontAwesomeIcon>
              <div class="flex flex-col items-center justify-center gap-2 z-[2]">
                <FontAwesomeIcon :icon="faCameraAlt" class="text-5xl text-white"></FontAwesomeIcon>
                <p class="text-white font-bold text-sm">Take an instant photo.</p>
              </div>
            </div>
            <div
              @click="pickPhotoHandler"
              class="bg-tertiary relative w-full h-full flex justify-center items-center z[1]"
            >
              <FontAwesomeIcon
                :icon="faImages"
                class="text-[15rem] absolute z-[1] text-white/30 right-1 -rotate-12"
              ></FontAwesomeIcon>
              <div class="flex flex-col items-center justify-center gap-2 z-[2]">
                <FontAwesomeIcon :icon="faImages" class="text-5xl text-white"></FontAwesomeIcon>
                <p class="text-white font-bold text-sm">Grab a photo from the gallery.</p>
              </div>
            </div>
          </div>
          <ion-button v-if="imagePath" :onclick="anaylsePhotoHandler"> Analyse Food </ion-button>
        </div>
        <div v-if="nutritionData" class="mt-4 w-full px-8">
          <ion-card
            v-if="nutritionData"
            :class="{
              'border-2 border-green-500': 'name' in nutritionData,
              'border-2 border-yellow-500': 'estimated_name' in nutritionData,
            }"
          >
            <ion-card-header>
              <ion-card-title>Nutrition Facts</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-grid>
                <ion-row v-if="'name' in nutritionData">
                  <ion-col>Name</ion-col>
                  <ion-col>{{ nutritionData.name }}</ion-col>
                </ion-row>
                <ion-row v-if="'estimated_name' in nutritionData">
                  <ion-col>Estimated Name</ion-col>
                  <ion-col>{{ nutritionData.estimated_name }}</ion-col>
                </ion-row>
                <ion-row v-if="'type_of_food' in nutritionData">
                  <ion-col>Type of Food</ion-col>
                  <ion-col>{{ nutritionData.type_of_food }}</ion-col>
                </ion-row>
                <ion-row v-if="'estimated_typeOfFood' in nutritionData">
                  <ion-col>Estimated Type of Food</ion-col>
                  <ion-col>{{ nutritionData.estimated_typeOfFood }}</ion-col>
                </ion-row>
                <ion-row v-if="'proteins' in nutritionData">
                  <ion-col>Proteins</ion-col>
                  <ion-col>{{ nutritionData.proteins }} g</ion-col>
                </ion-row>
                <ion-row v-if="'carbs' in nutritionData">
                  <ion-col>Carbohydrates</ion-col>
                  <ion-col>{{ nutritionData.carbs }} g</ion-col>
                </ion-row>
                <ion-row v-if="'fats' in nutritionData">
                  <ion-col>Fats</ion-col>
                  <ion-col>{{ nutritionData.fats }} g</ion-col>
                </ion-row>
                <ion-row v-if="'vitamins' in nutritionData">
                  <ion-col>Vitamins</ion-col>
                  <ion-col>
                    <ul>
                      <li v-for="(vitamin, index) in nutritionData.vitamins" :key="index">
                        {{ vitamin.vitamin_name }}: {{ vitamin.vitamin_portion }}
                      </li>
                    </ul>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-page {
  color: black;
}
</style>
