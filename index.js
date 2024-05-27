const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const filterBtn = document.getElementById('filter');
// const filterOptions = document.getElementById('filter-options');
const filters = document.querySelector('.filter-options');
// const mealOptions = document.getElementsByName('meal');
// const healthOptions = document.getElementsByName('health');
// const cuisineOptions = document.getElementsByName('cuisine');
// const clear = document.getElementById('clear');
// const filterSearch = document.getElementById('filter-search');
const allCuisines = document.querySelectorAll('.cuisine-name');
const cards = document.getElementById('cards');
// const radios = document.getElementsByClassName('radio');
var apiURL;
const firstPart = 'https://api.edamam.com/api/recipes/v2?type=public&';
const apiKey = '&app_id=d3f2e962&app_key=68398202cbefbf1001f05c1219a0606a';
// let question = 'q=';
// let healthURL = '&healthType=';
// let healthType;
// let cuisineURL = '&cuisineType=';
// let cuisineType;
// let mealURL = '&mealType=';
// let mealType;
const lastPart = '&imageSize=SMALL&random=true';

for (let index = 0; index < allCuisines.length; index++) {
    const element = allCuisines[index];
    // console.log(element);

    element.onclick = function () {
        let selectedCuisine = element.firstElementChild.textContent
        console.log(selectedCuisine);
        fetchRecipe(selectedCuisine);
    }
}

//search recipes
searchBtn.addEventListener('click', async () => {
    if (searchInput.value == '') {
        document.getElementById('msg').style.display = 'block';
    } else {
        document.getElementById('msg').style.display = 'none';
            
       
    }
})

// //show/hide filter options
filterBtn.addEventListener('click', () => {
    if (filters.style.display == 'grid') {
        filters.style.display = 'none';
    } else {
        filters.style.display = 'grid';
    }
})

// //Search the selected radio button values
// filterSearch.addEventListener('click', () => {
//     Array.from(healthOptions).forEach((health) => {
//         if (health.checked == true) {
//             // console.log(health.value);
//             let radioHealth = health.value;
//             // console.log(radioHealth);
//             let parent = document.getElementById('health-group').parentElement;
//     let child = parent.firstElementChild.textContent.toLowerCase();
//     // console.log(child);
//             filterSearchRecipe(child,health.value);
//         }
        
//     });
//     searchFilterOptions()

//     Array.from(cuisineOptions).forEach((cuisine) => {
//         if (cuisine.checked == true) {
//             // console.log(cuisine.value);
//             let radioCuisine = cuisine.value;
//             // console.log(radioCuisine);
//             let parent = document.getElementById('cuisine-group').parentElement;
//     let child = parent.firstElementChild.textContent.toLowerCase();
//     // console.log(child);
//             filterSearchRecipe(child,cuisine.value);
//             // searchFilterOptions(radioCuisine)
//         }
//     });

//     Array.from(mealOptions).forEach((meal) => {
//         if (meal.checked == true) {
//             // console.log(meal.value);
//             let radioMeal = meal.value;
//             // console.log(radioMeal);
//             let parent = document.getElementById('meal-group').parentElement;
//     let child = parent.firstElementChild.textContent.toLowerCase();
//     // console.log(child);
//     filterSearchRecipe(child,meal.value);
//     // searchFilterOptions(radioMeal);
//         }
//     });
// })

// //Clear Selected Radio Options
clear.addEventListener('click', () => {
    let clearRadios = document.querySelectorAll('input[type="radio"]:checked'); 
    clearRadios.forEach(clear => {
        clear.checked = false;
    })

    // Array.from(healthOptions).forEach((health) => {
    //     if (health.checked == true) {
    //         health.checked = false;
    //     }
    // });

    // Array.from(cuisineOptions).forEach((cuisine) => {
    //     if (cuisine.checked == true) {
    //         cuisine.checked = false;
    //     }
    // });

    // Array.from(mealOptions).forEach((meal) => {
    //     if (meal.checked == true) {
    //         meal.checked = false;
    //     }
    // });

    // radioSelected = [];
    // radioNameSelected = [];
});

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
        `

        cards.appendChild(card);
    })

}

searchRecipe();

async function fetchRecipe(cuisine) {
    // url = firstPart + apiKey + cuisineURL + cuisine + lastPart;
    apiURL = `${firstPart}${apiKey}&cuisineType=${cuisine}${lastPart}`;
    let finalUrl = await fetch(apiURL);
    let data = await finalUrl.json();
    // console.log(data);
    let recipes = data.hits;
    // console.log(recipes);

    document.querySelector('.cuisine-name-dish').textContent = cuisine;

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
        `

        cards.appendChild(card);
    })
}


