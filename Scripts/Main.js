const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');

// Function to fetch meals from API
function fetchMeals(query) {
    const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    return fetch(apiURL)
        .then(response => response.json())
        .then(data => data.meals || []); // Return empty array if no meals found
}

// Function to display meals
function displayMeals(meals) {
    resultsContainer.innerHTML = ''; // Clear previous results

    // Show up to 5 meals
    const mealsToShow = meals.slice(0, 5);
    mealsToShow.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal-card';
        mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>ID:</strong> ${meal.idMeal}</p>
            <p>${meal.strInstructions.substring(0, 100)}...</p>
        `;
        resultsContainer.appendChild(mealDiv);
    });

    // Add "SHOW ALL" button if more meals are available
    if (meals.length > 5) {
        const showAllButton = document.createElement('button');
        showAllButton.textContent = 'SHOW ALL';
        showAllButton.className = 'show-all-button'; // Assign a specific class for styling
        showAllButton.addEventListener('click', () => {
            resultsContainer.innerHTML = ''; // Clear the limited results
            meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.className = 'meal-card';
                mealDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p><strong>ID:</strong> ${meal.idMeal}</p>
                    <p>${meal.strInstructions.substring(0, 100)}...</p>
                `;
                resultsContainer.appendChild(mealDiv);
            });
        });
        resultsContainer.appendChild(showAllButton);
    }
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim(); // Get the search input value
    if (query) {
        fetchMeals(query).then(displayMeals); // Fetch and display meals
    } else {
        resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
    }
});
