import {getLocalStorage} from "./local-storage";
import {snackbarError, snackbarSuccess} from "./snackbar";
import {once} from "@babel/core/lib/gensync-utils/functional";

export const btnSpinner = `
         <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
         </div>
       `;

const starEmpty = `
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
       </svg>
     `;

const starColored = `
     <span id="boot-icon" class="bi bi-star-fill" 
     style="width: 16px; height: 16px; color: rgb(255, 255, 255); -webkit-text-stroke-width: 0;">
     </span>
     `;

const localStorageUserData = JSON.parse(localStorage.getItem('userData'));
const booksDiv = document.getElementById('booksDiv');
const url = window.location.href;
const loading = document.getElementById('loading');

const getCards = async () => {
  if (localStorageUserData && (url === 'http://localhost:3000/index.html' || url === 'http://localhost:3000/')) {
    booksDiv.innerHTML = '';
    loading.style.display = 'block';

    try {
      const response = await fetch('http://localhost:1717/books', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': localStorageUserData.token
        }
      });

      if (response.ok) {
        const booksData = await response.json();

        booksData.reverse().forEach(book => {
          const cardCol = document.createElement('div');
          cardCol.className = 'col';

          const card = document.createElement('div');
          card.className = 'card h-100 shadow';
          const img = book.img ? book.img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-OmTQ0NVjb0MJC0wlCLmO5OGConYN8B32_w&usqp=CAU';

          const linkDiv = document.createElement('div');
          linkDiv.className = 'link-div';
          linkDiv.id = book.id;
          linkDiv.innerHTML = `
                  <img src="${img}" class="card-img-top book-img" alt="${book.name}">
                  <div class="card-body">
                      <h5 class="card-title">" ${book.name} "</h5>
                      <p class="card-text">${book.author}</p>
                  </div>
          `;

          const cardFooter = document.createElement('div');
          cardFooter.className = 'card-footer mt-auto p-3';

          const editBtn = document.createElement('button');
          editBtn.className = 'btn btn-secondary spacing';
          editBtn.innerHTML = `<i class="bi bi-pencil"></i>`;

          const favoriteBtn = document.createElement('button');
          favoriteBtn.className = 'btn btn-dark spacing';
          favoriteBtn.innerHTML = book.isFavorite ? starColored : starEmpty;

          const removeBtn = document.createElement('button');
          removeBtn.className = 'btn btn-warning text-light';
          removeBtn.innerHTML = `<i class="bi bi-trash"></i>`;

          cardFooter.append(favoriteBtn, editBtn, removeBtn);

          card.append(linkDiv, cardFooter);
          cardCol.append(card);

          linkDiv.addEventListener('click', () => {
            window.location.assign(`http://localhost:3000/one-book-info-page.html?book_id=${book.id}`);
          });

          editBtn.addEventListener('click', () => {
            window.location.assign(`http://localhost:3000/new-book-page.html?edit_book=${book.id}`);
          });

          removeBtn.addEventListener('click', async () => {
            try {
              const response = await fetch(`http://localhost:1717/books/delete/${book.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Auth': localStorageUserData.token
                }
              });

              if (response.ok) {
                await getCards();
                snackbarSuccess(`"${book.name}" removing`, false);
              } else {
                snackbarError(`"${book.name}" removing`, 'Try again!');
                console.error('Error! Try again');
              }
            } catch (e) {
              console.error(e);
            }
          });

          favoriteBtn.addEventListener('click', async () => {
            try {
              const response = await fetch(`http://localhost:1717/books/update/${book.id}`, {
                method: 'PUT',
                body: JSON.stringify({'isFavorite': !book.isFavorite}),
                headers: {
                  'Content-Type': 'application/json',
                  'X-Auth': localStorageUserData.token
                }
              });

              if (response.ok) {
                await getCards();
                !book.isFavorite ? snackbarSuccess(`"${book.name}" adding in favorites`, false) :
                                   snackbarSuccess(`"${book.name}" removing from favorites`, false);
              } else {
                snackbarError(`"${book.name}" adding in favorites`, 'Try again!');
                console.error('Error. Try again.');
              }
            } catch (e) {
              console.error(e);
            }
          });

          booksDiv.append(cardCol);
        });

        loading.style.display = 'none';
      } else {
        loading.style.display = 'none';
        booksDiv.innerHTML = `
                       <div class="alert alert-danger mt-5 p-4" role="alert">
                          <h1>Error! Book's fetching is failed!</h1>
                       </div>`;
        console.error('Error. Try again');
      }
    } catch (e) {
      loading.style.display = 'none';
      console.error('Error: ', e.message);
    }
  }
};

const getPageContent = async () => {
  if(!localStorageUserData) {
    booksDiv.textContent = '';
    getLocalStorage();
  } else {
    getLocalStorage();
    await getCards();
  }
};

getPageContent();








