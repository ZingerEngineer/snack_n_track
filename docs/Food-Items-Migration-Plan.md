# 🔄 Food Items Seed Migration Plan

## 📋 **Overview**

This document outlines the migration plan to align the `foodItemsSeed.ts` records with the ML model's expected classes defined in `classes.txt`. The goal is to ensure perfect compatibility between the database seed data and the machine learning model predictions.

## 🎯 **Objectives**

1. **Exact Name Matching**: Ensure all food names match `classes.txt` exactly (case-sensitive)
2. **Complete Coverage**: Include all 150 classes from the ML model
3. **Strict Filtering**: **ONLY include items that exist in `classes.txt` - remove any items not in the ML model**
4. **Data Integrity**: Use `null` for ingredient strings when composition is uncertain rather than guessing
5. **Database Compatibility**: Ensure smooth database seeding process

## 📊 **Current State Analysis**

### **Total Items**

- **classes.txt**: 150 items (101 prepared foods + 49 raw ingredients)
- **foodItemsSeed.ts**: 101 items (all prepared foods)
- **Gap**: 49 missing raw ingredients + several name mismatches

### **Issue Categories**

#### **1. Case/Capitalization Mismatches**

```typescript
// Current → Required
"White Rice" → "White rice"
"Baba ghanoush" → "Baba ghanoush" ✅ (correct)
"Umm Ali" → "Umm Ali" ✅ (correct)
```

#### **2. Missing Prepared Foods**

```
- Edible game
- Baklava
- Pizza
- Omelette eggs
- Brown toast
- Foul medames
- White toast
- Vienna bread
- Basmati rice
- Cowpea in tomato sauce (different from "Beans in tomato sauce")
```

#### **3. Missing Raw Ingredients (49 items)**

```
Vegetables: Eggplant, Broccoli, Carrot, Garlic, Green pepper, etc.
Fruits: Apple, Banana, Kiwi, Mango, Orange, Pineapple, etc.
Other: Egg, Mushroom, etc.
```

#### **4. Items to Remove/Modify**

```
- "Peanuts" (not in classes.txt - REMOVE)
- "Cowpea in tomato sauce" (not in classes.txt - REMOVE)
- Any other items not found in classes.txt (strict filtering)
```

### **⚠️ CRITICAL RULE: Classes.txt Authority**

**The `classes.txt` file is the single source of truth. If an item exists in `foodItemsSeed.ts` but NOT in `classes.txt`, it MUST be removed from the seed file. No exceptions.**

### **🆕 INGREDIENT STRING POLICY**

**For items that exist in `classes.txt` but are missing from the current seed file, if we don't have a reliable ingredient composition, set the `ingredientString` to `null` instead of guessing. This maintains data integrity while ensuring all classes are represented.**

## 🔍 **Items Audit: Current Seed vs Classes.txt**

### **Items to REMOVE (Not in classes.txt)**

After careful comparison, these items exist in `foodItemsSeed.ts` but are **NOT** in `classes.txt`:

| Item in Seed             | Status                | Action     |
| ------------------------ | --------------------- | ---------- |
| "Peanuts"                | ❌ Not in classes.txt | **REMOVE** |
| "Cowpea in tomato sauce" | ❌ Not in classes.txt | **REMOVE** |

**Note**: "Beans in tomato sauce" exists in classes.txt, but "Cowpea in tomato sauce" is different and must be removed.

## 💡 **Implementation Examples**

### **Example 1: Items with Known Ingredients**

```typescript
{
  foodName: 'Pizza',
  ingredientString: 'Flour: 300 grams, Tomato Sauce: 100 ml, Mozzarella: 150 grams, Oil: 2 tablespoons, Yeast: 1 teaspoon, Salt: 1/2 teaspoon'
}
```

### **Example 2: Items with Uncertain Ingredients (Use NULL)**

```typescript
{
  foodName: 'Edible game',
  ingredientString: null  // Complex preparation, ingredients vary widely
},
{
  foodName: 'Brown toast',
  ingredientString: null  // Brand-specific bread composition varies
}
```

### **Example 3: Raw Ingredients (Simple Format)**

```typescript
{
  foodName: 'Apple',
  ingredientString: 'Apple: 100 grams'
},
{
  foodName: 'Carrot',
  ingredientString: 'Carrot: 100 grams'
}
```

## 🗂️ **Detailed Mapping Table**

### **Phase 1: Name Standardization (Existing Items)**

