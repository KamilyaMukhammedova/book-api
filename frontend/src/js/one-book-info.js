const localStorageUserData = JSON.parse(localStorage.getItem('userData'));
const url = window.location.href;
const bookFullInfo = document.getElementById('book-full-info');

document.addEventListener('DOMContentLoaded',  async () => {
  if(localStorageUserData && url.includes('one-book-info-page.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('book_id');
    const userToken = localStorageUserData.token;

    try {
      const response = await fetch(`http://localhost:1717/books/${bookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': userToken
        }
      });

      if (response.ok) {
        const bookData = await response.json();
        console.log(bookData);

        const card = document.createElement('div');
        card.className = 'card col-9';

        card.innerHTML = `
              <div class="row g-0">
                 <div class="col-md-4">
                   <img src="${bookData.img}" class="img-fluid rounded-start" alt="${bookData.name}">
                 </div>
               <div class="col-md-8">
                 <div class="card-body">
                     <h5 class="card-title">${bookData.name}</h5>
                     <p class="card-text">${bookData.author}</p>
                     <p class="card-text">${bookData.description}</p>
                     <p class="card-text">
                       <small class="text-muted">${bookData.publishYear} | ${bookData.publishHouse}</small>
                     </p>
                 </div>
               </div>
              </div>
        `;

        bookFullInfo.append(card);
      } else {
        console.error('Error. Try again');
      }
    } catch (e) {
      console.error('Error: ', e.message);
    }

  }

});