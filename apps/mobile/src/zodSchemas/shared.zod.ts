import z from 'zod'
import { NutritionUnit, PortionUnit, FoodType, MealType } from '../types/shared.types'
// Food type enum schema matching Prisma schema
const FoodTypeSchema = z.nativeEnum(FoodType)

const MealTypeSchema = z.nativeEnum(MealType)

const NutritionUnitSchema = z.nativeEnum(NutritionUnit)

const PortionUnitSchema = z.nativeEnum(PortionUnit)

export { FoodTypeSchema, MealTypeSchema, NutritionUnitSchema, PortionUnitSchema }
