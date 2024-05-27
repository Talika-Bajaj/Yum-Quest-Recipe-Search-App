const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const filterBtn = document.getElementById('filter');
const filters = document.querySelector('.filter-options');
const allCuisines = document.querySelectorAll('.cuisine-name');
const searchHeading = document.getElementById('search-heading');
const cards = document.getElementById('cards');
const close = document.getElementById('close');
const message = document.getElementById('message');
var apiURL;
const firstPart = 'https://api.edamam.com/api/recipes/v2?type=public&';
const apiKey = '&app_id=d3f2e962&app_key=68398202cbefbf1001f05c1219a0606a';
const lastPart = '&imageSize=SMALL&random=true';

//to display cuisines on click
for (let index = 0; index < allCuisines.length; index++) {
    const element = allCuisines[index];
    // console.log(element);

    element.onclick = function () {
        let selectedCuisine = element.firstElementChild.textContent
        console.log(selectedCuisine);
        fetchRecipe(selectedCuisine);
    }
}

//function to display based on cuisine selected
async function fetchRecipe(cuisine) {
    apiURL = `${firstPart}${apiKey}&cuisineType=${cuisine}${lastPart}`;
    let finalUrl = await fetch(apiURL);
    let data = await finalUrl.json();
    // console.log(data);
    let recipes = data.hits;
    // console.log(recipes);

    searchHeading.textContent = cuisine;

    cards.innerHTML = '';
    recipes.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <div class="show-image">
        <img src="${item.recipe.images.SMALL.url}" alt="">
    </div>
    <div class="show-data">
        <h3 class="dish-label"><a href = '${item.recipe.url}' target='_blank'>${item.recipe.label}</a></h3>
        </a>
        <p class="calories"><span>Calories: </span>${Math.round(item.recipe.calories)} kcal</p>
        <p class="mealType"><span>Meal: </span>${item.recipe.mealType}</p>
        <p class="dishType"><span>Dish: </span>${item.recipe.dishType}</p>
        </div>
        `;

        cards.appendChild(card);
    })
}


//search btn - magnify
searchBtn.addEventListener('click', setUrl);


//show/hide filter options
filterBtn.addEventListener('click', () => {
    if (filters.style.display == 'grid') {
        filters.style.display = 'none';
    } else {
        filters.style.display = 'grid';
    }
})

//close filter options box
close.addEventListener('click', () => {
    filters.style.display = 'none';
})

//clear selected radio buttons
clear.addEventListener('click', () => {
    let clearRadios = document.querySelectorAll('input[type="radio"]:checked');
    clearRadios.forEach(clear => {
        clear.checked = false;
    })
});

//to display japanese cuisine
async function searchRecipe() {
    apiURL = `${firstPart}${apiKey}&cuisineType=Japanese${lastPart}`;
    let finalUrl = await fetch(apiURL);
    let data = await finalUrl.json();
    // console.log(data);
    let recipes = data.hits;

    cards.innerHTML = '';
    recipes.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <div class="show-image">
        <img src="${item.recipe.images.SMALL.url}" alt="">
    </div>
    <div class="show-data">
        <h3 class="dish-label"><a href = '${item.recipe.url}' target='_blank'>${item.recipe.label}</a></h3>
        </a>
        <p class="calories"><span>Calories: </span>${Math.round(item.recipe.calories)} kcal</p>
        <p class="mealType"><span>Meal: </span>${item.recipe.mealType}</p>
        <p class="dishType"><span>Dish: </span>${item.recipe.dishType}</p>
        </div>
        `;

        cards.appendChild(card);
    })
}

searchRecipe();


//filter search btn 
document.getElementById('filter-search').addEventListener('click', setUrl);


//function to create url based on values given
async function createUrl() {
    const params = [];

    const searchInput = document.getElementById('search').value.trim();
    // Check if search input is not empty
    if (searchInput !== '') {
        params.push(`q=${encodeURIComponent(searchInput)}`);
        searchHeading.innerHTML = `Search Results for: <span>${searchInput}</span>`;

    }

    // Find all selected radio buttons
    const selectedRadios = document.querySelectorAll('input[type="radio"]:checked');
    let selectedFilters = '';
    // Iterate over selected radios to construct the parameters object
    selectedRadios.forEach(radio => {
        const filterName = radio.name;
        const filterValue = radio.value;
        params.push(`${encodeURIComponent(filterName)}=${encodeURIComponent(filterValue)}`);
        selectedFilters += `${filterValue} `;

    });

    if (searchInput || selectedRadios.length > 0) {
        searchHeading.innerHTML = `Search Results for: <span>${searchInput}  ${selectedFilters.trim()}`;
        message.textContent = '';
    } else {
        // searchHeading.textContent = '';
        message.innerHTML = `<em>Please enter a search term or select a filter option.</em>`;
        return null;
    }


    // Construct the query string
    const queryString = params.join('&');
    if (!queryString) {
        // console.log('nooooooo');
        return null;
    }

    const url = `${firstPart}${queryString}${apiKey}${lastPart}`;
    return url;
}

//function to fetch details from the api
async function fetchUrl(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);  // Output the fetched data to console, or use it as needed
        let recipes = data.hits;
        if (response.status === 200 && recipes.length !== 0) {

            cards.innerHTML = '';
            recipes.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                        <div class="show-image">
                        <img src="${item.recipe.images.SMALL.url}" alt="${item.recipe.label}">
                        </div>
                        <div class="show-data">
                        <h3 class="dish-label"><a href = '${item.recipe.url}' target='_blank'>${item.recipe.label}</a></h3>
                        </a>
                        <p class="calories"><span>Calories: </span>${Math.round(item.recipe.calories)} kcal</p>
                        <p class="mealType"><span>Meal: </span>${item.recipe.mealType}</p>
                        <p class="dishType"><span>Dish: </span>${item.recipe.dishType}</p>
                        </div>
                        `

                cards.appendChild(card);
            })
        } else if (response.status == 200 && recipes.length == 0) {
            // console.log('error');
            cards.innerHTML = `<h2>Recipe Not Found!</h2>`;
            document.querySelector('.content').style.flexDirection = 'column';
            document.querySelector('.dishes').style.gridTemplateColumns = 'auto auto auto auto';
            document.querySelector('.famous-recipes').style.display = 'none';
        }
        else {
            cards.innerHTML = `<h2>Error Fetching Recipe </h2>`;
            document.querySelector('.content').style.flexDirection = 'column';
            document.querySelector('.dishes').style.gridTemplateColumns = 'auto auto auto auto';
            document.querySelector('.famous-recipes').style.display = 'none';
        }

    } catch (error) {
        console.error('Error fetching the data:', error);
    }
}

//creating the url and fetching details from it
async function setUrl() {
    const url = await createUrl();
    // let data = await url.json();
    console.log(url);
    if (url) {
        console.log(url);  // Output the URL to console, or use it as needed
        // console.log(data);
        await fetchUrl(url);

    } else {
        console.log('none selected');  // Output the URL to console, or use it as needed

    }
}