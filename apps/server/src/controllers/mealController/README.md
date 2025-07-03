# Meal Controller Architecture

This folder contains the refactored meal controller utilities, organized by responsibility for better maintainability and modularity.

## Structure

```
mealController/
├── index.ts                     # Main exports and types
├── aiAnalysisService.ts         # AI image analysis utilities (Gemini)
├── databaseService.ts           # Database operations
├── fileService.ts               # File upload/download/cleanup operations
├── validationService.ts         # Request and user validation
├── responseService.ts           # Response formatting and logging
├── snacknTrackModelService.ts   # SnacknTrack model API integration
├── hybridScanService.ts         # Hybrid scanning logic (SnacknTrack + Gemini)
└── README.md                   # This documentation
```

## Services Overview

### `aiAnalysisService.ts`

- **Purpose**: Handles AI-powered image analysis using Gemini API
- **Main Function**: `analyzeImageWithAI(filePath, mealName?)`
- **Responsibilities**:
  - Constructs detailed prompts for food analysis
  - Calls Gemini API with image data
  - Extracts and validates JSON responses
  - Handles AI service errors gracefully

### `databaseService.ts`

- **Purpose**: Manages meal data persistence to database
- **Main Function**: `saveMealToDatabase(mealData, userId, requestParams)`
- **Responsibilities**:
  - Formats meal data for database storage
  - Handles meal creation through MealDao
  - Logs database operations
  - Provides error recovery

### `fileService.ts`

- **Purpose**: Handles all file operations
- **Main Class**: `MealFileService`
- **Responsibilities**:
  - File upload to Supabase storage
  - File sanitization and security
  - File download for processing
  - Cleanup of temporary files
  - Public URL generation

### `validationService.ts`

- **Purpose**: Validates requests, users, and permissions
- **Main Class**: `MealValidationService`
- **Responsibilities**:
  - User authentication validation
  - Rate limiting enforcement
  - Request parameter validation
  - File upload validation
  - User permission checks

### `responseService.ts`

- **Purpose**: Handles response formatting and logging
- **Main Class**: `MealResponseService`
- **Responsibilities**:
  - Performance metrics logging
  - Error logging with context
  - Response formatting
  - Success response preparation

### `snacknTrackModelService.ts`

- **Purpose**: Integrates with the FastAPI SnacknTrack model service
- **Main Class**: `SnacknTrackModelService`
- **Responsibilities**:
  - Communication with SnacknTrack model API
  - Image scanning using YOLO model
  - Confidence evaluation and thresholding
  - Request polling and status checking
  - Service availability checking
  - Request cleanup management

### `hybridScanService.ts`

- **Purpose**: Combines SnacknTrack model with Gemini fallback
- **Main Class**: `HybridMealScanService`
- **Responsibilities**:
  - Orchestrates hybrid scanning workflow
  - Prioritizes SnacknTrack model for initial scan
  - Falls back to Gemini if confidence < 70%
  - Converts SnacknTrack responses to meal format
  - Manages source attribution and metadata

## Usage Example

```typescript
import {
  analyzeImageWithAI,
  saveMealToDatabase,
  MealFileService,
  MealValidationService,
  MealResponseService
} from './mealController'

// In your controller:
const { userId } = await MealValidationService.validateUserAndRateLimit(req)
const { publicUrl, fileName } = await MealFileService.uploadAndPrepareFile(file)
const aiResponse = await analyzeImageWithAI(filePath, mealName)
await saveMealToDatabase(response, userId, params)
MealResponseService.logPerformanceMetrics(startTime, userId, response)
```

## Benefits of This Architecture

1. **Separation of Concerns**: Each service handles a specific aspect of meal processing
2. **Modularity**: Services can be tested and maintained independently
3. **Reusability**: Services can be reused across different controllers
4. **Maintainability**: Clear structure makes the codebase easier to understand and modify
5. **Testability**: Individual services can be unit tested in isolation
6. **Error Handling**: Centralized error handling patterns
7. **Logging**: Consistent logging across all operations

## Testing Strategy

- Unit tests for each service class/function
- Integration tests for service interactions
- Mock external dependencies (Supabase, Gemini API, Database)
- Test error scenarios and edge cases
- Performance testing for file operations

## Future Enhancements

- Add caching layer for AI responses
- Implement retry mechanisms for external services
- Add metrics collection and monitoring
- Implement request queuing for high load scenarios
- Add support for batch processing

