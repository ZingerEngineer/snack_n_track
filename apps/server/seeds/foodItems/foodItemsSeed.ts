import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "FoodItem" RESTART IDENTITY CASCADE;'
    )
    console.log('FoodItem table truncated and sequence reset successfully.')
  } catch (error) {
    console.error('Error resetting FoodItem table:', error)
    throw error
  }
  const foods = [
    {
      foodName: 'White rice',
      ingredientString:
        'Rice: 200 grams, Water: 200 ml, Salt: 1 teaspoon, Oil: 2 tablespoons'
    },
    {
      foodName: 'Rice with vermicelli',
      ingredientString:
        'Rice: 200 grams, Vermicelli: 20 grams, Water: 200 ml, Salt: 1 teaspoon, Oil: 2 tablespoons'
    },
    {
      foodName: 'Rice with lentils',
      ingredientString:
        'Rice: 200 grams, Yellow Lentils: 100 grams, Water: 200 ml, Salt: 1 teaspoon, Oil: 2 tablespoons'
    },
    {
      foodName: 'Rice pudding',
      ingredientString:
        'Rice: 100 grams, Milk: 1000 ml, Sugar: 60 grams, Vanilla: 1 teaspoon, Coconut: 2 tablespoons'
    },
    {
      foodName: 'Umm Ali',
      ingredientString:
        'Puff Pastry: 150 grams, Milk: 1000 ml, Sugar: 60 grams, Raisins: 50 grams, Nuts: 30 grams, Cinnamon: 1/2 teaspoon, Cream: 25 grams'
    },
    { foodName: 'Edible game', ingredientString: null },
    {
      foodName: 'Baba ghanoush',
      ingredientString:
        'Eggplant: 300 grams, Tahini: 30 grams, Lemon: 1 tablespoon, Garlic: 5 grams, Salt: 1/2 teaspoon, Olive Oil: 1 tablespoon, Black Pepper: 1/4 teaspoon'
    },
    {
      foodName: 'Rolled eggplant',
      ingredientString:
        'Eggplant: 400 grams, Onion: 100 grams, Tomatoes: 200 grams, Oil: 200 grams, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1/2 teaspoon'
    },
    {
      foodName: 'Okra in tomato sauce',
      ingredientString:
        'Okra: 500 grams, Tomatoes: 600 grams, Onion: 100 grams, Garlic: 10 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Lemon: 1 tablespoon'
    },
    {
      foodName: 'Basbousa',
      ingredientString:
        'Semolina: 500 grams, Sugar: 420 grams, Ghee: 150 grams, Yogurt: 150 ml, Baking Powder: 1 teaspoon, Vanilla: 1 teaspoon, Coconut: 30 grams, Almonds: 30 grams'
    },
    {
      foodName: 'Biscuit',
      ingredientString:
        'Flour: 1000 grams, Butter: 600 grams, Sugar: 400 grams, Eggs: 200 grams, Vanilla: 1 teaspoon, Baking Powder: 1/2 teaspoon, Milk: 75 ml'
    },
    {
      foodName: 'Peas in tomato sauce',
      ingredientString:
        'Peas: 500 grams, Tomatoes: 500 grams, Onion: 100 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Bissara',
      ingredientString:
        'Split Fava Beans: 200 grams, Onion: 100 grams, Garlic: 15 grams, Oil: 2 tablespoons, Salt: 1/2 teaspoon, Black Pepper: 1/4 teaspoon, Green Coriander: 20 grams'
    },
    {
      foodName: 'Duck with orange',
      ingredientString:
        'Duck: 3500 grams, Orange Juice: 240 ml, Honey: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Grilled stuffed duck',
      ingredientString:
        'Duck: 3500 grams, Rice: 400 grams, Onion: 100 grams, Garlic: 15 grams, Ghee: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Boiled potatoes',
      ingredientString:
        'Potatoes: 600 grams, Salt: 1 teaspoon, Olive Oil: 1 tablespoon, Lemon Juice: 1 teaspoon'
    },
    {
      foodName: 'French fries',
      ingredientString:
        'Potatoes: 600 grams, Oil: 200 grams, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Baklava',
      ingredientString:
        'Phyllo Pastry: 400 grams, Nuts: 200 grams, Ghee: 200 grams, Sugar: 300 grams, Water: 200 ml, Lemon Juice: 1 tablespoon'
    },
    {
      foodName: 'Balah el sham',
      ingredientString:
        'Flour: 250 grams, Ghee: 100 grams, Eggs: 100 grams, Vanilla: 1 teaspoon, Water: 120 ml, Oil: 200 grams'
    },
    {
      foodName: 'Pizza',
      ingredientString:
        'Flour: 300 grams, Water: 200 ml, Yeast: 1 teaspoon, Salt: 1 teaspoon, Oil: 2 tablespoons, Tomato Sauce: 100 grams, Cheese: 100 grams'
    },
    {
      foodName: 'Omelette eggs',
      ingredientString: 'Eggs: 150 grams, Oil: 1 tablespoon, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Eggs with pastrami',
      ingredientString: 'Eggs: 100 grams, Pastrami: 30 grams, Oil: 1 teaspoon'
    },
    {
      foodName: 'Boiled eggs',
      ingredientString: 'Eggs: 100 grams, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Tuna',
      ingredientString:
        'Tuna: 160 grams, Vinegar: 1 tablespoon, Lemon: 1 teaspoon'
    },
    { foodName: 'White cheese', ingredientString: 'White Cheese: 100 grams' },
    {
      foodName: 'Roquefort cheese',
      ingredientString: 'Roquefort Cheese: 100 grams'
    },
    { foodName: 'Romano cheese', ingredientString: 'Romano Cheese: 100 grams' },
    {
      foodName: 'Cheddar cheese',
      ingredientString: 'Cheddar Cheese: 100 grams'
    },
    {
      foodName: 'Cottage cheese',
      ingredientString: 'Cottage cheese: 100 grams'
    },
    {
      foodName: 'Goulash with meat',
      ingredientString:
        'Goulash: 1000 grams, Minced Meat: 1000 grams, Onion: 100 grams, Ghee: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Milk: 300 ml, Eggs: 100 grams'
    },
    {
      foodName: 'Shrimp',
      ingredientString:
        'Shrimp: 300 grams, Olive Oil: 1 tablespoon, Lemon: 1 teaspoon, Salt: 1/2 teaspoon, Black Pepper: 1/4 teaspoon'
    },
    {
      foodName: 'Jelly',
      ingredientString: 'Jelly: 80 grams, Water: 400 ml, Sugar: 2 tablespoons'
    },
    {
      foodName: 'Grilled stuffed pigeon',
      ingredientString:
        'Pigeon: 400 grams, Rice: 100 grams, Onion: 100 grams, Ghee: 1 tablespoon, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Chickpeas',
      ingredientString:
        'Chickpeas: 200 grams, Tahini: 2 tablespoons, Lemon: 1 tablespoon, Olive Oil: 1 tablespoon, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Hawawshi',
      ingredientString:
        'Baladi Bread: 170 grams, Minced Meat: 300 grams, Onion: 100 grams, Green Pepper: 50 grams, Spices: 1/2 teaspoon, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Chicken with freekeh',
      ingredientString:
        'Chicken: 1500 grams, Freekeh: 150 grams, Onion: 100 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Breaded chicken',
      ingredientString:
        'Chicken: 300 grams, Flour: 60 grams, Eggs: 100 grams, Breadcrumbs: 50 grams, Oil: 200 grams, Salt: 1/2 teaspoon, Black Pepper: 1/4 teaspoon'
    },
    {
      foodName: 'Stuffed chicken',
      ingredientString:
        'Chicken: 1500 grams, Rice: 300 grams, Onion: 100 grams, Ghee: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Boiled chicken',
      ingredientString:
        'Chicken: 1500 grams, Salt: 1 teaspoon, Black Pepper: 1/4 teaspoon, Lemon: 50 grams'
    },
    {
      foodName: 'Grilled chicken',
      ingredientString:
        'Chicken: 1500 grams, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1 teaspoon, Garlic: 15 grams'
    },
    {
      foodName: 'Green olives',
      ingredientString:
        'Green Olives: 1000 grams, Lemon: 400 grams, Chili: 200 grams, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Spinach in tomato sauce',
      ingredientString:
        'Spinach: 500 grams, Tomatoes: 500 grams, Onion: 100 grams, Garlic: 15 grams, Oil: 1 tablespoon, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Grilled steak',
      ingredientString:
        'Steak Meat: 400 grams, Olive Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Garlic: 2 cloves, Butter: 1 tablespoon'
    },
    {
      foodName: 'Sausage',
      ingredientString:
        'Sausage: 500 grams, Onion: 100 grams, Tomatoes: 200 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1/2 teaspoon'
    },
    {
      foodName: 'Quail',
      ingredientString:
        'Quail: 400 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Lemon Juice: 1 tablespoon, Spices: 1/2 teaspoon'
    },
    {
      foodName: 'Samosa',
      ingredientString:
        'Flour: 1000 grams, Oil: 4 tablespoons, Minced Meat: 800 grams'
    },
    {
      foodName: 'Fish',
      ingredientString:
        'Fish: 200 grams, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Lemon Juice: 1 tablespoon'
    },
    {
      foodName: 'Sushi',
      ingredientString:
        'Sushi Rice: 1 cup (200 grams), Fish: 100 grams, Nori: 2 sheets, Rice Vinegar: 2 tablespoons, Sugar: 1 teaspoon, Salt: 1/4 teaspoon'
    },
    {
      foodName: 'Chicken shawarma',
      ingredientString:
        'Chicken: 300 grams, Onion: 100 grams, Tomatoes: 200 grams, Garlic: 15 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1 teaspoon'
    },
    {
      foodName: 'Beef shawarma',
      ingredientString:
        'Meat: 300 grams, Onion: 100 grams, Tomatoes: 200 grams, Garlic: 15 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1 teaspoon'
    },
    {
      foodName: 'Chicken strips',
      ingredientString:
        'Chicken: 300 grams, Oil: 2 tablespoons, Salt: 1/2 teaspoon, Black Pepper: 1/4 teaspoon, Lemon: 1 tablespoon, Garlic: 10 grams'
    },
    {
      foodName: 'Vermicelli',
      ingredientString:
        'Vermicelli: 100 grams, Ghee: 2 tablespoons, Chicken Broth: 400 ml, Salt: 1/2 teaspoon, Black Pepper: 1/4 teaspoon'
    },
    {
      foodName: 'Shakshuka',
      ingredientString:
        'Eggs: 100 grams, Tomatoes: 300 grams, Onion: 100 grams, Green Pepper: 100 grams, Garlic: 10 grams, Oil: 2 tablespoons, Salt: 1/2 teaspoon, Black Pepper: 1/4 teaspoon'
    },
    {
      foodName: "Zeinab's fingers",
      ingredientString:
        'Flour: 250 grams, Ghee: 100 grams, Sugar: 100 grams, Baking Powder: 1/2 teaspoon, Oil: 200 grams'
    },
    {
      foodName: 'Stuffed potato casserole',
      ingredientString:
        'Potatoes: 600 grams, Minced Meat: 200 grams, Onion: 100 grams, Tomatoes: 200 grams, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1/2 teaspoon, Oil: 2 tablespoons'
    },
    {
      foodName: 'Yellow lentils',
      ingredientString:
        'Yellow Lentils: 200 grams, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Oil: 2 tablespoons'
    },
    {
      foodName: 'Black lentils',
      ingredientString:
        'Lentils with Pasta: 200 grams, Onion: 100 grams, Garlic: 15 grams, Tomatoes: 200 grams, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Oil: 2 tablespoons'
    },
    {
      foodName: 'Baladi bread',
      ingredientString:
        'Flour: 375 grams, Yeast: 1 teaspoon, Sugar: 1 teaspoon, Salt: 1 teaspoon, Oil: 2 tablespoons'
    },
    {
      foodName: 'Fasolya in tomato sauce',
      ingredientString:
        'Beans: 500 grams, Tomatoes: 200 grams, Onion: 100 grams, Garlic: 10 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'White beans',
      ingredientString:
        'White Beans: 1 cup (200 grams), Water: 4 cups (800 ml), Onion: 1 piece (100 grams), Garlic: 2 cloves (10 grams), Tomatoes: 2 pieces (200 grams), Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Oil: 2 tablespoons'
    },
    {
      foodName: 'Chicken fajita',
      ingredientString:
        'Chicken: 300 grams, Bell Pepper: 200 grams, Onion: 100 grams, Tomatoes: 200 grams, Garlic: 20 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1 teaspoon'
    },
    {
      foodName: 'Eastern pie',
      ingredientString:
        'Flour: 375 grams, Ghee: 100 grams, Salt: 1/2 teaspoon, Sugar: 1 teaspoon'
    },
    {
      foodName: 'Layered pie',
      ingredientString:
        'Flour: 375 grams, Ghee: 100 grams, Salt: 1/2 teaspoon, Sugar: 1 teaspoon'
    },
    {
      foodName: 'Brown toast',
      ingredientString: null
    },
    {
      foodName: 'Foul medames',
      ingredientString:
        'Fava Beans: 200 grams, Olive Oil: 2 tablespoons, Lemon Juice: 1 tablespoon, Garlic: 10 grams, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Qatayef',
      ingredientString:
        'Flour: 250 grams, Yeast: 1 teaspoon, Sugar: 1 teaspoon, Oil: 50 grams, Nuts: 30 grams'
    },
    {
      foodName: 'Crab',
      ingredientString:
        'Crab: 500 grams, Garlic: 10 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Lemon: 1 tablespoon'
    },
    {
      foodName: 'Calamari squid',
      ingredientString:
        'Calamari squid: 300 grams, Lemon Juice: 1 tablespoon, Salt: 1/2 teaspoon, Black Pepper: 1/4 teaspoon, Garlic: 15 grams, Oil: 2 tablespoons'
    },
    {
      foodName: 'Kebab stew',
      ingredientString:
        'Meat: 500 grams, Onion: 100 grams, Tomatoes: 200 grams, Garlic: 15 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1 teaspoon'
    },
    {
      foodName: 'Liver',
      ingredientString:
        'Liver: 500 grams, Bell Pepper: 200 grams, Garlic: 15 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1 teaspoon'
    },
    {
      foodName: 'Kahk',
      ingredientString:
        'Flour: 1000 grams, Ghee: 500 grams, Sugar: 2 tablespoons, Sesame: 1 teaspoon'
    },
    {
      foodName: 'Kofta',
      ingredientString:
        'Minced Meat: 500 grams, Onion: 100 grams, Garlic: 15 grams, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon, Spices: 1 teaspoon'
    },
    {
      foodName: 'Kunafa',
      ingredientString:
        'Kunafa: 500 grams, Ghee: 200 grams, Sugar: 200 grams, Water: 240 ml'
    },
    {
      foodName: 'Cordon bleu',
      ingredientString:
        'Chicken: 300 grams, Cheddar Cheese: 50 grams, Turkey: 50 grams, Eggs: 100 grams, Flour: 60 grams, Breadcrumbs: 100 grams, Oil: 200 grams'
    },
    {
      foodName: 'White toast',
      ingredientString: null
    },
    {
      foodName: 'Zucchini in tomato sauce',
      ingredientString:
        'Zucchini: 1000 grams, Tomatoes: 1000 grams, Onion: 100 grams, Garlic: 15 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Coleslaw',
      ingredientString:
        'Green Cabbage: 300 grams, Carrot: 150 grams, Mayonnaise: 120 grams, Vinegar: 1 tablespoon, Sugar: 1 teaspoon, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Vienna bread',
      ingredientString: null
    },
    {
      foodName: 'Boiled meat',
      ingredientString:
        'Meat: 500 grams, Onion: 100 grams, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Meat in tomato sauce',
      ingredientString:
        'Meat: 500 grams, Tomatoes: 300 grams, Onion: 100 grams, Garlic: 15 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Basmati rice',
      ingredientString:
        'Basmati Rice: 200 grams, Water: 200 ml, Salt: 1 teaspoon, Oil: 2 tablespoons'
    },
    {
      foodName: 'Orzo',
      ingredientString:
        'Orzo: 200 grams, Chicken Broth: 480 ml, Oil: 1 tablespoon, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Lobya in tomato sauce',
      ingredientString:
        'Beans: 500 grams, Tomatoes: 200 grams, Onion: 100 grams, Garlic: 10 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Stuffed eggplant',
      ingredientString:
        'Eggplant: 1000 grams, Rice: 350 grams, Onion: 1 piece (100 grams), Tomatoes: 750 grams, Garlic: 30 grams, Oil: 2 tablespoons, Salt: 2 teaspoons, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Stuffed onions',
      ingredientString:
        'Onion: 400 grams, Rice: 100 grams, Tomatoes: 750 grams, Garlic: 30 grams, Oil: 2 tablespoons, Salt: 2 teaspoons, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Stuffed peppers',
      ingredientString:
        'Green Bell Pepper: 500 grams, Rice: 250 grams, Onion: 200 grams, Tomatoes: 750 grams, Garlic: 30 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Stuffed cabbage',
      ingredientString:
        'Cabbage: 1000 grams, Rice: 500 grams, Onion: 200 grams, Tomatoes: 750 grams, Garlic: 30 grams, Oil: 2 tablespoons, Salt: 3 teaspoons, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Stuffed zucchini',
      ingredientString:
        'Zucchini: 1000 grams, Rice: 350 grams, Onion: 200 grams, Tomatoes: 750 grams, Garlic: 30 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Stuffed grape leaves',
      ingredientString:
        'Grape Leaves: 500 grams, Rice: 250 grams, Onion: 200 grams, Tomatoes: 750 grams, Garlic: 30 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Pickled cucumbers',
      ingredientString:
        'Cucumber: 1000 grams, Salt: 3 teaspoons, Garlic: 20 grams, Chili: 1/2 teaspoon'
    },
    {
      foodName: 'Pickled turnips',
      ingredientString:
        'Turnip: 1000 grams, Salt: 3 teaspoons, Chili: 1/2 teaspoon'
    },
    {
      foodName: 'Alfredo pasta',
      ingredientString:
        'Pasta: 400 grams, Cream: 240 ml, Parmesan Cheese: 50 grams, Butter: 2 tablespoons, Mushroom: 50 grams, Chicken: 300 grams, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Pasta with red sauce',
      ingredientString:
        'Pasta: 400 grams, Tomatoes: 500 grams, Garlic: 15 grams, Oil: 2 tablespoons, Salt: 1/2 teaspoon, Black Pepper: 1/4 teaspoon'
    },
    {
      foodName: 'Pasta with minced meat',
      ingredientString:
        'Pasta: 400 grams, Minced Meat: 300 grams, Onion: 100 grams, Tomatoes: 500 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Black Pepper: 1/2 teaspoon'
    },
    {
      foodName: 'Bechamel pasta',
      ingredientString:
        'Pasta: 400 grams, Minced Meat: 300 grams, Onion: 100 grams, Milk: 1500 ml, Flour: 3 tablespoons, Ghee: 3 tablespoons, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Mac and cheese',
      ingredientString:
        'Pasta: 400 grams, Cheddar Cheese: 50 grams, Milk: 1000 ml, Butter: 2 tablespoons, Flour: 1 tablespoon, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Negresco pasta',
      ingredientString:
        'Pasta: 400 grams, Chicken: 500 grams, Onion: 100 grams, Milk: 1500 ml, Mozzarella Cheese: 50 grams, Flour: 3 tablespoons, Ghee: 3 tablespoons, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Molokhia',
      ingredientString:
        'Molokhia: 500 grams, Chicken Broth: 420 ml, Garlic: 30 grams, Oil: 2 tablespoons, Salt: 1/2 teaspoon'
    },
    {
      foodName: 'Mombar',
      ingredientString:
        'Tripe: 500 grams, Rice: 300 grams, Onion: 100 grams, Tomatoes: 200 grams, Garlic: 20 grams, Oil: 2 tablespoons, Salt: 1 teaspoon'
    },
    {
      foodName: 'Mandi',
      ingredientString:
        'Chicken: 1500 grams, Basmati Rice: 200 grams, Onion: 100 grams, Tomatoes: 200 grams, Oil: 2 tablespoons, Salt: 1 teaspoon, Spices: 1 teaspoon'
    },
    {
      foodName: 'Muhallebi',
      ingredientString:
        'Milk: 2000 ml, Sugar: 100 grams, Cornstarch: 2 tablespoons, Vanilla: 1 teaspoon'
    },
    { foodName: 'Pumpkin', ingredientString: null },
    { foodName: 'Eggplant', ingredientString: null },
    { foodName: 'Broccoli', ingredientString: null },
    { foodName: 'Carrot', ingredientString: null },
    { foodName: 'Garlic', ingredientString: null },
    { foodName: 'Green pepper', ingredientString: null },
    { foodName: 'Green hot pepper', ingredientString: null },
    { foodName: 'Kiwi', ingredientString: null },
    { foodName: 'Okra', ingredientString: null },
    { foodName: 'Mushroom', ingredientString: null },
    { foodName: 'Onion', ingredientString: null },
    { foodName: 'White carrot', ingredientString: null },
    { foodName: 'Red pepper', ingredientString: null },
    { foodName: 'Red onion', ingredientString: null },
    { foodName: 'Sweet potato', ingredientString: null },
    { foodName: 'Tomato', ingredientString: null },
    { foodName: 'Yellow pepper', ingredientString: null },
    { foodName: 'Yellow potatoes', ingredientString: null },
    { foodName: 'Apple', ingredientString: null },
    { foodName: 'Banana', ingredientString: null },
    { foodName: 'Beans', ingredientString: null },
    { foodName: 'Beetroot', ingredientString: null },
    { foodName: 'Red beet', ingredientString: null },
    { foodName: 'Bell pepper', ingredientString: null },
    { foodName: 'Cabbage', ingredientString: null },
    { foodName: 'Orange carrot', ingredientString: null },
    { foodName: 'Cucumber', ingredientString: null },
    { foodName: 'Dragon fruit', ingredientString: null },
    { foodName: 'Egg', ingredientString: null },
    { foodName: 'Large eggplant', ingredientString: null },
    { foodName: 'Local garlic', ingredientString: null },
    { foodName: 'Red grapes', ingredientString: null },
    { foodName: 'Guava', ingredientString: null },
    { foodName: 'Yellow lemon', ingredientString: null },
    { foodName: 'Mango', ingredientString: null },
    { foodName: 'Chinese cabbage', ingredientString: null },
    { foodName: 'Dry onion', ingredientString: null },
    { foodName: 'Orange', ingredientString: null },
    { foodName: 'Peach', ingredientString: null },
    { foodName: 'Green pear', ingredientString: null },
    { foodName: 'Hot pepper', ingredientString: null },
    { foodName: 'Pineapple', ingredientString: null },
    { foodName: 'Mud potatoes', ingredientString: null },
    { foodName: 'Red radish', ingredientString: null },
    { foodName: 'Sapote', ingredientString: null },
    { foodName: 'Banadora', ingredientString: null },
    { foodName: 'White turnip', ingredientString: null },
    { foodName: 'Green zucchini', ingredientString: null }
  ]

  for (const food of foods) {
    const existing = await prisma.foodItem.findUnique({
      where: { foodName: food.foodName }
    })
    if (!existing) {
      await prisma.foodItem.create({
        data: {
          foodName: food.foodName,
          ingredientString: food.ingredientString || ''
        }
      })
    }
  }

  console.log(`Seeded ${foods.length} food records successfully`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