| Current Name             | Required Name            | Status | Action    |
| ------------------------ | ------------------------ | ------ | --------- |
| White Rice               | White rice               | ❌     | Fix case  |
| Rice with vermicelli     | Rice with vermicelli     | ✅     | No change |
| Rice with lentils        | Rice with lentils        | ✅     | No change |
| Rice pudding             | Rice pudding             | ✅     | No change |
| Umm Ali                  | Umm Ali                  | ✅     | No change |
| Baba ghanoush            | Baba ghanoush            | ✅     | No change |
| Rolled eggplant          | Rolled eggplant          | ✅     | No change |
| Okra in tomato sauce     | Okra in tomato sauce     | ✅     | No change |
| Basbousa                 | Basbousa                 | ✅     | No change |
| Biscuit                  | Biscuit                  | ✅     | No change |
| Peas in tomato sauce     | Peas in tomato sauce     | ✅     | No change |
| Bissara                  | Bissara                  | ✅     | No change |
| Duck with orange         | Duck with orange         | ✅     | No change |
| Grilled stuffed duck     | Grilled stuffed duck     | ✅     | No change |
| Boiled potatoes          | Boiled potatoes          | ✅     | No change |
| French fries             | French fries             | ✅     | No change |
| Balah el sham            | Balah el sham            | ✅     | No change |
| Eggs with pastrami       | Eggs with pastrami       | ✅     | No change |
| Boiled eggs              | Boiled eggs              | ✅     | No change |
| Tuna                     | Tuna                     | ✅     | No change |
| White cheese             | White cheese             | ✅     | No change |
| Roquefort cheese         | Roquefort cheese         | ✅     | No change |
| Romano cheese            | Romano cheese            | ✅     | No change |
| Cheddar cheese           | Cheddar cheese           | ✅     | No change |
| Cottage cheese           | Cottage cheese           | ✅     | No change |
| Goulash with meat        | Goulash with meat        | ✅     | No change |
| Shrimp                   | Shrimp                   | ✅     | No change |
| Jelly                    | Jelly                    | ✅     | No change |
| Grilled stuffed pigeon   | Grilled stuffed pigeon   | ✅     | No change |
| Chickpeas                | Chickpeas                | ✅     | No change |
| Hawawshi                 | Hawawshi                 | ✅     | No change |
| Chicken with freekeh     | Chicken with freekeh     | ✅     | No change |
| Breaded chicken          | Breaded chicken          | ✅     | No change |
| Stuffed chicken          | Stuffed chicken          | ✅     | No change |
| Boiled chicken           | Boiled chicken           | ✅     | No change |
| Grilled chicken          | Grilled chicken          | ✅     | No change |
| Green olives             | Green olives             | ✅     | No change |
| Spinach in tomato sauce  | Spinach in tomato sauce  | ✅     | No change |
| Grilled steak            | Grilled steak            | ✅     | No change |
| Sausage                  | Sausage                  | ✅     | No change |
| Quail                    | Quail                    | ✅     | No change |
| Samosa                   | Samosa                   | ✅     | No change |
| Fish                     | Fish                     | ✅     | No change |
| Sushi                    | Sushi                    | ✅     | No change |
| Chicken shawarma         | Chicken shawarma         | ✅     | No change |
| Beef shawarma            | Beef shawarma            | ✅     | No change |
| Chicken strips           | Chicken strips           | ✅     | No change |
| Vermicelli               | Vermicelli               | ✅     | No change |
| Shakshuka                | Shakshuka                | ✅     | No change |
| Zeinab's fingers         | Zeinab's fingers         | ✅     | No change |
| Stuffed potato casserole | Stuffed potato casserole | ✅     | No change |
| Yellow lentils           | Yellow lentils           | ✅     | No change |
| Black lentils            | Black lentils            | ✅     | No change |
| Baladi bread             | Baladi bread             | ✅     | No change |
| White beans              | White beans              | ✅     | No change |
| Chicken fajita           | Chicken fajita           | ✅     | No change |
| Eastern pie              | Eastern pie              | ✅     | No change |
| Layered pie              | Layered pie              | ✅     | No change |
| Beans in tomato sauce    | Beans in tomato sauce    | ✅     | No change |
| Qatayef                  | Qatayef                  | ✅     | No change |
| Crab                     | Crab                     | ✅     | No change |
| Calamari squid           | Calamari squid           | ✅     | No change |
| Kebab stew               | Kebab stew               | ✅     | No change |
| Liver                    | Liver                    | ✅     | No change |
| Kahk                     | Kahk                     | ✅     | No change |
| Kofta                    | Kofta                    | ✅     | No change |
| Kunafa                   | Kunafa                   | ✅     | No change |
| Cordon bleu              | Cordon bleu              | ✅     | No change |
| Zucchini in tomato sauce | Zucchini in tomato sauce | ✅     | No change |
| Coleslaw                 | Coleslaw                 | ✅     | No change |
| Meat in tomato sauce     | Meat in tomato sauce     | ✅     | No change |
| Boiled meat              | Boiled meat              | ✅     | No change |
| Orzo                     | Orzo                     | ✅     | No change |
| Stuffed eggplant         | Stuffed eggplant         | ✅     | No change |
| Stuffed onions           | Stuffed onions           | ✅     | No change |
| Stuffed peppers          | Stuffed peppers          | ✅     | No change |
| Stuffed cabbage          | Stuffed cabbage          | ✅     | No change |
| Stuffed zucchini         | Stuffed zucchini         | ✅     | No change |
| Stuffed grape leaves     | Stuffed grape leaves     | ✅     | No change |
| Pickled cucumbers        | Pickled cucumbers        | ✅     | No change |
| Pickled turnips          | Pickled turnips          | ✅     | No change |
| Alfredo pasta            | Alfredo pasta            | ✅     | No change |
| Pasta with red sauce     | Pasta with red sauce     | ✅     | No change |
| Pasta with minced meat   | Pasta with minced meat   | ✅     | No change |
| Béchamel pasta           | Béchamel pasta           | ✅     | No change |
| Mac and cheese           | Mac and cheese           | ✅     | No change |
| Negresco pasta           | Negresco pasta           | ✅     | No change |
| Molokhia                 | Molokhia                 | ✅     | No change |
| Mombar                   | Mombar                   | ✅     | No change |
| Mandi                    | Mandi                    | ✅     | No change |
| Muhallebi                | Muhallebi                | ✅     | No change |

