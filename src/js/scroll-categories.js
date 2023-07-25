const categoryList = document.querySelector('.category-list');
console.log(categoryList);

const url = 'https://tasty-treats-backend.p.goit.global/api/categories';

function fetchCategory() {
  return fetch(`${url}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
fetchCategory()
  .then(data => {
    categoryList.insertAdjacentHTML('beforeend', renderMarkUp);
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

function renderMarkUp(category) {
  return category
    .map(({ name }) => {
      return `<li>${name}</li>`;
    })
    .join('');
}
