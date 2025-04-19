<template>
  <IonPage>
    <IonContent ontent>
      <div v-if="scannedFood && scannedFood.length">
        <IonCard v-for="data in scannedFood" :key="data.id">
          <IonCardHeader>
            <!-- <IonCard-title>{{ data.name? data.name : data.estimated_name }}</IonCard-title> -->
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>ID</IonCol>
                <IonCol>{{ data.id }}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Percentage of Certainty</IonCol>
                <IonCol>{{ data.percentage_of_certainty }}%</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Is Sure</IonCol>
                <IonCol>{{ data.isSure ? 'Yes' : 'No' }}</IonCol>
              </IonRow>
              <IonRow v-if="'name' in data">
                <IonCol>Name</IonCol>
                <IonCol>{{ data.name }}</IonCol>
              </IonRow>
              <IonRow v-if="'estimated_name' in data">
                <IonCol>Estimated Name</IonCol>
                <IonCol>{{ data.estimated_name }}</IonCol>
              </IonRow>
              <IonRow v-if="'type_of_food' in data">
                <IonCol>Type of Food</IonCol>
                <IonCol>{{ data.type_of_food }}</IonCol>
              </IonRow>
              <IonRow v-if="'estimated_typeOfFood' in data">
                <IonCol>Estimated Type of Food</IonCol>
                <IonCol>{{ data.estimated_typeOfFood }}</IonCol>
              </IonRow>
              <IonRow v-if="'proteins' in data">
                <IonCol>Proteins</IonCol>
                <IonCol>{{ data.proteins }} g</IonCol>
              </IonRow>
              <IonRow v-if="'carbs' in data">
                <IonCol>Carbohydrates</IonCol>
                <IonCol>{{ data.carbs }} g</IonCol>
              </IonRow>
              <IonRow v-if="'fats' in data">
                <IonCol>Fats</IonCol>
                <IonCol>{{ data.fats }} g</IonCol>
              </IonRow>
              <IonRow v-if="'vitamins' in data">
                <IonCol>Vitamins</IonCol>
                <IonCol>
                  <ul>
                    <li v-for="(vitamin, index) in data.vitamins" :key="index">
                      {{ vitamin.vitamin_name }}: {{ vitamin.vitamin_portion }}
                    </li>
                  </ul>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </div>

      <div v-if="!scannedFood" class="w-full h-full flex justify-center items-center">
        <p class="text-xl">Empty history.</p>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue'
import { ref } from 'vue'
import type { INutritionData, IEstimatedNutritionData } from '../types/meal/meal.types'

const scannedFood = ref<null | INutritionData[] | IEstimatedNutritionData[]>(null)
</script>
