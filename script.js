function searchRecipes() {
    const query = document.getElementById("query").value;

    // Replace 'YOUR_EDAMAM_APP_ID' and 'YOUR_EDAMAM_APP_KEY' with your Edamam API credentials
    const appId = 'b7d41da6';
    const appKey = '681dceb81d6f5149aeb21fe1be834b7d';
    const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${appId}&app_key=${appKey}`;

    // Make an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const recipes = JSON.parse(xhr.responseText);
            displayRecipes(recipes.hits);
        } else {
            alert(`Failed to fetch recipes. Status: ${xhr.status}`);
        }
    };

    xhr.send();
}

function displayRecipes(recipes) {
    const recipeListDiv = document.getElementById("recipeList");

    // Clear previous recipe list
    recipeListDiv.innerHTML = '';

    // Display recipes
    if (recipes.length > 0) {
        recipes.forEach(recipe => {
            const cardHtml = `
                <div class="card">
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                    <div class="card-header">${recipe.recipe.label}</div>
                    <div class="ingredients">
                        <h3>Ingredients:</h3>
                        <ul>
                            ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                     
                    <div class="instructions">
                        <h3>Instructions:</h3>
                        <p><a href="${recipe.recipe.url}" target="_blank">View Recipe</a></p>
                        <!-- You can add more instructions as needed -->
                    </div>
                </div>
            `;
            //<p>Calories: ${recipe.recipe.calories.toFixed(2)} kcal</p>       
            recipeListDiv.innerHTML += cardHtml;
        });
    } else {
        recipeListDiv.innerHTML = '<p>No recipes found with the specified query.</p>';
    }
}



