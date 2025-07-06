import { Response } from 'express'
import UserDAO from '../daos/user.dao'
import MedicalConditionDAO from '../daos/medicalCondition.dao'
import UserHealthTrackingDAO from '../daos/userHealthTracking.dao'
import { ValidationError, NotFoundError, BaseError } from '../classes/Error'
import { AuthenticatedRequest } from '../types/shared.types'

class UserSettingsController {
  private userDAO: UserDAO
  private medicalConditionDAO: MedicalConditionDAO
  private healthTrackingDAO: UserHealthTrackingDAO

  constructor() {
    this.userDAO = new UserDAO()
    this.medicalConditionDAO = new MedicalConditionDAO()
    this.healthTrackingDAO = new UserHealthTrackingDAO()
  }

  // Get user profile with all settings
  async getUserSettings(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.userId
      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      console.log(
        `[UserSettingsController.getUserSettings] Fetching settings for user: ${userId}`
      )

      const user = await this.userDAO.getUserWithRelations(userId)

      if (!user) {
        throw new NotFoundError('User not found')
      }

      // Get latest health tracking data
      const healthTracking =
        await this.healthTrackingDAO.getUserHealthTracking(userId)

      // Format response
      const response = {
        success: true,
        message: 'User settings retrieved successfully',
        data: {
          profile: {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            avatar: user.avatar
          },
          preferences: user.preferences || {
            language: 'en',
            theme: 'light',
            notifications: false
          },
          healthData: healthTracking
            ? {
                weight: healthTracking.weight
                  ? {
                      value: healthTracking.weight,
                      unit: 'kg' as const
                    }
                  : undefined,
                height: healthTracking.height
                  ? {
                      value: healthTracking.height,
                      unit: 'cm' as const
                    }
                  : undefined,
                BMI: healthTracking.BMI,
                sugarLevel: healthTracking.sugarLevel,
                bloodPressure: healthTracking.bloodPressure,
                cholesterolLevel: healthTracking.cholesterolLevel,
                dietaryPreference: healthTracking.dietaryPreference,
                activityLevel: healthTracking.activityLevel
              }
            : {},
          medicalConditions: user.medicalConditions.map(
            (umc) => umc.medicalCondition
          )
        }
      }

      console.log(
        `[UserSettingsController.getUserSettings] Settings retrieved successfully for user: ${userId}`
      )
      res.status(200).json(response)
    } catch (error) {
      console.error('[UserSettingsController.getUserSettings] Error:', error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error while fetching user settings'
        })
      }
    }
  }

  // Update user profile
  async updateUserProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.userId
      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      console.log(
        `[UserSettingsController.getUserSettings] Fetching settings for user: ${userId}`
      )
      const { name, age, gender, avatar } = req.body

      console.log(
        `[UserSettingsController.updateUserProfile] Updating profile for user: ${userId}`
      )

      const updatedUser = await this.userDAO.updateUser(userId, {
        name,
        age: age ? parseInt(age) : undefined,
        gender,
        avatar
      })

      res.status(200).json({
        success: true,
        message: 'User profile updated successfully',
        data: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          age: updatedUser.age,
          gender: updatedUser.gender,
          avatar: updatedUser.avatar
        }
      })
    } catch (error) {
      console.error('[UserSettingsController.updateUserProfile] Error:', error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error while updating user profile'
        })
      }
    }
  }

  // Update user preferences
  async updateUserPreferences(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.userId
      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      console.log(
        `[UserSettingsController.getUserSettings] Fetching settings for user: ${userId}`
      )
      const { language, theme, notifications } = req.body

      console.log(
        `[UserSettingsController.updateUserPreferences] Updating preferences for user: ${userId}`
      )

      const updatedPreferences =
        await this.userDAO.createOrUpdateUserPreferences(userId, {
          language,
          theme,
          notifications:
            notifications !== undefined ? Boolean(notifications) : undefined
        })

      res.status(200).json({
        success: true,
        message: 'User preferences updated successfully',
        data: updatedPreferences
      })
    } catch (error) {
      console.error(
        '[UserSettingsController.updateUserPreferences] Error:',
        error
      )

      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error while updating user preferences'
        })
      }
    }
  }

  // Update user health data
  async updateUserHealthData(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.userId
      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      console.log(
        `[UserSettingsController.getUserSettings] Fetching settings for user: ${userId}`
      )
      const {
        weight,
        height,
        BMI,
        sugarLevel,
        bloodPressure,
        cholesterolLevel,
        dietaryPreference,
        activityLevel
      } = req.body

      console.log(
        `[UserSettingsController.updateUserHealthData] Updating health data for user: ${userId}`
      )

      // Convert weight and height to numbers if they're objects
      const weightValue = typeof weight === 'object' ? weight.value : weight
      const heightValue = typeof height === 'object' ? height.value : height

      const healthData = await this.healthTrackingDAO.upsertUserHealthTracking({
        userId,
        weight: weightValue ? parseFloat(weightValue) : undefined,
        height: heightValue ? parseFloat(heightValue) : undefined,
        BMI: BMI ? parseFloat(BMI) : undefined,
        sugarLevel: sugarLevel ? parseFloat(sugarLevel) : undefined,
        bloodPressure,
        cholesterolLevel: cholesterolLevel
          ? parseFloat(cholesterolLevel)
          : undefined,
        dietaryPreference,
        activityLevel
      })

      res.status(200).json({
        success: true,
        message: 'User health data updated successfully',
        data: healthData
      })
    } catch (error) {
      console.error(
        '[UserSettingsController.updateUserHealthData] Error:',
        error
      )

      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error while updating user health data'
        })
      }
    }
  }

  // Update user medical conditions
  async updateUserMedicalConditions(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.userId
      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      console.log(
        `[UserSettingsController.getUserSettings] Fetching settings for user: ${userId}`
      )
      const { medicalConditionIds } = req.body
      console.log(
        `[UserSettingsController.updateUserMedicalConditions] Updating medical conditions for user: ${userId}`
      )
      console.log(
        `[UserSettingsController.updateUserMedicalConditions] Received medicalConditionIds: ${medicalConditionIds}`
      )
      if (!Array.isArray(medicalConditionIds)) {
        throw new ValidationError('Medical condition IDs must be an array')
      }

      console.log(
        `[UserSettingsController.updateUserMedicalConditions] Updating medical conditions for user: ${userId}`
      )

      await this.medicalConditionDAO.updateUserMedicalConditions(
        userId,
        medicalConditionIds
      )

      // Fetch updated conditions
      const updatedConditions =
        await this.medicalConditionDAO.getUserMedicalConditions(userId)

      res.status(200).json({
        success: true,
        message: 'User medical conditions updated successfully',
        data: updatedConditions
      })
    } catch (error) {
      console.error(
        '[UserSettingsController.updateUserMedicalConditions] Error:',
        error
      )

      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        })
      } else {
        res.status(500).json({
          success: false,
          message:
            'Internal server error while updating user medical conditions'
        })
      }
    }
  }

  // Get all available medical conditions
  async getAllMedicalConditions(req: AuthenticatedRequest, res: Response) {
    try {
      console.log(
        '[UserSettingsController.getAllMedicalConditions] Fetching all medical conditions'
      )
      const userId = req.user?.userId
      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      console.log(
        `[UserSettingsController.getUserSettings] Fetching settings for user: ${userId}`
      )
      const conditions =
        await this.medicalConditionDAO.getMedicalConditionById(userId)

      res.status(200).json({
        success: true,
        message: 'Medical conditions retrieved successfully',
        data: conditions
      })
    } catch (error) {
      console.error(
        '[UserSettingsController.getAllMedicalConditions] Error:',
        error
      )

      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching medical conditions'
      })
    }
  }

  // Update all user settings at once
  async updateAllUserSettings(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.userId
      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      console.log(
        `[UserSettingsController.getUserSettings] Fetching settings for user: ${userId}`
      )
      const { profile, preferences, healthData, medicalConditionIds } = req.body

      console.log(
        `[UserSettingsController.updateAllUserSettings] Updating all settings for user: ${userId}`
      )

      // Update profile if provided
      if (profile) {
        await this.userDAO.updateUser(userId, profile)
      }

      // Update preferences if provided
      if (preferences) {
        await this.userDAO.createOrUpdateUserPreferences(userId, preferences)
      }

      // Update health data if provided
      if (healthData) {
        const weightValue =
          typeof healthData.weight === 'object'
            ? healthData.weight.value
            : healthData.weight
        const heightValue =
          typeof healthData.height === 'object'
            ? healthData.height.value
            : healthData.height

        await this.healthTrackingDAO.upsertUserHealthTracking({
          userId,
          weight: weightValue ? parseFloat(weightValue) : undefined,
          height: heightValue ? parseFloat(heightValue) : undefined,
          BMI: healthData.BMI ? parseFloat(healthData.BMI) : undefined,
          sugarLevel: healthData.sugarLevel
            ? parseFloat(healthData.sugarLevel)
            : undefined,
          bloodPressure: healthData.bloodPressure,
          cholesterolLevel: healthData.cholesterolLevel
            ? parseFloat(healthData.cholesterolLevel)
            : undefined,
          dietaryPreference: healthData.dietaryPreference,
          activityLevel: healthData.activityLevel
        })
      }

      // Update medical conditions if provided
      if (medicalConditionIds && Array.isArray(medicalConditionIds)) {
        await this.medicalConditionDAO.updateUserMedicalConditions(
          userId,
          medicalConditionIds
        )
      }

      // Fetch updated user data
      const updatedUser = await this.userDAO.getUserWithRelations(userId)
      const updatedHealthTracking =
        await this.healthTrackingDAO.getUserHealthTracking(userId)

      const response = {
        success: true,
        message: 'All user settings updated successfully',
        data: {
          profile: {
            id: updatedUser?.id,
            name: updatedUser?.name,
            email: updatedUser?.email,
            age: updatedUser?.age,
            gender: updatedUser?.gender,
            avatar: updatedUser?.avatar
          },
          preferences: updatedUser?.preferences,
          healthData: updatedHealthTracking,
          medicalConditions: updatedUser?.medicalConditions.map(
            (umc) => umc.medicalCondition
          )
        }
      }

      res.status(200).json(response)
    } catch (error) {
      console.error(
        '[UserSettingsController.updateAllUserSettings] Error:',
        error
      )

      if (error instanceof BaseError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        })
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error while updating user settings'
        })
      }
    }
  }
}

export default UserSettingsController

