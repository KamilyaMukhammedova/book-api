import {snackbarSuccess} from "./snackbar";

const logOut = document.getElementById('log-out');

logOut.addEventListener('click', () => {
  localStorage.removeItem('userData');
  snackbarSuccess('Log out', true);
});