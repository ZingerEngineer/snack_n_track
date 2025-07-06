<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings & Preferences</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Error Display -->
      <ion-card v-if="error" color="danger">
        <ion-card-content>
          <ion-label color="light">
            <h3>Error</h3>
            <p>{{ error }}</p>
          </ion-label>
        </ion-card-content>
      </ion-card>

      <!-- Loading Indicator -->
      <ion-card v-if="isLoading" color="primary">
        <ion-card-content>
          <ion-label color="light">
            <h3>{{ currentMessage || 'Loading...' }}</h3>
          </ion-label>
        </ion-card-content>
      </ion-card>

      <!-- Profile Section -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Profile Information</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- Profile Image -->
          <div class="profile-image-container">
            <div class="profile-image" @click="selectImage">
              <img v-if="userProfile.profileImage" :src="userProfile.profileImage" alt="Profile" />
              <ion-icon v-else :icon="personCircleOutline" size="large"></ion-icon>
            </div>
            <ion-button fill="clear" @click="selectImage">
              <ion-icon :icon="cameraOutline" slot="start"></ion-icon>
              Change Photo
            </ion-button>
          </div>

          <!-- Email -->
          <ion-item>
            <ion-label position="stacked">Email</ion-label>
            <ion-input
              v-model="userProfile.email"
              type="email"
              :readonly="!editMode.profile"
              placeholder="Enter your email"
            ></ion-input>
          </ion-item>

          <!-- Name -->
          <ion-item>
            <ion-label position="stacked">Name</ion-label>
            <ion-input
              v-model="userProfile.name"
              type="text"
              :readonly="!editMode.profile"
              placeholder="Enter your name"
            ></ion-input>
          </ion-item>

          <!-- Password -->
          <ion-item>
            <ion-label position="stacked">Password</ion-label>
            <ion-input
              v-model="userProfile.password"
              type="password"
              :readonly="!editMode.profile"
              placeholder="Enter new password"
            ></ion-input>
          </ion-item>

          <div class="edit-buttons">
            <ion-button v-if="!editMode.profile" fill="outline" @click="toggleEdit('profile')">
              <ion-icon :icon="createOutline" slot="start"></ion-icon>
              Edit Profile
            </ion-button>
            <div v-else class="button-group">
              <ion-button color="success" @click="saveProfileWithLoading" :disabled="isLoading">
                <ion-icon :icon="checkmarkOutline" slot="start"></ion-icon>
                Save
              </ion-button>
              <ion-button
                fill="outline"
                color="medium"
                @click="cancelEdit('profile')"
                :disabled="isLoading"
              >
                <ion-icon :icon="closeOutline" slot="start"></ion-icon>
                Cancel
              </ion-button>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Health Information Section -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Health Information</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- Height -->
          <ion-item>
            <ion-label position="stacked">Height</ion-label>
            <ion-input
              v-model="healthInfo.height"
              type="number"
              :readonly="!editMode.health"
              placeholder="Enter height in cm"
            >
              <div slot="end">cm</div>
            </ion-input>
          </ion-item>

          <!-- Weight -->
          <ion-item>
            <ion-label position="stacked">Weight</ion-label>
            <ion-input
              v-model="healthInfo.weight"
              type="number"
              :readonly="!editMode.health"
              placeholder="Enter weight in kg"
            >
              <div slot="end">kg</div>
            </ion-input>
          </ion-item>

          <!-- Age -->
          <ion-item>
            <ion-label position="stacked">Age</ion-label>
            <ion-input
              v-model="healthInfo.age"
              type="number"
              :readonly="!editMode.health"
              placeholder="Enter your age"
            ></ion-input>
          </ion-item>

          <!-- Activity Level -->
          <ion-item>
            <ion-label position="stacked">Activity Level</ion-label>
            <ion-select
              v-model="healthInfo.activityLevel"
              :disabled="!editMode.health"
              placeholder="Select activity level"
            >
              <ion-select-option
                v-for="option in activityLevelOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <!-- BMI Display -->
          <ion-item v-if="BMI">
            <ion-label>
              <h3>BMI: {{ BMI }}</h3>
              <p>{{ getBMICategory(BMI) }}</p>
            </ion-label>
          </ion-item>

          <div class="edit-buttons">
            <ion-button v-if="!editMode.health" fill="outline" @click="toggleEdit('health')">
              <ion-icon :icon="createOutline" slot="start"></ion-icon>
              Edit Health Info
            </ion-button>
            <div v-else class="button-group">
              <ion-button color="success" @click="saveHealthInfoWithLoading" :disabled="isLoading">
                <ion-icon :icon="checkmarkOutline" slot="start"></ion-icon>
                Save
              </ion-button>
              <ion-button
                fill="outline"
                color="medium"
                @click="cancelEdit('health')"
                :disabled="isLoading"
              >
                <ion-icon :icon="closeOutline" slot="start"></ion-icon>
                Cancel
              </ion-button>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Health Conditions Section -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Health Conditions</ion-card-title>
          <ion-card-subtitle
            >Manage your health conditions for better meal recommendations</ion-card-subtitle
          >
        </ion-card-header>
        <ion-card-content>
          <!-- Existing Conditions -->
          <div v-if="healthConditions.length > 0" class="conditions-list">
            <ion-chip
              v-for="(condition, index) in healthConditions"
              :key="index"
              color="primary"
              outline
            >
              <ion-label>{{ condition }}</ion-label>
              <ion-icon
                v-if="editMode.conditions"
                :icon="closeCircleOutline"
                @click="removeConditionByIndex(index)"
              ></ion-icon>
            </ion-chip>
          </div>

          <!-- Add New Condition -->
          <div v-if="editMode.conditions" class="add-condition">
            <ion-item>
              <ion-label position="stacked">Add Health Condition</ion-label>
              <ion-input
                v-model="newCondition"
                placeholder="Enter health condition"
                @keyup.enter="addConditionFromInput"
              ></ion-input>
            </ion-item>
            <ion-button
              fill="clear"
              @click="addConditionFromInput"
              :disabled="!newCondition.trim()"
            >
              <ion-icon :icon="addOutline" slot="start"></ion-icon>
              Add Condition
            </ion-button>
          </div>

          <!-- Common Conditions Quick Add -->
          <div v-if="editMode.conditions" class="common-conditions">
            <ion-label>Common Conditions:</ion-label>
            <div class="condition-buttons">
              <ion-button
                v-for="condition in commonConditions"
                :key="condition.name"
                size="small"
                fill="outline"
                @click="addCommonConditionFromList(condition.name)"
                :disabled="healthConditions.includes(condition.name)"
              >
                {{ condition.name }}
              </ion-button>
            </div>
          </div>

          <div class="edit-buttons">
            <ion-button
              v-if="!editMode.conditions"
              fill="outline"
              @click="toggleEdit('conditions')"
            >
              <ion-icon :icon="createOutline" slot="start"></ion-icon>
              Edit Conditions
            </ion-button>
            <div v-else class="button-group">
              <ion-button color="success" @click="saveConditionsWithLoading" :disabled="isLoading">
                <ion-icon :icon="checkmarkOutline" slot="start"></ion-icon>
                Save
              </ion-button>
              <ion-button
                fill="outline"
                color="medium"
                @click="cancelEdit('conditions')"
                :disabled="isLoading"
              >
                <ion-icon :icon="closeOutline" slot="start"></ion-icon>
                Cancel
              </ion-button>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Dietary Preferences Section -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Dietary Preferences</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-checkbox
              v-model="dietaryPrefs.vegetarian"
              :disabled="!editMode.dietary"
            ></ion-checkbox>
            <ion-label class="ion-margin-start">Vegetarian</ion-label>
          </ion-item>

          <ion-item>
            <ion-checkbox v-model="dietaryPrefs.vegan" :disabled="!editMode.dietary"></ion-checkbox>
            <ion-label class="ion-margin-start">Vegan</ion-label>
          </ion-item>

          <ion-item>
            <ion-checkbox
              v-model="dietaryPrefs.glutenFree"
              :disabled="!editMode.dietary"
            ></ion-checkbox>
            <ion-label class="ion-margin-start">Gluten-Free</ion-label>
          </ion-item>

          <ion-item>
            <ion-checkbox
              v-model="dietaryPrefs.dairyFree"
              :disabled="!editMode.dietary"
            ></ion-checkbox>
            <ion-label class="ion-margin-start">Dairy-Free</ion-label>
          </ion-item>

          <ion-item>
            <ion-checkbox
              v-model="dietaryPrefs.lowSodium"
              :disabled="!editMode.dietary"
            ></ion-checkbox>
            <ion-label class="ion-margin-start">Low Sodium</ion-label>
          </ion-item>

          <div class="edit-buttons">
            <ion-button v-if="!editMode.dietary" fill="outline" @click="toggleEdit('dietary')">
              <ion-icon :icon="createOutline" slot="start"></ion-icon>
              Edit Preferences
            </ion-button>
            <div v-else class="button-group">
              <ion-button
                color="success"
                @click="saveDietaryPrefsWithLoading"
                :disabled="isLoading"
              >
                <ion-icon :icon="checkmarkOutline" slot="start"></ion-icon>
                Save
              </ion-button>
              <ion-button
                fill="outline"
                color="medium"
                @click="cancelEdit('dietary')"
                :disabled="isLoading"
              >
                <ion-icon :icon="closeOutline" slot="start"></ion-icon>
                Cancel
              </ion-button>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Notification Settings -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Notifications</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>Meal Reminders</ion-label>
            <ion-toggle
              v-model="notifications.mealReminders"
              @ionChange="onNotificationChange"
              slot="end"
            ></ion-toggle>
          </ion-item>

          <ion-item>
            <ion-label>Health Tips</ion-label>
            <ion-toggle
              v-model="notifications.healthTips"
              @ionChange="onNotificationChange"
              slot="end"
            ></ion-toggle>
          </ion-item>

          <ion-item>
            <ion-label>Weekly Reports</ion-label>
            <ion-toggle
              v-model="notifications.weeklyReports"
              @ionChange="onNotificationChange"
              slot="end"
            ></ion-toggle>
          </ion-item>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonChip,
  IonCheckbox,
  IonToggle,
  toastController,
} from '@ionic/vue'
import {
  personCircleOutline,
  cameraOutline,
  createOutline,
  checkmarkOutline,
  closeOutline,
  closeCircleOutline,
  addOutline,
} from 'ionicons/icons'
import { useProfileSettingsStore } from '../../stores/user/profileSettings.store'
import { useLoadingStore } from '../../stores/components/loading.store'

