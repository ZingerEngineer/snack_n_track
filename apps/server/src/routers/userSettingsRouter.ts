import express from 'express'
import UserSettingsController from '../controllers/userSettings.controller'

const userSettingsRouter = express.Router()
const userSettingsController = new UserSettingsController()

// Get user settings (profile, preferences, health data, medical conditions)
userSettingsRouter.get(
  '/',
  userSettingsController.getUserSettings.bind(userSettingsController)
)

// Update user profile
userSettingsRouter.put(
  '/profile',
  userSettingsController.updateUserProfile.bind(userSettingsController)
)

// Update user preferences
userSettingsRouter.put(
  '/preferences',
  userSettingsController.updateUserPreferences.bind(userSettingsController)
)

// Update user health data
userSettingsRouter.put(
  '/health',
  userSettingsController.updateUserHealthData.bind(userSettingsController)
)

// Update user medical conditions
userSettingsRouter.put(
  '/medical-conditions',
  userSettingsController.updateUserMedicalConditions.bind(
    userSettingsController
  )
)

// Get all available medical conditions
userSettingsRouter.get(
  '/medical-conditions',
  userSettingsController.getAllMedicalConditions.bind(userSettingsController)
)

// Update all user settings at once
userSettingsRouter.put(
  '/',
  userSettingsController.updateAllUserSettings.bind(userSettingsController)
)

export default userSettingsRouter

