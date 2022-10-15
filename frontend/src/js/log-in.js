import {getLocalStorage} from "./local-storage";

const form = document.getElementById('log-in-form');
const userName = document.getElementById('user-name-log-in');
const userPassword = document.getElementById('password-log-in');
const submitBtn = document.getElementById('log-in-submit');
const logInModal = document.getElementById('log-in-modal');


const onUserNameListener = (eventName) => {
  userName?.addEventListener(eventName, (event) => {
    if (event.target.value === '') {
      userName.classList.add('is-invalid');
      submitBtn.disabled = true;
    } else {
      userName.classList.remove('is-invalid');
      if (userPassword.value !== '') {
        submitBtn.disabled = false;
      }
    }
  });
};

const onUserPasswordListener = (eventName) => {
  userPassword?.addEventListener(eventName, (event) => {
    if (event.target.value === '') {
      userPassword.classList.add('is-invalid');
      submitBtn.disabled = true;
    } else {
      userPassword.classList.remove('is-invalid');
      if (userName.value !== '') {
        submitBtn.disabled = false;
      }
    }
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

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
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify({
        name: data.data.username,
        token: data.token
      }));

      getLocalStorage();

      setTimeout(() => {
        logInModal.style.display = 'none';
      }, 1500);

    } else {
      console.error('Error. Try again');
    }
  } catch (e) {
    console.error('Error: ', e.message);
  }
});


onUserNameListener('blur');
onUserNameListener('input');
onUserPasswordListener('blur');
onUserPasswordListener('input');