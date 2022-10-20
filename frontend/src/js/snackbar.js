export const snackbarSuccess = (text, redirect) => {
  const snackbar = document.getElementById('snackbar');

  snackbar.classList.add('snackbar_show');
  snackbar.innerHTML = `
                    <i class="bi bi-check-circle snackbar__icon snackbar_yellow"></i>
                    <p>${text} is successful!</p>
  `;
  setTimeout(() => {
    snackbar.classList.remove('snackbar_show');
    if (redirect) window.location.assign('http://localhost:3000/index.html');
  }, 2000);
};

export const snackbarError = (text, text2='') => {
  const snackbar = document.getElementById('snackbar');

  snackbar.classList.add('snackbar_show');
  snackbar.innerHTML = `
                    <i class="bi bi-x-circle snackbar__icon snackbar_red"></i>
                    <p>${text} is failed! ${text2}</p>
  `;
  setTimeout(() => {
    snackbar.classList.remove('snackbar_show');
  }, 3000);
};