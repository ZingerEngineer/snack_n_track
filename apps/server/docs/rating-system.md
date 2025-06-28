# Rating System Implementation

## Overview

The rating system allows users to provide feedback on various aspects of the nutrition tracking application. It supports multiple rating types and provides analytics for app improvement.

## Database Schema

### UserRating Model

- `id`: Unique identifier
- `userId`: Reference to the user providing the rating
- `ratingType`: Type of rating (enum)
- `rating`: Rating value (1-5 scale as enum)
- `comment`: Optional text feedback
- `context`: JSON field for additional context
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Enums

#### RatingType

- `APP_OVERALL`: Overall app experience
- `MEAL_RECOMMENDATION`: Quality of meal recommendations
- `FOOD_RECOGNITION`: Accuracy of food recognition
- `NUTRITION_ACCURACY`: Accuracy of nutrition information
- `USER_EXPERIENCE`: User interface and experience
- `FEATURE_SPECIFIC`: Specific feature ratings

#### RatingScale

- `ONE`: 1 star (Poor)
- `TWO`: 2 stars (Below Average)
- `THREE`: 3 stars (Average)
- `FOUR`: 4 stars (Good)
- `FIVE`: 5 stars (Excellent)

## Implementation Structure

```
src/
├── types/rating/
│   └── rating.types.ts      # TypeScript interfaces and enums
├── schemas/rating/
│   └── rating.zod.ts        # Zod validation schemas
├── daos/
│   └── rating.dao.ts        # Data access layer
└── services/
    └── rating.service.ts    # Business logic layer
```

## API Usage Examples

### Creating/Updating a Rating

```typescript
import { UserRatingService } from './services/rating.service'
import { RatingType, RatingScale } from './types/rating/rating.types'

const ratingService = new UserRatingService(prisma)

// Create or update a rating
const rating = await ratingService.upsertRating('user-id', {
  ratingType: RatingType.APP_OVERALL,
  rating: RatingScale.FIVE,
  comment: 'Great app! Love the meal tracking feature.',
  context: {
    platform: 'mobile',
    version: '1.0.0',
    feature_used: 'meal-tracking'
  }
})
```

### Getting User Ratings

```typescript
// Get a specific rating
const specificRating = await ratingService.getUserRatingByType(
  'user-id',
  RatingType.APP_OVERALL
)

// Get all user ratings
const allRatings = await ratingService.getUserRatings('user-id')
```

### Analytics and Statistics

```typescript
// Get rating statistics
const stats = await ratingService.getRatingStats({
  ratingType: RatingType.APP_OVERALL,
  dateFrom: new Date('2025-01-01'),
  dateTo: new Date('2025-12-31')
})

// Get overall app satisfaction metrics
const satisfaction = await ratingService.getAppSatisfactionMetrics()
console.log(satisfaction)
// Output:
// {
//   overallRating: 4.2,
//   totalRatings: 150,
//   ratingDistribution: {
//     ONE: 5,
//     TWO: 10,
//     THREE: 25,
//     FOUR: 60,
//     FIVE: 50
//   },
//   categoryBreakdown: [...]
// }
```

### Prompting for Ratings

```typescript
// Check if user should be prompted for rating
const promptInfo = await ratingService.shouldPromptForRating('user-id')
if (promptInfo.shouldPrompt) {
  console.log(`Prompt for ${promptInfo.suggestedType}: ${promptInfo.reason}`)
}
```

## Best Practices

### 1. Rating Frequency

- **App Overall**: Once per major version or after significant usage
- **Feature Specific**: After user interacts with specific features
- **Meal Recommendation**: After user accepts/rejects recommendations
- **Food Recognition**: After food scanning/recognition

### 2. Context Information

Store relevant context with ratings:

```typescript
context: {
  platform: 'mobile' | 'web',
  app_version: '1.0.0',
  feature_used: 'meal-tracking',
  user_session_duration: 1800, // seconds
  meals_logged_count: 5
}
```

### 3. Analytics Usage

- Monitor overall satisfaction trends
- Identify problem areas (low-rated features)
- Track improvement over time
- Segment by user demographics or usage patterns

### 4. User Experience

- Don't prompt too frequently
- Show ratings at natural break points in user flow
- Make rating submission quick and easy
- Provide feedback on how ratings are used

## Migration

To add the rating system to your database:

```bash
npx prisma migrate dev --name "add_comprehensive_rating_and_feedback_system"
```

This adds:

- UserRating model with all fields
- RatingType and RatingScale enums
- Proper relations to User model
- Indexes for performance

## Testing

Run the test file to verify implementation:

```bash
npm run test:rating
# or
npx ts-node src/test-rating.ts
```

## Future Enhancements

1. **Machine Learning Integration**

   - Predict user satisfaction based on behavior
   - Personalized rating prompts

2. **Advanced Analytics**

   - Cohort analysis
   - A/B testing integration
   - Real-time dashboards

3. **Incentivization**

   - Reward users for providing ratings
   - Gamification elements

4. **Sentiment Analysis**
   - Analyze comment text for insights
   - Automatic categorization of feedback

## Security Considerations

- Validate all input data using Zod schemas
- Ensure users can only rate on their own behalf
- Rate limit rating submissions to prevent spam
- Sanitize comment text to prevent XSS
- Consider making ratings anonymous for sensitive feedback