// Types for better type safety
type ToastColor = 'success' | 'warning' | 'danger'

// Activity level options
interface ActivityLevelOption {
  value: string
  label: string
}

// Common health conditions interface
interface CommonCondition {
  name: string
  category?: string
}

// Stores
const profileStore = useProfileSettingsStore()
const loadingStore = useLoadingStore()

// Destructure reactive properties from profile store
const {
  userProfile,
  healthInfo,
  healthConditions,
  dietaryPrefs,
  notifications,
  editMode,
  BMI,
  error,
} = storeToRefs(profileStore)

// Use centralized loading store instead of duplicate loading state
const { isLoading, currentMessage } = storeToRefs(loadingStore)

// Expose store methods
const { toggleEdit, cancelEdit } = profileStore

// Enhanced save methods with loading states and error handling
const saveProfileWithLoading = async (): Promise<void> => {
  try {
    // Basic validation
    if (!userProfile.value.email || !userProfile.value.name) {
      await showToast('Please fill in all required fields', 'warning')
      return
    }

    loadingStore.startLoading('Saving profile...')
    await profileStore.saveProfile()
    await showToast('Profile updated successfully!')

    // Exit edit mode after successful save
    profileStore.cancelEdit('profile')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Failed to save profile:', error)
    await showToast(`Failed to update profile: ${errorMessage}`, 'danger')
  } finally {
    loadingStore.stopLoading()
  }
}

