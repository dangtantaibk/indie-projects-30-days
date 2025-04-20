// Sample recipe database (in a real app, this would be much larger or fetched from an API)
const recipeDatabase = [
    {
        name: "Spinach and Cheese Omelet",
        description: "A quick and nutritious breakfast option that's high in protein and vitamins.",
        mainIngredients: ["eggs", "spinach", "cheese"],
        allIngredients: ["eggs", "spinach", "cheese", "salt", "pepper", "butter"],
        tags: ["breakfast", "quick", "high-protein"],
        dietaryInfo: ["vegetarian", "gluten-free", "low-carb"]
    },
    {
        name: "Cheesy Egg Muffins",
        description: "Portable egg muffins that can be made ahead for a grab-and-go breakfast option.",
        mainIngredients: ["eggs", "cheese", "spinach"],
        allIngredients: ["eggs", "cheese", "spinach", "bell peppers", "salt", "pepper"],
        tags: ["breakfast", "meal-prep", "portable"],
        dietaryInfo: ["vegetarian", "gluten-free", "low-carb"]
    },
    {
        name: "Baked Spinach Egg Cups",
        description: "Individual portions of baked eggs with spinach and cheese for a fancy brunch.",
        mainIngredients: ["eggs", "spinach", "cheese"],
        allIngredients: ["eggs", "spinach", "cheese", "cream", "nutmeg", "salt", "pepper"],
        tags: ["brunch", "entertaining"],
        dietaryInfo: ["vegetarian", "gluten-free", "low-carb"]
    },
    {
        name: "Avocado Toast with Egg",
        description: "Creamy avocado on toast topped with a fried egg - the perfect brunch!",
        mainIngredients: ["avocado", "bread", "eggs"],
        allIngredients: ["avocado", "bread", "eggs", "salt", "pepper", "red pepper flakes", "olive oil"],
        tags: ["breakfast", "brunch", "trendy"],
        dietaryInfo: ["vegetarian"]
    },
    {
        name: "Pasta Carbonara",
        description: "Creamy pasta with eggs, cheese, and bacon - an Italian classic.",
        mainIngredients: ["pasta", "eggs", "cheese", "bacon"],
        allIngredients: ["pasta", "eggs", "parmesan cheese", "bacon", "black pepper", "salt"],
        tags: ["dinner", "italian", "quick"],
        dietaryInfo: []
    },
    {
        name: "Tomato and Cheese Sandwich",
        description: "A simple but delicious sandwich that's perfect for lunch.",
        mainIngredients: ["bread", "tomato", "cheese"],
        allIngredients: ["bread", "tomato", "cheese", "mayonnaise", "salt", "pepper", "lettuce"],
        tags: ["lunch", "sandwich", "quick"],
        dietaryInfo: ["vegetarian"]
    },
    {
        name: "Sweet Banana Smoothie",
        description: "A refreshing smoothie that's perfect for breakfast or a snack.",
        mainIngredients: ["banana", "milk", "honey"],
        allIngredients: ["banana", "milk", "honey", "ice", "cinnamon"],
        tags: ["breakfast", "snack", "drink"],
        dietaryInfo: ["vegetarian", "gluten-free"]
    },
    {
        name: "Chicken Stir-fry",
        description: "A quick and healthy stir-fry with chicken and mixed vegetables.",
        mainIngredients: ["chicken", "bell pepper", "onion", "broccoli"],
        allIngredients: ["chicken breast", "bell pepper", "onion", "broccoli", "soy sauce", "garlic", "ginger", "oil"],
        tags: ["dinner", "asian", "quick"],
        dietaryInfo: []
    },
    {
        name: "Veggie Stir-fry",
        description: "A colorful vegetable stir-fry that's both healthy and delicious.",
        mainIngredients: ["bell pepper", "broccoli", "carrot", "onion"],
        allIngredients: ["bell pepper", "broccoli", "carrot", "onion", "garlic", "ginger", "soy sauce", "oil"],
        tags: ["dinner", "asian", "quick"],
        dietaryInfo: ["vegetarian", "vegan", "gluten-free"]
    },
    {
        name: "Mac and Cheese",
        description: "Comforting macaroni and cheese - the ultimate comfort food.",
        mainIngredients: ["pasta", "cheese", "milk"],
        allIngredients: ["pasta", "cheddar cheese", "milk", "butter", "flour", "salt", "pepper"],
        tags: ["dinner", "comfort food", "kid-friendly"],
        dietaryInfo: ["vegetarian"]
    }
];

