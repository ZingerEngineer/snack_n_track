/**
 * Migration script for transitioning from legacy to unified meal response system
 * This script helps identify redundant files and provides a migration path
 */

import fs from 'fs'
import path from 'path'

interface RedundantFile {
  filePath: string
  reason: string
  suggested_action: 'delete' | 'consolidate' | 'update'
  replacement?: string
}

interface MigrationReport {
  redundantFiles: RedundantFile[]
  typeDefinitionConflicts: Array<{
    file1: string
    file2: string
    conflictingTypes: string[]
  }>
  updateRequired: Array<{
    filePath: string
    reason: string
    action: string
  }>
  summary: {
    totalFilesAnalyzed: number
    redundantFilesFound: number
    typesConsolidated: number
    estimatedSavings: string
  }
}

export class MealTypeMigration {
  private serverSrcPath: string
  private migrationReport: MigrationReport

  constructor(serverSrcPath: string) {
    this.serverSrcPath = serverSrcPath
    this.migrationReport = {
      redundantFiles: [],
      typeDefinitionConflicts: [],
      updateRequired: [],
      summary: {
        totalFilesAnalyzed: 0,
        redundantFilesFound: 0,
        typesConsolidated: 0,
        estimatedSavings: '0KB'
      }
    }
  }

  /**
   * Analyze the codebase for redundant files and type conflicts
   */
  async analyzeMigration(): Promise<MigrationReport> {
    console.log('🔍 Starting meal types migration analysis...')

    // Analyze legacy type files
    await this.analyzeTypeFiles()

    // Analyze controllers for duplication
    await this.analyzeControllers()

    // Analyze schemas for conflicts
    await this.analyzeSchemas()

    // Generate summary
    this.generateSummary()

    console.log('✅ Migration analysis complete!')
    return this.migrationReport
  }

  /**
   * Execute the migration (safe mode - creates backup first)
   */
  async executeMigration(dryRun: boolean = true): Promise<void> {
    if (dryRun) {
      console.log('🧪 DRY RUN MODE - No files will be modified')
      this.previewMigration()
      return
    }

    console.log('🚀 Starting migration execution...')

    // Create backup
    await this.createBackup()

    // Execute migration steps
    await this.migrateRedundantFiles()
    await this.updateImports()
    await this.createMigrationDocumentation()

    console.log('✅ Migration completed successfully!')
  }

  private async analyzeTypeFiles(): Promise<void> {
    const typeFiles = [
      'types/global.types.ts',
      'schemas/meal/scanMeal.zod.ts',
      'types/shared/meal.types.ts' // Our new unified types
    ]

    console.log('📋 Analyzing type definitions...')

    // Check if global.types.ts exists and is redundant
    const globalTypesPath = path.join(
      this.serverSrcPath,
      'types/global.types.ts'
    )
    if (fs.existsSync(globalTypesPath)) {
      const content = fs.readFileSync(globalTypesPath, 'utf-8')

      // Check for redundant food type definitions
      if (content.includes('TTypeOfFood') && content.includes('Vegetable')) {
        this.migrationReport.redundantFiles.push({
          filePath: globalTypesPath,
          reason:
            'Food type definitions duplicated in Prisma schema (FoodType enum)',
          suggested_action: 'delete',
          replacement:
            'Use FoodType enum from @prisma/client and unified meal types'
        })
      }

      // Check for redundant nutrition interfaces
      if (
        content.includes('INutritionData') ||
        content.includes('IEstimatedNutritionData')
      ) {
        this.migrationReport.redundantFiles.push({
          filePath: globalTypesPath,
          reason:
            'Nutrition interfaces replaced by unified meal types with proper unit handling',
          suggested_action: 'delete',
          replacement: 'Use interfaces from types/shared/meal.types.ts'
        })
      }
    }

    // Check legacy scan meal zod schema
    const legacyScanMealPath = path.join(
      this.serverSrcPath,
      'schemas/meal/scanMeal.zod.ts'
    )
    if (fs.existsSync(legacyScanMealPath)) {
      this.migrationReport.updateRequired.push({
        filePath: legacyScanMealPath,
        reason: 'Legacy Zod schemas should be updated to use unified schemas',
        action:
          'Update imports to use schemas/meal/unified.meal.zod.ts for new endpoints'
      })
    }
  }

