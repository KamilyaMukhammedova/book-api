const url = window.location.href;
const localStorageUserData = JSON.parse(localStorage.getItem('userData'));

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('edit_book');

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

const title = document.getElementById('book-form-title');
let bookDataFromApi = '';

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

const getBookData = async () => {
  try {
    const response = await fetch(`http://localhost:1717/books/${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': localStorageUserData.token
      }
    });

    if (response.ok) {
      bookDataFromApi = await response.json();

      console.log(bookDataFromApi);
    } else {
      console.error('Error. Try again');
    }
  } catch (e) {
    console.error('Error: ', e.message);
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  if (localStorageUserData &&
    (url === 'http://localhost:3000/new-book-page.html' || url === `http://localhost:3000/new-book-page.html?edit_book=${bookId}`))
  {
    onFieldListener('blur', bookName, bookAuthor, bookDescription);
    onFieldListener('input', bookName, bookAuthor, bookDescription);

    onFieldListener('blur', bookAuthor, bookName, bookDescription);
    onFieldListener('input', bookAuthor, bookName, bookDescription);

    onFieldListener('blur', bookDescription, bookName, bookAuthor);
    onFieldListener('input', bookDescription, bookName, bookAuthor);

    url === 'http://localhost:3000/new-book-page.html' ? title.innerText = 'Add new book' : title.innerText = 'Edit book';

    if(url === `http://localhost:3000/new-book-page.html?edit_book=${bookId}`) {
      await getBookData();

      submitBtn.disabled = false;

      bookName.value = bookDataFromApi.name;
      bookAuthor.value = bookDataFromApi.author;
      bookIsFavorite.checked = bookDataFromApi.isFavorite;
      bookPublishYear.value = bookDataFromApi.publishYear;
      bookPublishHouse.value = bookDataFromApi.publishHouse;
      bookPagesNumber.value = bookDataFromApi.pagesNumber;
      bookOriginalLanguage.value = bookDataFromApi.originalLanguage;
      bookImgUrl.value = bookDataFromApi.img;
      bookDescription.value = bookDataFromApi.description;
      bookGenres.forEach(genre => {
        if(bookDataFromApi.genres.includes(genre.name)) {
          genre.checked = true;
        }
      });
    }


    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const genresArray = [];
      bookGenres.forEach(genre => {
        if(genre.checked) {
          genresArray.push(genre.name);
        }
      });

      const bookData = {
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

      console.log(bookData);

      try {
        let apiUrl = '';
        let methodName = '';

        if(url === 'http://localhost:3000/new-book-page.html') {
          apiUrl = 'http://localhost:1717/books/create';
          methodName = 'POST';
        } else {
          apiUrl = `http://localhost:1717/books/update/${bookId}`;
          methodName = 'PUT';
        }

        const response = await fetch(apiUrl, {
          method: methodName,
          body: JSON.stringify(bookData),
          headers: {
            'Content-Type': 'application/json',
            'X-Auth': localStorageUserData.token
          }
        });

        if (response.ok) {
          window.location.replace('http://localhost:3000/index.html');
        } else {
          console.error('Error. Try again');
        }
      } catch(e) {
        console.error(e);
      }
    });


  }

});
