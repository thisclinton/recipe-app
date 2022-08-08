getRandonMeal();

async function getRandonMeal() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const resData = await res.json();
  const randomMeal = resData.meals[0];
  console.log(randomMeal);
  addMeal(randomMeal);
}

function addMeal({ strMealThumb, strMeal }) {
  const mealCard = document.querySelector(".meal__container");
  mealCard.innerHTML = `
        <article class="meal__card">
            <div class="meal__img">
                <img src=${strMealThumb} alt="">
            </div>
            <div class="meal__details">
                <span class="meal__title">${strMeal}</span>
                <i class="ri-heart-line"></i>
            </div>
        </article>
    `;
}
