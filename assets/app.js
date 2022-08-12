getRandonMeal();

const favMealBasket = JSON.parse(localStorage.getItem("mealIds")) || [];

async function getRandonMeal() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const resData = await res.json();
  console.log(resData);
  const randomMeal = resData.meals[0];
  console.log(randomMeal);
  addMeal(randomMeal);
}

async function getMealById(id) {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}"
  );
  const resData = await res.json();
  const meal = resData.meals[0];
  return meal;
}

function addMeal(meals) {
  const mealCard = document.querySelector(".meal__container");
  const { idMeal, strMealThumb, strMeal } = meals;
  mealCard.innerHTML = `
        <article class="meal__card">
            <div class="meal__img">
                <img src=${strMealThumb} alt="">
            </div>
            <div class="meal__details">
                <span class="meal__title">${strMeal}</span>
                <i ${idMeal} class="ri-heart-line"></i>
            </div>
        </article>
    `;

  const btnHeart = document.querySelector(".ri-heart-line");
  btnHeart.addEventListener("click", () => {
    if (btnHeart.classList.contains("ri-heart-line")) {
      btnHeart.setAttribute("class", "ri-heart-fill");
      addMealLS(meals);
      favMealBasket.push({ ...meals, meals });
      console.log(favMealBasket);
      addMealFav(meals);
    } else {
      btnHeart.setAttribute("class", "ri-heart-line");
    }
  });
}

function addMealLS(mealID) {
  const mealIds = getMealLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealID]));
}

function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

function removeMealLS(mealID) {
  const mealIds = getMealLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealID))
  );
}

async function fetchFavMeals() {
  favMealContainer.innerHTML = "";
  const mealsIds = getMealLS();
  for (let i = 0; i < mealsIds.length; i++) {
    const mealID = mealsIds[i];
    meal = await getMealById(mealID);
    addMealFav(meal);
  }
}

/* const favMealContainer = document.querySelector(".recipe__favorite-meal");

function addMealFav(mealsID) {
  localStorage.getItem("mealIds");
  return (favMealContainer.innerHTML += favMealBasket
    .map((basket) => {
      return `
      <article class="favorite__card">
          <div class="favorite__top">
              <img src=${basket.strMealThumb} alt="" class="favorite__img">
              <p class="favorite__title">${basket.strMeal}</p>
          </div>
          <span class="favorite__delete">
              <i class="ri-close-line"></i>
          </span>
      </article>
    `;
    })
    .join(""));
} */

const favMealContainer = document.querySelector(".recipe__favorite-meal");

function addMealFav(meal) {
  favMealContainer.innerHTML = favMealBasket
    .map((fav) => {
      return `
      <article class="favorite__card">
        <div class="favorite__top">
            <img src=${fav.strMealThumb} alt="" class="favorite__img">
            <p class="favorite__title">${fav.strMeal}</p>
        </div>
        <span class="favorite__delete">
            <i class="ri-close-line"></i>
        </span>
      </article>
  `;
    })
    .join("");
}

addMealFav(favMealBasket);

/* 








 */
