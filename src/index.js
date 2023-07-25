import './js/header.js';
import './js/hero.js';
import './js/hero-switch.js';
import './js/filter.js';
import './js/all-foods.js';
import './js/hero.js';
import './js/popular-recipes.js';
import './js/video-recipe.js';
import './js/scroll-categories.js';
import './js/scroll-to-start.js';

import { showModalAboutReciepts } from './js/video-recipe.js';

const url = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

const url_recipe_info =
  'https://tasty-treats-backend.p.goit.global/api/recipes/';

const pop_recipe_info = document.querySelector('.popular-recipes');

function fetchPopularRecipes() {
  return fetch(`${url}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

fetchPopularRecipes()
  .then(data => {
    console.log(data);
    //pop_recipe_info.insertAdjacentHTML('beforeend', renderPopularRecipes(data));
    pop_recipe_info.innerHTML = renderPopularRecipes(data);
  })
  .catch(error => {
    console.log(error);
  });

function renderPopularRecipes(recipes) {
  return recipes
    .map(({ _id, preview, title, description }) => {
      return `<li class="pop-recipe-link" id="${_id}" > 
      <div class="pop-recipe-card"> 
    <img class="img-pop-recipe" src="${preview}" width="64" height="64" alt="">
    <div class="text-pop-recipe">  
    <h3 class="title-pop-recipe">${title}</h3>
    <p class="description-pop-recipe">${description}</p>
    </div>
    </div>
  </li>`;
    })
    .join('');
}

// БУЛО
//const openResipesCards = document.querySelectorAll('.pop-recipe-link');
// openResipesCards.forEach(card => {
//   card.addEventListener('click', event => {
//     showModalAboutReciepts(event.currentTarget._id);
//   });
// });

//ЗАРАЗ працює
const openResipesCards = document.getElementById('popularRecipeList');
openResipesCards.addEventListener('click', event => {
  const clickedEl = event.target.closest('.pop-recipe-link');
  if (clickedEl) {
    const recipeId = clickedEl.id;
    showModalAboutReciepts(recipeId);
  }
});