### **Phase 2: Missing Prepared Foods to Add**

| Food Name     | Ingredient String Strategy                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Edible game   | **NULL** - Complex preparation, ingredients vary widely                                                                  |
| Baklava       | Phyllo Pastry: 500 grams, Nuts: 200 grams, Ghee: 150 grams, Sugar: 200 grams, Water: 240 ml, Honey: 2 tablespoons        |
| Pizza         | Flour: 300 grams, Tomato Sauce: 100 ml, Mozzarella: 150 grams, Oil: 2 tablespoons, Yeast: 1 teaspoon, Salt: 1/2 teaspoon |
| Omelette eggs | Eggs: 100 grams, Oil: 1 tablespoon, Salt: 1/2 teaspoon, Black Pepper: 1/4 teaspoon                                       |
| Brown toast   | **NULL** - Brand-specific bread composition varies                                                                       |
| Foul medames  | Fava Beans: 200 grams, Oil: 2 tablespoons, Garlic: 10 grams, Lemon: 1 tablespoon, Salt: 1/2 teaspoon                     |
| White toast   | **NULL** - Brand-specific bread composition varies                                                                       |
| Vienna bread  | **NULL** - Brand-specific bread composition varies                                                                       |
| Basmati rice  | Basmati Rice: 200 grams, Water: 400 ml, Salt: 1 teaspoon, Oil: 1 tablespoon                                              |

### **Phase 3: Raw Ingredients to Add**

| Category       | Items                                                                                                                                                                                                                                                                                                                                                                                        | Ingredient String Strategy                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Vegetables** | Eggplant, Broccoli, Carrot, Garlic, Green pepper, Green hot pepper, Okra, Mushroom, Onion, White carrot, Red pepper, Red onion, Sweet potato, Tomato, Yellow pepper, Yellow potatoes, Beans, Beetroot, Red beet, Bell pepper, Cabbage, Orange carrot, Cucumber, Large eggplant, Local garlic, Chinese cabbage, Dry onion, Hot pepper, Mud potatoes, Red radish, White turnip, Green zucchini | **Simple format**: `[Item Name]: 100 grams` |
| **Fruits**     | Kiwi, Apple, Banana, Red grapes, Guava, Yellow lemon, Mango, Orange, Peach, Green pear, Pineapple, Sapote, Dragon fruit                                                                                                                                                                                                                                                                      | **Simple format**: `[Item Name]: 100 grams` |
| **Other**      | Egg                                                                                                                                                                                                                                                                                                                                                                                          | **Simple format**: `Egg: 50 grams`          |

**Note**: Raw ingredients get simple ingredient strings since they are single-component items.

## 🚀 **Implementation Phases**

### **Phase 1: Name Standardization** ✅

- **Scope**: Fix capitalization issues in existing items
- **Impact**: 1 item ("White Rice" → "White rice")
- **Risk**: Low - simple case change
- **Time**: 5 minutes

### **Phase 2: Remove Non-matching Items** ⚠️ **HIGH PRIORITY**

- **Scope**: Remove items that exist in `foodItemsSeed.ts` but NOT in `classes.txt`
- **Items to Remove**:
  - "Peanuts" (not in classes.txt)
  - "Cowpea in tomato sauce" (not in classes.txt)
