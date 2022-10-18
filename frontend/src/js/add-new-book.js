const url = window.location.href;
const localStorageUserData = JSON.parse(localStorage.getItem('userData'));

const form = document.getElementById('new-book-form');
const bookName = document.getElementById('book-name');
const bookAuthor = document.getElementById('book-author');
const bookDescription = document.getElementById('book-description');
const submitBtn = document.getElementById('new-book-submit');

const bookIsFavorite = document.getElementById('book-is-favorite');
const bookPublishYear = document.getElementById('book-publish-year');
const bookPublishHouse = document.getElementById('book-publish-house');
const bookPagesNumber = document.getElementById('book-pages-number');
const bookImgUrl = document.getElementById('book-img');
const bookOriginalLanguage = document.getElementById('book-original-lang');
const bookGenres = document.querySelectorAll('.book-genre');

const onFieldListener = (eventName, field1, field2, field3) => {
  field1?.addEventListener(eventName, (event) => {
    if (event.target.value === '') {
      field1.classList.add('is-invalid');
      submitBtn.disabled = true;
    } else {
      field1.classList.remove('is-invalid');
      if (field2.value !== '' && field3.value !== '') {
        submitBtn.disabled = false;
      }
    }
  });
};

if (localStorageUserData && url === 'http://localhost:3000/new-book-page.html') {
  onFieldListener('blur', bookName, bookAuthor, bookDescription);
  onFieldListener('input', bookName, bookAuthor, bookDescription);

  onFieldListener('blur', bookAuthor, bookName, bookDescription);
  onFieldListener('input', bookAuthor, bookName, bookDescription);

  onFieldListener('blur', bookDescription, bookName, bookAuthor);
  onFieldListener('input', bookDescription, bookName, bookAuthor);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const genresArray = [];
    bookGenres.forEach(genre => {
      if(genre.checked) {
        genresArray.push(genre.name);
      }
    });

    const newBookData = {
      name: bookName.value,
      author: bookAuthor.value,
      isFavorite: bookIsFavorite.checked,
      publishYear: parseInt(bookPublishYear.value),
      publishHouse: bookPublishHouse.value,
      pagesNumber: parseInt(bookPagesNumber.value),
      genres: genresArray,
      originalLanguage: bookOriginalLanguage.value,
      img: bookImgUrl.value,
      description: bookDescription.value,
    };

    console.log(newBookData);

    try {
      const response = await fetch('http://localhost:1717/books/create', {
        method: 'POST',
        body: JSON.stringify(newBookData),
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': localStorageUserData.token
        }
      });

      if (response.ok) {
        // window.location.replace('http://localhost:3000/index.html');
        console.log('added new book')
      } else {
        console.error('Error. Try again');
      }
    } catch(e) {
      console.error(e);
    }
  });


}