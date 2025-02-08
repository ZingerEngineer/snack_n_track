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
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { INutritionData, IEstimatedNutritionData } from '../types/global.types'

const scannedFood = ref<null | INutritionData[] | IEstimatedNutritionData[]>(null)
</script>

<template>
  <ion-page>
    <ion-content>
      <div v-if="scannedFood && scannedFood.length">
        <ion-card v-for="data in scannedFood" :key="data.id">
          <ion-card-header>
            <ion-card-title>{{ data.name || data.estimated_name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-grid>
              <ion-row>
                <ion-col>ID</ion-col>
                <ion-col>{{ data.id }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Percentage of Certainty</ion-col>
                <ion-col>{{ data.percentage_of_certainty }}%</ion-col>
              </ion-row>
              <ion-row>
                <ion-col>Is Sure</ion-col>
                <ion-col>{{ data.isSure ? 'Yes' : 'No' }}</ion-col>
              </ion-row>
              <ion-row v-if="'name' in data">
                <ion-col>Name</ion-col>
                <ion-col>{{ data.name }}</ion-col>
              </ion-row>
              <ion-row v-if="'estimated_name' in data">
                <ion-col>Estimated Name</ion-col>
                <ion-col>{{ data.estimated_name }}</ion-col>
              </ion-row>
              <ion-row v-if="'type_of_food' in data">
                <ion-col>Type of Food</ion-col>
                <ion-col>{{ data.type_of_food }}</ion-col>
              </ion-row>
              <ion-row v-if="'estimated_typeOfFood' in data">
                <ion-col>Estimated Type of Food</ion-col>
                <ion-col>{{ data.estimated_typeOfFood }}</ion-col>
              </ion-row>
              <ion-row v-if="'proteins' in data">
                <ion-col>Proteins</ion-col>
                <ion-col>{{ data.proteins }} g</ion-col>
              </ion-row>
              <ion-row v-if="'carbs' in data">
                <ion-col>Carbohydrates</ion-col>
                <ion-col>{{ data.carbs }} g</ion-col>
              </ion-row>
              <ion-row v-if="'fats' in data">
                <ion-col>Fats</ion-col>
                <ion-col>{{ data.fats }} g</ion-col>
              </ion-row>
              <ion-row v-if="'vitamins' in data">
                <ion-col>Vitamins</ion-col>
                <ion-col>
                  <ul>
                    <li v-for="(vitamin, index) in data.vitamins" :key="index">
                      {{ vitamin.vitamin_name }}: {{ vitamin.vitamin_portion }}
                    </li>
                  </ul>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-card>
      </div>

      <div v-if="!scannedFood" class="w-full h-full flex justify-center items-center">
        <p class="text-xl">Empty history.</p>
      </div>
    </ion-content>
  </ion-page>
</template>
