import {getLocalStorage} from "./local-storage";

const localStorageUserData = JSON.parse(localStorage.getItem('userData'));
const booksDiv = document.getElementById('booksDiv');
const url = window.location.href;


document.addEventListener('DOMContentLoaded',  async () => {
  getLocalStorage();

  if(localStorageUserData && (url === 'http://localhost:3000/index.html' || url === 'http://localhost:3000/' )) {
    const userToken = localStorageUserData.token;

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
          card.className = 'col book-card';
          card.id = book.id;

          card.innerHTML = `
              <div class="card h-100">
                <img src="${book.img}" class="card-img-top" alt="${book.name}">
                <div class="card-body">
                  <h5 class="card-title">${book.name}</h5>
                  <p class="card-text">${book.author}</p>
                </div>
                <div class="card-footer">
                  <button class="btn btn-dark mb-2 mt-1 read-more">Read more</button>
                  <div class="mb-1">
                     <button class="btn btn-secondary"><i class="bi bi-pencil"></i></button>
                     <button class="btn btn-dark"><i class="bi bi-star"></i></button>
                     <button class="btn btn-danger"><i class="bi bi-trash"></i></button>  
                  </div>
                </div>
              </>
          `;

          card.addEventListener('click', (event) => {
            localStorage.setItem('bookId', JSON.stringify(event.currentTarget.id));
            window.location.replace(`http://localhost:3000/one-book-info-page.html?book_id=${event.currentTarget.id}`)
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
});

