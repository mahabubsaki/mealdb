// common function for all catagory display food
const displayByFirstLetter = data =>{
    const allFood = data.meals
    document.getElementById('error-msg').style.display = 'none'
    if(allFood == null){
        document.getElementById('error-msg').style.display = 'block'
    }
    document.getElementById('display-letter').innerHTML = ``
    document.getElementById('single-food').innerHTML = ``
    for(let food of allFood){
        const divContainer = document.getElementById('display-letter')
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
        <img src="${food.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title my-2 text-center">${food.strMeal}</h5>
            <div>
            <button class="btn btn-primary my-auto w-100" onclick="clickedSingleFood(${food.idMeal})">More details</button>
            </div>
        </div>
    </div>`
    divContainer.appendChild(div)
    }
}
// common function for all catagory display food ends
// common function for display single food starts
const displaySingle = food =>{
    const singleFood = food.meals[0]
    console.log(singleFood);
    document.getElementById('single-food').innerHTML = ``
    const divContainer = document.getElementById('single-food')
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src="${singleFood.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
    <h3 class="card-title">${singleFood.strMeal}</h3>
    <hr>
    <h4 class="card-text">Catagory: ${singleFood.strCategory}</h4>
    <h4 class="card-title">Country: ${singleFood.strArea}</h4>
    <hr>
    <h5 class="card-text text-center">Ingrediants<br><span id="ingredients">
    ${singleFood.strIngredient1}: ${singleFood.strMeasure1},
    ${singleFood.strIngredient2}: ${singleFood.strMeasure2},  
    ${singleFood.strIngredient3}: ${singleFood.strMeasure3},
    ${singleFood.strIngredient4}: ${singleFood.strMeasure4},
    ${singleFood.strIngredient5}: ${singleFood.strMeasure5},
    ${singleFood.strIngredient6}: ${singleFood.strMeasure6},
    ${singleFood.strIngredient7}: ${singleFood.strMeasure7},
    ${singleFood.strIngredient8}: ${singleFood.strMeasure8},
    ${singleFood.strIngredient9}: ${singleFood.strMeasure9},   
    ${singleFood.strIngredient10}: ${singleFood.strMeasure10},   
    ${singleFood.strIngredient11}: ${singleFood.strMeasure11},   
    ${singleFood.strIngredient12}: ${singleFood.strMeasure12},
    ${singleFood.strIngredient13}: ${singleFood.strMeasure13},
    ${singleFood.strIngredient14}: ${singleFood.strMeasure14},
    ${singleFood.strIngredient15}: ${singleFood.strMeasure15},
    ${singleFood.strIngredient16}: ${singleFood.strMeasure16},
    ${singleFood.strIngredient17}: ${singleFood.strMeasure17},
    ${singleFood.strIngredient18}: ${singleFood.strMeasure18},
    ${singleFood.strIngredient19}: ${singleFood.strMeasure19},
    ${singleFood.strIngredient20}: ${singleFood.strMeasure20}
    </span>
    </h5>
    <hr>
        <p class="card-text">${singleFood.strInstructions}</p>
        <div class="w-25 mx-auto">
        <a href="${singleFood.strYoutube}"><button class="w-100 btn btn-primary">Watch Tutorial</button></a>
        </div>
    `
    divContainer.appendChild(div)
    const ingredients = document.getElementById('ingredients').innerText
    trimming('ingredients',ingredients)
}
//function for trimmin last commas and spaces
const trimming = (id,innertext) =>{
    let trimmedIngredients;
    for(let i=1;i<innertext.length;i++){
        if(innertext[innertext.length-i] == ' ' || innertext[innertext.length-i] == ',' || innertext[innertext.length-i] == ':'){
           trimmedIngredients = innertext.slice(0,innertext.length-i)
        }
        else{
            break
        }
    }
    document.getElementById(id).innerText = trimmedIngredients
}
// common function for display single food ends
// see single food by see more details
const clickedSingleFood = foodId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySingle(data));
}
// see single food by random button
const seeRandom = ()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => displaySingle(data))
}
// search by first letter catagory
const allLetters = document.getElementsByClassName('letters')
for(let letter of allLetters){
    letter.addEventListener('click', function(){
        const linkLetter = letter.innerText
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${linkLetter}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayByFirstLetter(data))
    })
}
// search by input catagory
const searchBtn = document.getElementById('button-id')
searchBtn.addEventListener('click', function(){
    const searchField = document.getElementById('search-field')
    let searchText = searchField.value
    if(searchText == ''){
        document.getElementById('error-msg').style.display = 'block'
    }
    else{
        document.getElementById('error-msg').style.display = 'none'
    }
    document.getElementById('display-letter').innerHTML = ``
    document.getElementById('single-food').innerHTML = ``
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayByFirstLetter(data))
    searchField.value = ``
})
// search by food catagory
const catButtons = document.getElementsByClassName('cat-buttons')
for(let catButton of catButtons){
    catButton.addEventListener('click', function(){
        const catagory = catButton.innerText
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catagory}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayByFirstLetter(data))
    })
}
// search by country
const countryButtons = document.getElementsByClassName('country-buttons')
for(let countryButton of countryButtons){
    countryButton.addEventListener('click',function(){
        const country = countryButton.innerText
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayByFirstLetter(data))
    })
}