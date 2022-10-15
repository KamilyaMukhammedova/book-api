const signInOpenBtn = document.getElementById('open-sign-in');
const logInOpenBtn = document.getElementById('open-log-in');
const signInModal = document.getElementById('sign-in-modal');
const logInModal = document.getElementById('log-in-modal');
const signInCloseBtn = document.getElementById('sign-in-close-btn');
const logInCloseBtn = document.getElementById('log-in-close-btn');

const userNameSignIn = document.getElementById('user-name-sign-in');
const userFirstNameSignIn = document.getElementById('user-first-name');
const userPasswordSignIn = document.getElementById('password-sign-in');
const userPasswordRepeatSignIn = document.getElementById('password-repeat');
const userAgeSignIn = document.getElementById('age');
const submitBtnSignIn = document.getElementById('sign-in-submit');
const errorPasswordRepeatSignIn = document.getElementById('errorPasswordRepeat');

const userNameLogIn = document.getElementById('user-name-log-in');
const userPasswordLogIn = document.getElementById('password-log-in');
const submitBtnLogIn = document.getElementById('log-in-submit');

const clearSignInForm = () => {
  userNameSignIn.value = '';
  userFirstNameSignIn.value = '';
  userPasswordSignIn.value = '';
  userPasswordRepeatSignIn.value = '';
  userAgeSignIn.value = '';
  submitBtnSignIn.disabled = true;
  errorPasswordRepeatSignIn.innerText = '';
  userNameSignIn.classList.remove('is-invalid');
  userPasswordSignIn.classList.remove('is-invalid');
  userPasswordRepeatSignIn.classList.remove('is-invalid');
};

const clearLogInForm = () => {
  userNameLogIn.value = '';
  userPasswordLogIn.value = '';
  submitBtnLogIn.disabled = true;
  userNameLogIn.classList.remove('is-invalid');
  userPasswordLogIn.classList.remove('is-invalid');
};

window.addEventListener('click', (event) => {
  if (event.target === signInModal) {
    signInModal.style.display = 'none';
    clearSignInForm();
  }
  if (event.target === logInModal) {
    logInModal.style.display = 'none';
    clearLogInForm();
  }
});

signInCloseBtn?.addEventListener('click', () => {
  signInModal.style.display = 'none';
  clearSignInForm();
});

signInOpenBtn?.addEventListener('click', () => {
  signInModal.style.display = 'block';
});

logInCloseBtn?.addEventListener('click', () => {
  logInModal.style.display = 'none';
  clearLogInForm();
});

logInOpenBtn?.addEventListener('click', () => {
  logInModal.style.display = 'block';
});