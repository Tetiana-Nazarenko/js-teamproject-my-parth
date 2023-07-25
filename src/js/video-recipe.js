export let refs = {
  addToFavoriteBtn: document.querySelector('.btn-add'),
  removeFromFavoriteBtn: document.querySelector('.btn-outline-remove'),
  recieptsTitle: document.querySelector('.reciepts-title'),
  backdropRecipe: document.querySelector('.backdrop-video-recipes'),
  modalRecipe: document.querySelector('.modal-video-recipe'),
  closeBtn: document.querySelector('.modal-video-recipes-close-button'),
  tagsRecipe: document.querySelector('.tags-recipe'),
  ratingRecipe: document.querySelector('.rating-recipe'),
  minutesRecipe: document.querySelector('.minutes-recipe'),
  ingredientsRecipe: document.querySelector('.ingredients-recipe'),
  instructionsRecipe: document.querySelector('.instructions-recipe'),
  videoRecipe: document.querySelector('.video-recipe'),
};

refs.closeBtn.addEventListener('click', closeModalClose);
refs.backdropRecipe.addEventListener('click', clickBackdropClick);

function openModalOpen() {
  setTimeout(() => {
    window.addEventListener('keydown', onEscPress);
    document.body.classList.add('overflowHidden');
    refs.backdropRecipe.classList.add('active');
    refs.modalRecipe.classList.add('active');
  }, 50);
}

function closeModalClose() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('overflowHidden');
  refs.backdropRecipe.classList.remove('active');
  refs.modalRecipe.classList.remove('active');
}

function onEscPress(key) {
  if (key.code === 'Escape') {
    closeModalClose();
  }
}
function clickBackdropClick(element) {
  if (element.currentTarget === element.target) closeModalClose();
}

export function showModalAboutReciepts(id) {
  recieptsOfFood(id).then(data => {
    //   isFavorite(data._id);
    renderRanting(data);
    markUpRating();
    renderIngridient(data);
    renderHashtags(data);
    renderText(data);
    openModalOpen();
    renderVIDEO(data);
    recipeId = data._id;
  });
}

async function recieptsOfFood(id) {
  const resp = await fetch(
    `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
  );
  const data = await resp.json();
  return data;
}

function renderText(data) {
  refs.recieptsTitle.textContent = data.title;
  refs.videoRecipe.src = data.preview;
  refs.instructionsRecipe.textContent = data.instructions;
  refs.minutesRecipe.textContent = data.time + ' min';
}

let ratings;
let ratingActive, ratingValue;

function initRating(rating) {
  initValues(rating);
  if (ratingValue.innerHTML > 5) {
    ratingValue.innerHTML = 5;
  }
  const ratingActiveWidth = ratingValue.innerHTML / 0.05;

  ratingActive.style.width = `${ratingActiveWidth}%`;
}

function initValues(rating) {
  ratingActive = rating.querySelector('.rating__active');
  ratingValue = rating.querySelector('.rating__value');
}

export function markUpRating() {
  ratings = document.querySelectorAll('.rating');
  ratings.forEach(item => {
    const rating = item;
    initRating(rating);
  });
}

function getKeyYouTybe(url) {
  let indexLast = url.split('').length;
  let key = url.split('').splice(32, indexLast).join('');
  return key;
}
function renderVIDEO(data) {
  const markUp = `
   <iframe
                width="467px"
                height="250px"
                src="https://www.youtube.com/embed/${getKeyYouTybe(
                  data.youtube
                )}"
title = "YouTube video player"
frameborder = "0"
allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen
  ></iframe >
`;
  refs.videoRecipe.innerHTML = markUp;
}

function renderRanting(data) {
  let markupR = `
    <div class="cards__rating rating">
    <div class="rating__value detail">${data.rating}</div>
    <div class="rating__body">
      <div class="rating__active"></div>
      <div class="rating__items">
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="1"
        />
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="2"
        />
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="3"
        />
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="4"
        />
        <input
          type="radio"
          class="rating__item"
          name="rating"
          value="5"
        />
      </div>
    </div>
  </div>`;
  refs.ratingRecipe.innerHTML = markupR; // Change refs.ratingBox to refs.ratingRecipe
}

function renderIngridient(data) {
  const markup = data.ingredients
    .map(
      ({ measure, name }) => `
        <li class="recipes-subtitle">
          ${name}
          <p class="recipes-inf">${measure}</p>
        </li>
      `
    )
    .join('');
  refs.ingredientsRecipe.innerHTML = markup; // Change refs.IngredientBox to refs.ingredientsRecipe
}

function renderHashtags(data) {
  if (data.tags.length === 0) {
    return;
  }
  const markup = data.tags
    .map(tag => ` <li class="hashtags">#${tag}</li>`)
    .join('');
  refs.tagsRecipe.innerHTML = markup; // Change refs.hashtagsBox to refs.tagsRecipe
}

//showModalAboutReciepts('6462a8f74c3d0ddd28897fc8');
//showModalAboutReciepts('6462a8f74c3d0ddd28898040');