// // async function fetchRecipeSearch(query) {

// //     console.log(query)
// //     // url = firstPart + apiKey + cuisineURL + cuisine + lastPart;
// //     url = firstPart + question + query + apiKey + lastPart;
// //     console.log(question, query, url);
// //     let finalUrl = await fetch(url);
// //     console.log(finalUrl.status);
// //     let data = await finalUrl.json();
// //     console.log(data);
// //     let recipes = data.hits;
// //     console.log(recipes);

// //     document.querySelector('.cuisine-name-dish').textContent = query;

// //     if (finalUrl.status === 200 && recipes.length !== 0) {

// //         cards.innerHTML = '';
// //         recipes.forEach((item) => {
// //             const card = document.createElement('div');
// //             card.className = 'card';
// //             card.innerHTML = `
// //             <div class="show-image">
// //             <img src="${item.recipe.images.SMALL.url}" alt="${item.recipe.label}">
// //             </div>
// //             <div class="show-data">
// //             <h3 class="dish-label"><a href = '${item.recipe.url}' target='_blank'>${item.recipe.label}</a></h3>
// //             </a>
// //             <p class="calories"><span>Calories: </span>${Math.round(item.recipe.calories)} kcal</p>
// //             <p class="mealType"><span>Meal: </span>${item.recipe.mealType}</p>
// //             <p class="dishType"><span>Dish: </span>${item.recipe.dishType}</p>
// //             </div>
// //             `

// //             cards.appendChild(card);
// //         })
// //     } else if (finalUrl.status == 200 && recipes.length == 0) {
// //         console.log('error');
// //         cards.innerHTML = `<h2>Recipe Not Found!</h2>`;
// //         document.querySelector('.content').style.flexDirection = 'column';
// //         document.querySelector('.dishes').style.gridTemplateColumns = 'auto auto auto auto';
// //         document.querySelector('.famous-recipes').style.display = 'none';
// //     }
// //     else {
// //         cards.innerHTML = `<h2>Error Fetching Recipe </h2>`;
// //     }
// // }

// // async function filterSearchRecipe(param,value) {
// //     if (param == 'cuisine'|| param == 'meal') {
// //         param = param+'Type';
// //     } 

// //     value = value.trim();
// //     let params = param.trim();
// //     // console.log(value);
// //     console.log(params);
// //     if (searchInput.value == '') {
// //         url = firstPart + params + '='+ value+ apiKey + lastPart;
// //         document.querySelector('.cuisine-name-dish').textContent = value;
// //     } else {
// //         url = firstPart + question + searchInput.value + apiKey + '&'+ params + '=' + value + lastPart;
// //         document.querySelector('.cuisine-name-dish').textContent = `${value} ${searchInput.value}` ;
// //     }
// //     console.log(url);
// //     let finalUrl = await fetch(url);
// //     console.log(finalUrl.status);
// //     let data = await finalUrl.json();
// //     console.log(data);
// //     let recipes = data.hits;
// //     console.log(recipes);


// //     if (finalUrl.status === 200 && recipes.length !== 0) {

// //         cards.innerHTML = '';
// //         recipes.forEach((item) => {
// //             const card = document.createElement('div');
// //             card.className = 'card';
// //             card.innerHTML = `
// //             <div class="show-image">
// //             <img src="${item.recipe.images.SMALL.url}" alt="${item.recipe.label}">
// //             </div>
// //             <div class="show-data">
// //             <h3 class="dish-label"><a href = '${item.recipe.url}' target='_blank'>${item.recipe.label}</a></h3>
// //             </a>
// //             <p class="calories"><span>Calories: </span>${Math.round(item.recipe.calories)} kcal</p>
// //             <p class="mealType"><span>Meal: </span>${item.recipe.mealType}</p>
// //             <p class="dishType"><span>Dish: </span>${item.recipe.dishType}</p>
// //             </div>
// //             `

