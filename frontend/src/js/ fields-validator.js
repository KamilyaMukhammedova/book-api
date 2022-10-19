export const onFieldValidator = (eventName, btn, field1, field2, field3=field2) => {
  field1.addEventListener(eventName, (event) => {
    if (event.target.value === '') {
      field1.classList.add('is-invalid');
      btn.disabled = true;
    } else {
      field1.classList.remove('is-invalid');
      if (field2.value !== '' && field3.value !== '') {
        btn.disabled = false;
      }
    }
  });
};

export const onUserPasswordRepeatValidator = (eventName, field1, field2, field3, btn, error) => {
  field1.addEventListener(eventName, (event) => {
    if (event.target.value === '') {
      field1.classList.add('is-invalid');
      error.innerText = 'The field is required *.';
      btn.disabled = true;
    } else {
      field1.classList.remove('is-invalid');
      if (field2.value !== '' && field3.value !== '') {
        btn.disabled = false;
      }
      if (eventName === 'blur') {
        if (field1.value !== field3.value) {
          field1.classList.add('is-invalid');
          error.innerText = 'Passwords should match.';
          btn.disabled = true;
        } else {
          field1.classList.remove('is-invalid');
          if (field2.value !== '') {
            btn.disabled = false;
          }
        }
      }
    }
  });
};