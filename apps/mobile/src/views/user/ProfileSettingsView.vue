<template>
  <IonPage>
    <IonContent>
      class="w-full h-full flex justify-center items-center">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>User Profile Settings</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput type="text" placeholder="Enter your username"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput type="email" placeholder="Enter your email"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" placeholder="Enter your password"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput type="password" placeholder="Confirm your password"></IonInput>
            </IonItem>
          </IonList>
          <IonButton expand="full" class="ion-margin-top">Save Changes</IonButton>
        </IonCardContent>
      </IonCard>
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
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/vue'
</script>

<style></style>