// //             cards.appendChild(card);
// //         })
// //     } else if (finalUrl.status == 200 && recipes.length == 0) {
// //         console.log('error');
// //         cards.innerHTML = `<h2>Recipe Not Found!</h2>`;
// //         document.querySelector('.content').style.flexDirection = 'column';
// //         document.querySelector('.dishes').style.gridTemplateColumns = 'auto auto auto auto';
// //         document.querySelector('.famous-recipes').style.display = 'none';
// //     }
// //     else {
// //         cards.innerHTML = `<h2>Error Fetching Recipe </h2>`;
// //         document.querySelector('.content').style.flexDirection = 'column';
// //         document.querySelector('.dishes').style.gridTemplateColumns = 'auto auto auto auto';
// //         document.querySelector('.famous-recipes').style.display = 'none';
// //     }

// // }



// async function filterSearchRecipe(param,pvalue,query) {
//     if (param == 'cuisine'|| param == 'meal') {
//         param = param+'Type';
//     } 

//     let params = param.trim();
//     // console.log(value);
//     // console.log(params);
//     if (params == '' && pvalue == '') {
//         url = firstPart + question + query + apiKey + lastPart;
//         document.querySelector('.cuisine-name-dish').innerHTML = '';
//         document.querySelector('.cuisine-name-dish').innerText = searchInput.value;
//     } else if (searchInput.value == '' && params !== '' && pvalue !== '' ) {
//         url = firstPart + params + '='+ pvalue+ apiKey + lastPart;
//         document.querySelector('.cuisine-name-dish').textContent = pvalue;
//     } else {
//         url = firstPart + question + searchInput.value + apiKey + '&'+ params + '=' + pvalue + lastPart;
//         document.querySelector('.cuisine-name-dish').textContent = `${pvalue} ${searchInput.value}` ;
//     }
//     // console.log(url);
//     let finalUrl = await fetch(url);
//     // console.log(finalUrl.status);
//     let data = await finalUrl.json();
//     // console.log(data);
//     let recipes = data.hits;
//     // console.log(recipes);


//     if (finalUrl.status === 200 && recipes.length !== 0) {

//         cards.innerHTML = '';
//         recipes.forEach((item) => {
//             const card = document.createElement('div');
//             card.className = 'card';
//             card.innerHTML = `
//             <div class="show-image">
//             <img src="${item.recipe.images.SMALL.url}" alt="${item.recipe.label}">
//             </div>
//             <div class="show-data">
//             <h3 class="dish-label"><a href = '${item.recipe.url}' target='_blank'>${item.recipe.label}</a></h3>
//             </a>
//             <p class="calories"><span>Calories: </span>${Math.round(item.recipe.calories)} kcal</p>
//             <p class="mealType"><span>Meal: </span>${item.recipe.mealType}</p>
//             <p class="dishType"><span>Dish: </span>${item.recipe.dishType}</p>
//             </div>
//             `

//             cards.appendChild(card);
//         })
//     } else if (finalUrl.status == 200 && recipes.length == 0) {
//         // console.log('error');
//         cards.innerHTML = `<h2>Recipe Not Found!</h2>`;
//         document.querySelector('.content').style.flexDirection = 'column';
//         document.querySelector('.dishes').style.gridTemplateColumns = 'auto auto auto auto';
//         document.querySelector('.famous-recipes').style.display = 'none';
//     }
//     else {
//         cards.innerHTML = `<h2>Error Fetching Recipe </h2>`;
//         document.querySelector('.content').style.flexDirection = 'column';
//         document.querySelector('.dishes').style.gridTemplateColumns = 'auto auto auto auto';
//         document.querySelector('.famous-recipes').style.display = 'none';
//     }

// }

// let radioSelected = [];
//     let radioNameSelected = [];

