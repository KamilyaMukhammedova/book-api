import {onFieldValidator} from "./ fields-validator";
import {snackbarError, snackbarSuccess} from "./snackbar";
import {btnSpinner} from "./main";

const url = window.location.href;
const localStorageUserData = JSON.parse(localStorage.getItem('userData'));

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('edit_book');
const loading = document.getElementById('loading-book-data-form');

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

const getBookData = async () => {
  try {
    loading.style.display = 'block';
    const response = await fetch(`http://localhost:1717/books/${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': localStorageUserData.token
      }
    });

    if (response.ok) {
      loading.style.display = 'none';
      bookDataFromApi = await response.json();
    } else {
      loading.style.display = 'none';
      snackbarError(`Fetching book's data`);
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
    onFieldValidator('blur',  submitBtn, bookName, bookAuthor, bookDescription);
    onFieldValidator('input', submitBtn, bookName, bookAuthor, bookDescription);

    onFieldValidator('blur',  submitBtn, bookAuthor, bookName, bookDescription);
    onFieldValidator('input',  submitBtn, bookAuthor, bookName, bookDescription);

    onFieldValidator('blur', submitBtn, bookDescription, bookName, bookAuthor);
    onFieldValidator('input', submitBtn, bookDescription, bookName, bookAuthor);

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
      submitBtn.innerHTML = btnSpinner;

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

      try {
        let apiUrl = '';
        let methodName = '';
        let snackbarText = '';

        if(url === 'http://localhost:3000/new-book-page.html') {
          apiUrl = 'http://localhost:1717/books/create';
          methodName = 'POST';
          snackbarText = 'New book creating';
        } else {
          apiUrl = `http://localhost:1717/books/update/${bookId}`;
          methodName = 'PUT';
          snackbarText = 'Book editing';
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
          submitBtn.innerText = 'Save';
          snackbarSuccess(snackbarText, true);
        } else {
          submitBtn.innerText = 'Save';
          snackbarError(snackbarText);
          console.error('Error. Try again');
        }
      } catch(e) {
        console.error(e);
      }
    });
  }
});
