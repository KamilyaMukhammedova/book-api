import {getLocalStorage} from "./local-storage";

const localStorageUserData = JSON.parse(localStorage.getItem('userData'));
const booksDiv = document.getElementById('booksDiv');
const url = window.location.href;

const getCard = async () => {
  if (localStorageUserData && (url === 'http://localhost:3000/index.html' || url === 'http://localhost:3000/')) {
    const userToken = localStorageUserData.token;
    booksDiv.innerHTML = '';

    try {
      const response = await fetch('http://localhost:1717/books', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': userToken
        }
      });

      if (response.ok) {
        const booksData = await response.json();

        booksData.forEach(book => {
          const card = document.createElement('div');
          card.className = 'col card';

          const linkDiv = document.createElement('div');
          linkDiv.id = book.id;
          linkDiv.innerHTML = `
                  <img src="${book.img}" class="card-img-top" alt="${book.name}">
                  <div class="card-body  h-100">
                      <h5 class="card-title">${book.name}</h5>
                      <p class="card-text">${book.author}</p>
                  </div>
          `;

          const cardFooter = document.createElement('div');
          cardFooter.className = 'card-footer mt-auto';

          const editBtn = document.createElement('button');
          editBtn.className = 'btn btn-secondary';
          editBtn.innerHTML = `<i class="bi bi-pencil"></i>`;

          const favoriteBtn = document.createElement('button');
          favoriteBtn.className = book.isFavorite ? 'btn btn-warning' : 'btn btn-dark';
          favoriteBtn.innerHTML = `<i class="bi bi-star"></i>`;

          const removeBtn = document.createElement('button');
          removeBtn.className = 'btn btn-danger';
          removeBtn.innerHTML = `<i class="bi bi-trash"></i>`;

          cardFooter.append(favoriteBtn, removeBtn, editBtn);

          card.append(linkDiv, cardFooter);


          linkDiv.addEventListener('click', () => {
            window.location.replace(`http://localhost:3000/one-book-info-page.html?book_id=${book.id}`);
          });

          editBtn.addEventListener('click', () => {
            window.location.replace(`http://localhost:3000/new-book-page.html?edit_book=${book.id}`);
          });

          removeBtn.addEventListener('click', async () => {
            console.log(book.id);
            try {
              const response = await fetch(`http://localhost:1717/books/delete/${book.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Auth': userToken
                }
              });

              if (response.ok) {
                await getCard();
              } else {
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
                  'X-Auth': userToken
                }
              });

              if (response.ok) {
                await getCard();
              } else {
                console.error('Error. Try again.');
              }
            } catch (e) {
              console.error(e);
            }
          });

          booksDiv.append(card);
        });

        console.log(booksData);
      } else {
        console.error('Error. Try again');
      }
    } catch (e) {
      console.error('Error: ', e.message);
    }

  }

};

const getAll = async () => {
  getLocalStorage();
  await getCard();
};

getAll();