// async function searchFilterOptions () {    
//     Array.from(radios).forEach((radio) => {
//         if (radio.checked == true) {
//             let radioChecked = radio.value;
//             let radioName = radio.name;
//             // console.log(radioChecked);
//             // console.log(radioName);

//             radioSelected.push(radioChecked);
//             radioNameSelected.push(radioName);                
//         }
            
//         });
        
//         for (let i = 0; i < radioNameSelected.length; i++) {
//             let nameString = String(radioNameSelected[i]);
//             let radioString = String(radioSelected[i]);
//             console.log(nameString);
//             console.log(radioString);
//             // console.log(String(radioNameSelected[i]), String(radioSelected[i]));
//         } 
//         removeDuplicatesAndSyncArrays(radioNameSelected, radioSelected);
//         // extractAndLogValues(radioNameSelected, radioSelected);
//         if (nameString == 'cuisine' || nameString == 'meal') {
//             nameString = nameString + 'Type';
//         }
//         url = firstPart + nameString + '=' + radioString + apiKey + lastPart;
//         console.log(url);   
// }

// function removeDuplicatesAndSyncArrays(arr1, arr2) {
//     // Keep track of the indices of duplicates in arr1
//     let duplicateIndices = [];
//     let uniqueElements = new Set();

//     // Iterate over arr1 and find duplicates
//     for (let i = 0; i < arr1.length; i++) {
//         if (uniqueElements.has(arr1[i])) {
//             duplicateIndices.push(i);
//         } else {
//             uniqueElements.add(arr1[i]);
//         }
//     }

//     // Remove duplicates from arr1 and corresponding elements from arr2
//     for (let i = duplicateIndices.length - 1; i >= 0; i--) {
//         let index = duplicateIndices[i];
//         arr1.splice(index, 1);
//         arr2.splice(index, 1);
//     }

//     console.log(arr1);
//     console.log(arr2);
// }

// function extractAndLogValues(arr1, arr2) {
//     // Check if both arrays have the same length
//     // if (arr1.length !== arr2.length) {
//     //     console.error("Arrays must have the same length.");
//     //     return;
//     // }

//     // Iterate over the arrays and log values as strings
//     for (let i = 0; i < arr1.length; i++) {
//         console.log(String(arr1[i]), String(arr2[i]));
//     }
// }

// // // Example usage:
// // let array1 = [1, 2, 3, 4, 5];
// // let array2 = ['a', 'b', 'c', 'd', 'e'];

// // extractAndLogValues(array1, array2);

// // Output:
// // "1" "a"
// // "2" "b"
// // "3" "c"
// // "4" "d"
// // "5" "e"

// const firstPart = 'https://api.edamam.com/api/recipes/v2?type=public&';
// const apiKey = '&app_id=d3f2e962&app_key=68398202cbefbf1001f05c1219a0606a';
// const lastPart = '&imageSize=SMALL&random=true';

document.getElementById('filter-search').addEventListener('click', setURL);
    // const url = await createUrl();
    // console.log(url);  // Output the URL to console, or use it as needed
    // let data = await url.json();
    // console.log(url);
// });

async function setURL () {
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


async function createUrl() {
    // const baseUrl = 'https://api.example.com/recipes';
    const params = [];

    const searchInput = document.getElementById('search').value.trim();
    if (searchInput !== '') {
        params.push(`q=${encodeURIComponent(searchInput)}`);
    }

    // Find all selected radio buttons
    const selectedRadios = document.querySelectorAll('input[type="radio"]:checked');

    // Iterate over selected radios to construct the parameters object
    selectedRadios.forEach(radio => {
        const filterName = radio.name;
        const filterValue = radio.value;
        params.push(`${encodeURIComponent(filterName)}=${encodeURIComponent(filterValue)}`);
    });

    // Check if search input is not empty
   

    // Construct the query string
    const queryString = params.join('&');
    if (!queryString) {
        console.log('nooooooo');
        return null;
    }

    const url = `${firstPart}${queryString}${apiKey}${lastPart}`;
    return url;
}


async function fetchUrl(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);  // Output the fetched data to console, or use it as needed
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
            `
    
            cards.appendChild(card);
        })
    } catch (error) {
        console.error('Error fetching the data:', error);
    }
}