// Process user input and return recipe suggestions
function processUserInput(userInput, dietaryPreferences = []) {
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    
    // Parse ingredients from user input
    const ingredients = parseIngredients(userInput);
    
    // Simulate API delay
    setTimeout(() => {
        if (ingredients.length === 0) {
            removeTypingIndicator(typingIndicator);
            addMessage("I couldn't identify any ingredients in your message. Please list ingredients separated by commas, like 'eggs, cheese, spinach'.", 'bot');
            return;
        }
        
        // Find matching recipes
        const recipes = findRecipes(ingredients, dietaryPreferences);
        
        removeTypingIndicator(typingIndicator);
        
        if (recipes.length === 0) {
            addMessage(`I couldn't find any recipes that match your ingredients (${ingredients.join(', ')}) and dietary preferences. Try adding some protein or vegetables to get more suggestions!`, 'bot');
        } else {
            // Display recipes (max 3)
            addMessage(recipes.slice(0, 3), 'bot');
        }
    }, 1500); // Simulate thinking time of 1.5 seconds
}

// Parse ingredients from user input
function parseIngredients(input) {
    // Remove common phrases that indicate ingredients listing
    const cleanedInput = input.toLowerCase()
        .replace(/i have/g, '')
        .replace(/i've got/g, '')
        .replace(/in my pantry/g, '')
        .replace(/in my fridge/g, '')
        .replace(/in my kitchen/g, '')
        .replace(/in my refrigerator/g, '')
        .replace(/available/g, '');
    
    // Split by common separators (commas, and, &, plus)
    let ingredients = cleanedInput
        .split(/,|\sand\s|\s&\s|\splus\s/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    
    // Further clean up each ingredient (remove articles, etc.)
    ingredients = ingredients.map(item => 
        item.replace(/^(a|an|the|some)\s+/g, '')
    );
    
    return ingredients;
}

// Find recipes that match the ingredients
function findRecipes(userIngredients, dietaryPreferences = []) {
    // Score recipes based on how many ingredients match
    const scoredRecipes = recipeDatabase.map(recipe => {
        const matchedIngredients = userIngredients.filter(ingredient => 
            recipe.allIngredients.some(recipeIngredient => 
                recipeIngredient.includes(ingredient) || ingredient.includes(recipeIngredient)
            )
        );
        
        const score = {
            // Primary score: number of matched main ingredients
            mainIngredientsMatched: userIngredients.filter(ingredient => 
                recipe.mainIngredients.some(mainIngredient => 
                    mainIngredient.includes(ingredient) || ingredient.includes(mainIngredient)
                )
            ).length,
            
            // Secondary score: total matched ingredients
            totalIngredientsMatched: matchedIngredients.length,
            
            // Percentage of recipe main ingredients that are matched
            mainIngredientCoverage: recipe.mainIngredients.length > 0 ? 
                userIngredients.filter(ingredient => 
                    recipe.mainIngredients.some(mainIngredient => 
                        mainIngredient.includes(ingredient) || ingredient.includes(mainIngredient)
                    )
                ).length / recipe.mainIngredients.length : 0
        };
        
        // Check dietary preferences
        const meetsPreferences = dietaryPreferences.length === 0 || 
            dietaryPreferences.every(pref => recipe.dietaryInfo.includes(pref));
        
        return {
            recipe,
            score,
            meetsPreferences
        };
    });
    
    // Filter recipes that have at least one main ingredient match and meet dietary preferences
    const filteredRecipes = scoredRecipes.filter(item => 
        item.score.mainIngredientsMatched > 0 && item.meetsPreferences
    );
    
    // Sort by main ingredient matches (desc), then by main ingredient coverage (desc), then by total matches (desc)
    filteredRecipes.sort((a, b) => {
        if (b.score.mainIngredientsMatched !== a.score.mainIngredientsMatched) {
            return b.score.mainIngredientsMatched - a.score.mainIngredientsMatched;
        }
        if (b.score.mainIngredientCoverage !== a.score.mainIngredientCoverage) {
            return b.score.mainIngredientCoverage - a.score.mainIngredientCoverage;
        }
        return b.score.totalIngredientsMatched - a.score.totalIngredientsMatched;
    });
    
    // Return only the recipe objects
    return filteredRecipes.map(item => item.recipe);
}

// Export functions for use in other files
window.processUserInput = processUserInput;