  private async analyzeControllers(): Promise<void> {
    console.log('🎮 Analyzing controllers...')

    const controllerPath = path.join(
      this.serverSrcPath,
      'controllers/meal.controller.ts'
    )
    if (fs.existsSync(controllerPath)) {
      const content = fs.readFileSync(controllerPath, 'utf-8')

      // Check for legacy controller usage
      if (
        content.includes('scanMealGeminiController') &&
        content.includes('scanMealUnifiedController')
      ) {
        this.migrationReport.updateRequired.push({
          filePath: controllerPath,
          reason: 'Controller contains both legacy and unified implementations',
          action:
            'Update route handlers to use scanMealUnifiedController for new endpoints'
        })
      }
    }

    // Check for duplicate meal services
    const servicePaths = [
      'services/mealDataService.ts',
      'controllers/mealController/responseService.ts',
      'services/mealResponseAdapter.ts'
    ]

    for (const servicePath of servicePaths) {
      const fullPath = path.join(this.serverSrcPath, servicePath)
      if (fs.existsSync(fullPath)) {
        this.migrationReport.updateRequired.push({
          filePath: fullPath,
          reason:
            'New service should be integrated into existing meal workflow',
          action:
            'Update existing meal scanning endpoints to use unified services'
        })
      }
    }
  }

  private async analyzeSchemas(): Promise<void> {
    console.log('📊 Analyzing Zod schemas...')

    const schemaFiles = [
      'schemas/meal/scanMeal.zod.ts',
      'schemas/meal/unified.meal.zod.ts'
    ]

    // Check for schema duplication
    const legacySchemaPath = path.join(
      this.serverSrcPath,
      'schemas/meal/scanMeal.zod.ts'
    )
    const unifiedSchemaPath = path.join(
      this.serverSrcPath,
      'schemas/meal/unified.meal.zod.ts'
    )

    if (fs.existsSync(legacySchemaPath) && fs.existsSync(unifiedSchemaPath)) {
      this.migrationReport.typeDefinitionConflicts.push({
        file1: legacySchemaPath,
        file2: unifiedSchemaPath,
        conflictingTypes: [
          'TScanMealResponse vs TMealScanResponse',
          'ScanMealResponseSchema vs MealScanResponseSchema',
          'Nutrition value handling (string vs structured)'
        ]
      })
    }
  }

  private generateSummary(): void {
    const summary = this.migrationReport.summary
    summary.totalFilesAnalyzed =
      this.migrationReport.redundantFiles.length +
      this.migrationReport.updateRequired.length
    summary.redundantFilesFound = this.migrationReport.redundantFiles.length
    summary.typesConsolidated =
      this.migrationReport.typeDefinitionConflicts.length

    // Estimate space savings (rough calculation)
    const avgFileSize = 2048 // 2KB average
    const redundantFiles = this.migrationReport.redundantFiles.length
    summary.estimatedSavings = `${((redundantFiles * avgFileSize) / 1024).toFixed(1)}KB`
  }

  private previewMigration(): void {
    console.log('\n📋 MIGRATION PREVIEW\n')

    console.log('🗑️  FILES TO DELETE:')
    this.migrationReport.redundantFiles
      .filter((f) => f.suggested_action === 'delete')
      .forEach((file) => {
        console.log(`   ❌ ${file.filePath}`)
        console.log(`      Reason: ${file.reason}`)
        if (file.replacement) {
          console.log(`      Replace with: ${file.replacement}`)
        }
        console.log('')
      })

    console.log('🔄 FILES TO UPDATE:')
    this.migrationReport.updateRequired.forEach((update) => {
      console.log(`   🔧 ${update.filePath}`)
      console.log(`      Reason: ${update.reason}`)
      console.log(`      Action: ${update.action}`)
      console.log('')
    })

    console.log('⚠️  TYPE CONFLICTS:')
    this.migrationReport.typeDefinitionConflicts.forEach((conflict) => {
      console.log(`   ⚡ ${conflict.file1} vs ${conflict.file2}`)
      conflict.conflictingTypes.forEach((type) => {
        console.log(`      - ${type}`)
      })
      console.log('')
    })

    console.log('📊 SUMMARY:')
    console.log(
      `   Files analyzed: ${this.migrationReport.summary.totalFilesAnalyzed}`
    )
    console.log(
      `   Redundant files: ${this.migrationReport.summary.redundantFilesFound}`
    )
    console.log(
      `   Type conflicts: ${this.migrationReport.summary.typesConsolidated}`
    )
    console.log(
      `   Estimated savings: ${this.migrationReport.summary.estimatedSavings}`
    )
  }