const saveHealthInfoWithLoading = async (): Promise<void> => {
  try {
    // Basic validation
    if (!healthInfo.value.height || !healthInfo.value.weight || !healthInfo.value.age) {
      await showToast('Please fill in all health information fields', 'warning')
      return
    }

    loadingStore.startLoading('Saving health information...')
    await profileStore.saveHealthInfo()
    await showToast('Health information updated successfully!')

    // Exit edit mode after successful save
    profileStore.cancelEdit('health')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Failed to save health info:', error)
    await showToast(`Failed to update health information: ${errorMessage}`, 'danger')
  } finally {
    loadingStore.stopLoading()
  }
}

const saveConditionsWithLoading = async (): Promise<void> => {
  try {
    loadingStore.startLoading('Saving health conditions...')
    await profileStore.saveConditions()
    await showToast('Health conditions updated successfully!')

    // Exit edit mode after successful save
    profileStore.cancelEdit('conditions')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Failed to save conditions:', error)
    await showToast(`Failed to update health conditions: ${errorMessage}`, 'danger')
  } finally {
    loadingStore.stopLoading()
  }
}

const saveDietaryPrefsWithLoading = async (): Promise<void> => {
  try {
    loadingStore.startLoading('Saving dietary preferences...')
    await profileStore.saveDietaryPrefs()
    await showToast('Dietary preferences updated successfully!')

    // Exit edit mode after successful save
    profileStore.cancelEdit('dietary')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Failed to save dietary preferences:', error)
    await showToast(`Failed to update dietary preferences: ${errorMessage}`, 'danger')
  } finally {
    loadingStore.stopLoading()
  }
}

