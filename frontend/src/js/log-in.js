import {onFieldValidator} from "./ fields-validator";
import {snackbarError, snackbarSuccess} from "./snackbar";
import {btnSpinner} from "./main";

const form = document.getElementById('log-in-form');
const userName = document.getElementById('user-name-log-in');
const userPassword = document.getElementById('password-log-in');
const submitBtn = document.getElementById('log-in-submit');
const logInModal = document.getElementById('log-in-modal');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.innerHTML = btnSpinner;

  const userData = {
    username: userName.value,
    password: userPassword.value,
  };

  try {
    const response = await fetch('http://localhost:1717/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      submitBtn.innerText = 'Log in';
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify({
        name: data.data.username,
        token: data.token
      }));

      snackbarSuccess('Log in', true);
      setTimeout(() => {
        logInModal.style.display = 'none';
      }, 2200);

    } else {
      submitBtn.innerText = 'Log in';
      snackbarError('Log in', `User name or password are wrong. Try again!`);
      console.error('Error. Try again');
    }
  } catch (e) {
    console.error('Error: ', e.message);
  }
});

onFieldValidator('blur', submitBtn, userName, userPassword);
onFieldValidator('input', submitBtn, userName, userPassword);

onFieldValidator('blur',  submitBtn, userPassword, userName);
onFieldValidator('input',  submitBtn, userPassword, userName);