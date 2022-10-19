import {onFieldValidator, onUserPasswordRepeatValidator} from "./ fields-validator";
import {snackbarError, snackbarSuccess} from "./snackbar";
import {btnSpinner} from "./main";

const form = document.getElementById('sign-in-form');
const userName = document.getElementById('user-name-sign-in');
const userFirstName = document.getElementById('user-first-name');
const userPassword = document.getElementById('password-sign-in');
const userPasswordRepeat = document.getElementById('password-repeat');
const userAge = document.getElementById('age');
const submitBtn = document.getElementById('sign-in-submit');
const errorPasswordRepeat = document.getElementById('errorPasswordRepeat');
const signInModal = document.getElementById('sign-in-modal');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.innerHTML = btnSpinner;

  const userData = {
    username: userName.value,
    password: userPassword.value,
    firstName: userFirstName.value,
    age: userAge.value
  };

  try {
    const response = await fetch('http://localhost:1717/signin', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      submitBtn.innerText = 'Sign in';
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify({
        name: data.data.username,
        token: data.token
      }));

      snackbarSuccess('Sign in', true);
      setTimeout(() => {
        signInModal.style.display = 'none';
      }, 2200);

    } else {
      submitBtn.innerText = 'Sign in';
      snackbarError('Sign in', 'User name already exists. Try again!');
      console.error('Error. Try again!');
    }
  } catch (e) {
    console.error('Error: ', e.message);
  }
});

onFieldValidator('blur', submitBtn, userName, userPassword, userPasswordRepeat);
onFieldValidator('input', submitBtn, userName, userPassword, userPasswordRepeat);

onFieldValidator('blur', submitBtn, userPassword, userName, userPasswordRepeat);
onFieldValidator('input', submitBtn, userPassword, userName, userPasswordRepeat);

onUserPasswordRepeatValidator('blur', userPasswordRepeat, userName, userPassword, submitBtn, errorPasswordRepeat);
onUserPasswordRepeatValidator('input', userPasswordRepeat, userName, userPassword, submitBtn, errorPasswordRepeat);
