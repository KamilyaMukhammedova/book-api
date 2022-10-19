export const getLocalStorage = () => {
  const localStorageUserData = JSON.parse(localStorage.getItem('userData'));
  const currentUserName = document.getElementById('currentUserName');
  const logOut = document.getElementById('log-out');
  const signInOpenBtn = document.getElementById('open-sign-in');
  const logInOpenBtn = document.getElementById('open-log-in');
  const addNewBookLink = document.getElementById('add-new-book-link');
  const homeLink = document.getElementById('home-link');

  if(localStorageUserData === null) {
    logOut.style.display = 'none';
    signInOpenBtn.style.display = 'block';
    logInOpenBtn.style.display = 'block';
    addNewBookLink.style.display = 'none';
    homeLink.style.display = 'none';
    currentUserName.textContent = '';
  } else {
    logOut.style.display = 'block';
    signInOpenBtn.style.display = 'none';
    logInOpenBtn.style.display = 'none';
    addNewBookLink.style.display = 'block';
    homeLink.style.display = 'block';
    currentUserName.textContent = `Hello, ${localStorageUserData.name}`;
  }
};