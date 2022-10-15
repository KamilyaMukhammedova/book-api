import {getLocalStorage} from "./local-storage";

const form = document.getElementById('sign-in-form');
const userName = document.getElementById('user-name-sign-in');
const userFirstName = document.getElementById('user-first-name');
const userPassword = document.getElementById('password-sign-in');
const userPasswordRepeat = document.getElementById('password-repeat');
const userAge = document.getElementById('age');
const submitBtn = document.getElementById('sign-in-submit');
const errorPasswordRepeat = document.getElementById('errorPasswordRepeat');
const signInModal = document.getElementById('sign-in-modal');


const onUserNameListener = (eventName) => {
  userName?.addEventListener(eventName, (event) => {
    if (event.target.value === '') {
      console.log('here')
      userName.classList.add('is-invalid');
      submitBtn.disabled = true;
    } else {
      userName.classList.remove('is-invalid');
      if (userPassword.value !== '' && userPasswordRepeat.value !== '') {
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
      if (userName.value !== '' && userPasswordRepeat.value !== '') {
        submitBtn.disabled = false;
      }
    }
  });
};

const onUserPasswordRepeatListener = (eventName) => {
  userPasswordRepeat?.addEventListener(eventName, (event) => {
    if (event.target.value === '') {
      userPasswordRepeat.classList.add('is-invalid');
      errorPasswordRepeat.innerText = 'The field is required *.';
      submitBtn.disabled = true;
    } else {
      userPasswordRepeat.classList.remove('is-invalid');
      if (userName.value !== '' && userPassword.value !== '') {

        submitBtn.disabled = false;
      }
      if (eventName === 'blur') {
        if (userPasswordRepeat.value !== userPassword.value) {
          userPasswordRepeat.classList.add('is-invalid');
          errorPasswordRepeat.innerText = 'Passwords should match.';
          submitBtn.disabled = true;
        } else {
          userPasswordRepeat.classList.remove('is-invalid');
          if (userName.value !== '') {
            submitBtn.disabled = false;
          }
        }
      }
    }
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

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
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify({
        name: data.data.username,
        token: data.token
      }));

      getLocalStorage();

      setTimeout(() => {
        signInModal.style.display = 'none';
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
onUserPasswordRepeatListener('blur');
onUserPasswordRepeatListener('input');