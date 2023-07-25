const scrollButton = document.getElementById('scroll-up-button');

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

window.onscroll = function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
};

scrollButton.addEventListener('click', scrollToTop);

// goTopBtn.addEventListener('click', goTop);

// function trackScroll() {
//   const offSet = window.pageYOffset;
//   const coords = document.documentElement.clientHeight;
//   if (offSet > coords) {
//     goTopBtn.classList.add('');
//   }
// }

// function goTop() {
//   if (window.pageYOffset > 0) {
//     window.scrollBy(0, -75);
//     setTimeout(goTop, 0);
//   }
// }