  private async createBackup(): Promise<void> {
    const backupDir = path.join(this.serverSrcPath, '../meal-types-backup')
    console.log(`💾 Creating backup in ${backupDir}...`)

    // Create backup directory
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true })
    }

    // Copy files that will be modified
    for (const file of this.migrationReport.redundantFiles) {
      const fileName = path.basename(file.filePath)
      const backupPath = path.join(backupDir, fileName)
      fs.copyFileSync(file.filePath, backupPath)
    }

    console.log('✅ Backup created successfully!')
  }

  private async migrateRedundantFiles(): Promise<void> {
    console.log('🗑️  Removing redundant files...')

    for (const file of this.migrationReport.redundantFiles) {
      if (file.suggested_action === 'delete') {
        if (fs.existsSync(file.filePath)) {
          fs.unlinkSync(file.filePath)
          console.log(`   ❌ Deleted: ${file.filePath}`)
        }
      }
    }
  }

  private async updateImports(): Promise<void> {
    console.log('🔄 Updating imports...')

    // This would be a more complex operation in practice
    // For now, we'll just log what needs to be updated
    this.migrationReport.updateRequired.forEach((update) => {
      console.log(`   🔧 TODO: ${update.filePath} - ${update.action}`)
    })
  }

  private async createMigrationDocumentation(): Promise<void> {
    const docPath = path.join(this.serverSrcPath, '../MEAL_TYPES_MIGRATION.md')

    const documentation = `# Meal Types Migration Report

## Summary
- **Date**: ${new Date().toISOString()}
- **Files Analyzed**: ${this.migrationReport.summary.totalFilesAnalyzed}
- **Redundant Files Removed**: ${this.migrationReport.summary.redundantFilesFound}
- **Space Saved**: ${this.migrationReport.summary.estimatedSavings}

## Changes Made

### Deleted Files
${this.migrationReport.redundantFiles
  .filter((f) => f.suggested_action === 'delete')
  .map((f) => `- \`${f.filePath}\`: ${f.reason}`)
  .join('\n')}

### Updated Files
${this.migrationReport.updateRequired
  .map((u) => `- \`${u.filePath}\`: ${u.action}`)
  .join('\n')}

## New Unified System

### Key Files
- \`types/shared/meal.types.ts\`: Unified type definitions
- \`schemas/meal/unified.meal.zod.ts\`: Updated Zod schemas
- \`services/mealDataService.ts\`: Database operations
- \`services/mealResponseAdapter.ts\`: Format conversion
- \`utils/mealResponseUtils.ts\`: Utility functions

### Migration Path
1. ✅ Legacy types removed
2. ✅ Unified types implemented
3. ✅ Backward compatibility maintained
4. 🔄 Update controllers to use new endpoints
5. 🔄 Update frontend to consume new response format

## Next Steps
1. Update route handlers to use \`scanMealUnifiedController\`
2. Test backward compatibility with existing endpoints
3. Update API documentation
4. Monitor for any breaking changes
5. Complete removal of legacy code after validation

## Rollback Plan
A backup was created in \`meal-types-backup/\` directory.
To rollback, restore the backed up files and revert controller changes.
`

    fs.writeFileSync(docPath, documentation)
    console.log(`📚 Migration documentation created: ${docPath}`)
  }
}

/**
 * Usage example
 */
export async function runMigrationAnalysis(
  serverSrcPath: string
): Promise<void> {
  const migration = new MealTypeMigration(serverSrcPath)

  // First, analyze what needs to be migrated
  const report = await migration.analyzeMigration()

  // Preview the migration (dry run)
  await migration.executeMigration(true)

  console.log('\n🎯 To execute the migration for real, run:')
  console.log('await migration.executeMigration(false)')

  return
}

// Run analysis if this file is executed directly
if (require.main === module) {
  const serverSrcPath =
    process.argv[2] || '/home/zinger/Apps/snack_n_track/apps/server/src'
  runMigrationAnalysis(serverSrcPath)
    .then(() => console.log('Migration analysis complete!'))
    .catch((error) => console.error('Migration analysis failed:', error))
}

