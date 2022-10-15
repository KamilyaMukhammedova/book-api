import {getLocalStorage} from "./local-storage";

const logOut = document.getElementById('log-out');

logOut.addEventListener('click', () => {

  localStorage.removeItem('userData');

  getLocalStorage();


});