<template>
  <div id="title" class="px-10 w-full flex flex-col justify-center items-center">
    <h1 class="w-full text-3xl font-bold">Let's get started!</h1>
    <h1 class="w-full font-bold">Tell us more about yourself:</h1>
  </div>

  <div class="px-5 w-full flex-grow">
    <img src="../../assets/age.svg" alt="age" class="w-32" />
    <div
      class="px-10 py-2 w-full border-2 my-4 rounded-2xl shadow-lg flex flex-col justify-center items-center"
    >
      <div class="w-full flex flex-col justify-between items-center">
        <ion-label class="font-semibold w-full mt-2">Age:</ion-label>
        <div class="w-full">
          <ion-range
            aria-label="Range with ticks"
            :pin="true"
            :pin-formatter="pinFormatter"
            :ticks="true"
            :snaps="true"
            :min="10"
            :max="100"
          ></ion-range>
        </div>
      </div>
    </div>
    <div class="w-full text-[7rem] flex justify-center items-center">{{ age }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IonLabel, IonRange } from '@ionic/vue'
const age = ref(10)

const pinFormatter = (value: number) => {
  age.value = value
  return `${value}`
}
</script>
