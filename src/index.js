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
    .map(({ preview, title, description }) => {
      return `<a href="" class="pop-recipe-link">
      <div class="pop-recipe-card"> 
    <img class="img-pop-recipe" src="${preview}" width="64" height="64" alt="">
    <div class="text-pop-recipe">  
    <h3 class="title-pop-recipe">${title}</h3>
    <p class="description-pop-recipe">${description}</p>
    </div>
    </div>
  </a>`;
    })
    .join('');
}
