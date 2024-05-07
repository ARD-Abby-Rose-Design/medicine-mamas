(function() {
  const blogSearchButton = document.getElementById('blog-search-link');
  const blogSearchElement = document.querySelector('.main-blog__filters-wrapper  .search-modal__form-wrapper');
  const blogSearchInput = document.querySelector('.main-blog__filters-wrapper  .search__input');
  blogSearchButton.addEventListener('click', (e) => {
    e.preventDefault();
    blogSearchElement.classList.toggle('active');
    blogSearchInput.focus();
  });
})();