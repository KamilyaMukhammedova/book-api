import {getLocalStorage} from "./local-storage";

document.addEventListener('DOMContentLoaded',  () => {
  getLocalStorage();
});

console.log(window.location.href)