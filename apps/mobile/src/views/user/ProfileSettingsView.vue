<template>
  <ion-page>
    <ion-content class="w-full h-full flex justify-center items-center">
      <ion-card>
        <ion-card-header>
          <ion-card-title>User Profile Settings</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label position="floating">Username</ion-label>
              <ion-input type="text" placeholder="Enter your username"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input type="email" placeholder="Enter your email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" placeholder="Enter your password"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Confirm Password</ion-label>
              <ion-input type="password" placeholder="Confirm your password"></ion-input>
            </ion-item>
          </ion-list>
          <ion-button expand="full" class="ion-margin-top">Save Changes</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/vue'
</script>

<style></style>
