const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseContent = document.querySelector('.recipe-close-btn');

// Function to fetch recipes from the API
const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = '<h2>Fetching Recipes...</h2>';

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        // Clear previous results
        recipeContainer.innerHTML = '';

        if (data.meals) {
            data.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}</span> Dish</p>
                    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
                `;

                const button = document.createElement('button');
                button.textContent = "View Recipe";
                recipeDiv.appendChild(button);

                // Adding event listener to the recipe button
                button.addEventListener('click', () => {
                    openRecipePopup(meal);
                });

                recipeContainer.appendChild(recipeDiv);
            });
        } else {
            recipeContainer.innerHTML = 'No recipes found. Please try another search.';
        }
    } catch (error) {
        recipeContainer.innerHTML = 'An error occurred while fetching recipes.';
        console.error(error);
    }
};

// Function to fetch ingredients from the meal object
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredientList += `<li>${measure ? measure : ''} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientList;
};

// Function to open the recipe popup
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

// Close popup event listener
recipeCloseContent.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});

// Event listener for search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (searchInput) {
        fetchRecipe(searchInput);
    } else {
        console.warn('Please enter a search term');
    }
});
