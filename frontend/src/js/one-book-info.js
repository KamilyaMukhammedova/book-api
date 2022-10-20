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

        const card = document.createElement('div');
        card.className = 'card col-7 mt-5 shadow p-3';
        const img = bookData.img ? bookData.img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-OmTQ0NVjb0MJC0wlCLmO5OGConYN8B32_w&usqp=CAU';
        card.innerHTML = `
             <img src="${img}" class="card-img-top h-auto" alt="${bookData.name}">
             <div class="card-body">
                <h2 class="card-title">" ${bookData.name} "</h2>
                <h5 class="card-title mb-4 text-warning">${bookData.author}</h5>
                <p class="card-text">${bookData.description}</p>
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