- **Impact**: Database cleanup - items not recognized by ML model removed
- **Risk**: Medium - removes existing functionality but ensures ML compatibility
- **Time**: 10 minutes

### **Phase 3: Add Missing Prepared Foods** 📝

- **Scope**: Add missing prepared food items that exist in `classes.txt`
- **Ingredient String Policy**: Use `null` for items where ingredient composition is uncertain or brand-specific
- **Impact**: Database size increases
- **Risk**: Low - null values maintain data integrity
- **Time**: 20 minutes (reduced due to null strategy)

### **Phase 4: Add Raw Ingredients** 📝

- **Scope**: Add 49 raw ingredient items from `classes.txt`
- **Ingredient String Policy**: Simple format `[Item Name]: [Amount]` for single-component items
- **Impact**: Significant database size increase
- **Risk**: Low - simple single-ingredient items
- **Time**: 25 minutes (optimized with simple format)

### **Phase 5: Validation & Testing** 🧪

- **Scope**: Verify all 150 classes from `classes.txt` are covered and ONLY those classes
- **Impact**: Quality assurance
- **Risk**: Low
- **Time**: 15 minutes

## 📁 **Files to be Modified**

1. **Primary**: `/apps/server/seeds/foodItems/foodItemsSeed.ts`
2. **Documentation**: This migration plan document

## ⚠️ **Risks & Mitigation**

### **High Priority Risks**

| Risk                     | Impact | Mitigation                     |
| ------------------------ | ------ | ------------------------------ |
| Database corruption      | High   | Create backup before migration |
| ML model incompatibility | High   | Test with sample predictions   |
| Case sensitivity issues  | Medium | Double-check exact matches     |

### **Medium Priority Risks**

| Risk                    | Impact | Mitigation                            |
| ----------------------- | ------ | ------------------------------------- |
| Null ingredient strings | Low    | Acceptable - maintains data integrity |
| Performance impact      | Medium | Monitor database size                 |
| Data consistency        | Medium | Validate after each phase             |

## 🧪 **Testing Strategy**

### **Pre-Migration Tests**

1. Backup current database
2. Verify current seed works
3. Document current food item count

### **Post-Migration Tests**

1. Verify all 150 classes present
2. Test ML model predictions
3. Check database integrity
4. Validate ingredient string format (including null values)
5. Ensure no empty strings (use null instead)

### **Acceptance Criteria**

- [ ] All 150 items from classes.txt present in database
- [ ] **ONLY items from classes.txt present in database (no extra items)**
- [ ] Exact name matching (case-sensitive)
- [ ] All items have either valid ingredient strings OR null (no empty strings)
- [ ] No duplicate items
- [ ] ML model compatibility confirmed
- [ ] Removed items: "Peanuts", "Cowpea in tomato sauce"

## 📊 **Success Metrics**

| Metric              | Target      | Current | Status                        |
| ------------------- | ----------- | ------- | ----------------------------- |
| Total Food Items    | 150 exactly | 101     | 🔴 49 missing, 2 extra        |
| Exact Name Matches  | 150         | 149     | 🟡 1 case issue               |
| Raw Ingredients     | 49          | 0       | 🔴 All missing                |
| Prepared Foods      | 101         | 90      | 🟡 11 missing                 |
| **Items to Remove** | 0 extra     | 2       | 🔴 2 items not in classes.txt |

## 🔄 **Rollback Plan**

### **If Issues Occur**

1. **Stop Migration**: Immediately halt the process
2. **Restore Backup**: Use pre-migration database backup
3. **Analyze Issue**: Identify root cause
4. **Revise Plan**: Update migration strategy
5. **Retry**: Execute revised plan

### **Rollback Triggers**

- Database corruption detected
- ML model compatibility fails
- Performance degradation observed
- Data integrity issues found

## 📝 **Change Log**

| Date       | Version | Changes                        | Author       |
| ---------- | ------- | ------------------------------ | ------------ |
| 2025-07-05 | 1.0     | Initial migration plan created | AI Assistant |

## 🎯 **Next Steps**

1. **Review & Approve**: Get stakeholder approval for migration plan
2. **Backup Data**: Create comprehensive database backup
3. **Phase 1 Execution**: Fix name standardization
4. **Phase 2 Execution**: **Remove non-matching items (HIGH PRIORITY)**
5. **Phase 3 Execution**: Add missing prepared foods
6. **Phase 4 Execution**: Add raw ingredients
7. **Phase 5 Execution**: Final validation - ensure ONLY classes.txt items exist
8. **Testing**: Comprehensive validation
9. **Documentation**: Update all related documentation

---

**⚡ Ready to Execute**: This plan ensures strict compliance with `classes.txt` - the ML model's single source of truth. Any item not in `classes.txt` will be removed to guarantee perfect model compatibility.