// Health conditions methods that work with local newCondition ref
const addConditionFromInput = (): void => {
  if (newCondition.value.trim()) {
    profileStore.addCondition(newCondition.value.trim())
    newCondition.value = ''
  }
}

const addCommonConditionFromList = (condition: string): void => {
  profileStore.addCommonCondition(condition)
}

const removeConditionByIndex = (index: number): void => {
  profileStore.removeCondition(index)
}

// Add BMI category helper function
const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

// Local reactive references
const newCondition = ref('')

// Activity level options with proper typing
const activityLevelOptions: ActivityLevelOption[] = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'light', label: 'Lightly Active' },
  { value: 'moderate', label: 'Moderately Active' },
  { value: 'very', label: 'Very Active' },
  { value: 'extra', label: 'Extra Active' },
]

// Common conditions for quick selection - using proper typing
const commonConditions: CommonCondition[] = [
  { name: 'Diabetes', category: 'Metabolic' },
  { name: 'High Blood Pressure', category: 'Cardiovascular' },
  { name: 'High Cholesterol', category: 'Cardiovascular' },
  { name: 'Heart Disease', category: 'Cardiovascular' },
  { name: 'Kidney Disease', category: 'Renal' },
  { name: 'Liver Disease', category: 'Hepatic' },
  { name: 'Thyroid Issues', category: 'Endocrine' },
  { name: 'Food Allergies', category: 'Allergic' },
]

// Initialize store on component mount
onMounted(async () => {
  await initializeStoreWithLoading()
})

// Helper methods
const initializeStoreWithLoading = async (): Promise<void> => {
  try {
    loadingStore.startLoading('Loading profile settings...')
    await profileStore.initializeStore()
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    await showToast(`Failed to load profile settings: ${errorMessage}`, 'danger')
    console.error('Failed to initialize profile store:', error)
  } finally {
    loadingStore.stopLoading()
  }
}

const showToast = async (message: string, color: ToastColor = 'success'): Promise<void> => {
  const toast = await toastController.create({
    message,
    duration: 3000,
    color,
    position: 'top',
  })
  await toast.present()
}

// Image selection with proper typing
const selectImage = (): void => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          userProfile.value.profileImage = result
        }
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

// Enhanced notification change handler with centralized loading
const onNotificationChange = async (): Promise<void> => {
  try {
    loadingStore.startLoading('Saving notification preferences...')
    await profileStore.saveNotifications()
    await showToast('Notification preferences updated!')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Failed to save notification preferences:', error)
    await showToast(`Failed to update notification preferences: ${errorMessage}`, 'danger')
  } finally {
    loadingStore.stopLoading()
  }
}
</script>

<style scoped>
.profile-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ion-color-light);
  cursor: pointer;
  margin-bottom: 10px;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.button-group {
  display: flex;
  gap: 10px;
}

.conditions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.add-condition {
  margin-bottom: 20px;
}

.common-conditions {
  margin-bottom: 20px;
}

.condition-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

ion-card {
  margin-bottom: 20px;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

ion-chip {
  margin: 2px;
}

ion-chip ion-icon {
  cursor: pointer;
}

.ion-margin-start {
  margin-left: 16px;
}
</style>
