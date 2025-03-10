document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault(); // جلوگیری از ارسال فرم

  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  let isValid = true;

  // پاک کردن پیام‌های خطا
  document.querySelectorAll('.error-message').forEach(function(el) {
    el.remove();
  });

  // پاک کردن استایل خطا
  document.querySelectorAll('.input-group input').forEach(function(input) {
    input.style.border = '';
  });

  // اعتبارسنجی نام کامل
  if (fullname.value.trim() === '') {
    showError(fullname, 'نام کامل الزامی است');
    isValid = false;
  }

  // اعتبارسنجی ایمیل
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!emailPattern.test(email.value)) {
    showError(email, 'ایمیل معتبر نیست');
    isValid = false;
  }

  // اعتبارسنجی شماره تلفن
  const phonePattern = /^[0-9]{11}$/;
  if (!phonePattern.test(phone.value)) {
    showError(phone, 'شماره تلفن معتبر نیست');
    isValid = false;
  }

  // اعتبارسنجی رمز عبور
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordPattern.test(password.value)) {
    showError(password, 'رمز عبور باید حداقل 8 کاراکتر و شامل حروف بزرگ، حروف کوچک و اعداد باشد');
    isValid = false;
  }

  // اعتبارسنجی تکرار رمز عبور
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'رمز عبور و تکرار آن باید یکسان باشند');
    isValid = false;
  }

  // اگر همه ورودی‌ها معتبر بودند، فرم ارسال شود
  if (isValid) {
    this.submit();
  }
});

function showError(input, message) {
  // پاک کردن پیام خطای موجود
  clearError(input);

  input.style.border = '1px solid red';
  const error = document.createElement('div');
  error.className = 'error-message';
  error.style.color = 'red';
  error.style.fontSize = '0.8rem';
  error.textContent = message;
  input.parentNode.appendChild(error);
}

function clearError(input) {
  input.style.border = '';
  const error = input.parentNode.querySelector('.error-message');
  if (error) {
    error.remove();
  }
}

document.querySelectorAll('.input-group input').forEach(function(input) {
  input.addEventListener('input', function() {
    clearError(input);
    validateInput(input);
  });
  input.addEventListener('blur', function() {
    validateInput(input);
  });
});

function validateInput(input) {
  const id = input.id;
  const value = input.value.trim();

  if (id === 'fullname' && value === '') {
    showError(input, 'نام کامل الزامی است');
  }

  if (id === 'email') {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(value)) {
      showError(input, 'ایمیل معتبر نیست');
    }
  }

  if (id === 'phone') {
    const phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(value)) {
      showError(input, 'شماره تلفن معتبر نیست');
    }
  }

  if (id === 'password') {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(value)) {
      showError(input, 'رمز عبور باید حداقل 8 کاراکتر و شامل حروف بزرگ، حروف کوچک و اعداد باشد');
    }
  }

  if (id === 'confirm-password') {
    const password = document.getElementById('password').value;
    if (value !== password) {
      showError(input, 'رمز عبور و تکرار آن باید یکسان باشند');
    }
  }
}



document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // جلوگیری از ارسال فرم

  const email = document.getElementById('email');
  const password = document.getElementById('password');
  let isValid = true;

  // پاک کردن پیام‌های خطا
  document.querySelectorAll('.error-message').forEach(function(el) {
    el.remove();
  });

  // پاک کردن استایل خطا
  document.querySelectorAll('.input-group input').forEach(function(input) {
    input.style.border = '';
  });

  // اعتبارسنجی ایمیل
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!emailPattern.test(email.value)) {
    showError(email, 'ایمیل معتبر نیست');
    isValid = false;
  }

  // اعتبارسنجی رمز عبور
  if (password.value.length < 8) {
    showError(password, 'رمز عبور باید حداقل 8 کاراکتر باشد');
    isValid = false;
  }

  // اگر همه ورودی‌ها معتبر بودند، فرم ارسال شود
  if (isValid) {
    this.submit();
  }
});



