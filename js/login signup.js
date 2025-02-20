function darkmode() {
  const body = document.body;
  body.classList.toggle("darkmode");

  const isDark = body.classList.contains("darkmode");
  localStorage.setItem("darkMode", isDark);

  const moon = document.getElementById("moon2");
  const sun = document.getElementById("sun2");

  if (moon && sun) {
    if (isDark) {
      moon.style.display = "none";
      sun.style.display = "block";
    } else {
      moon.style.display = "block";
      sun.style.display = "none";
    }
  }
}

window.addEventListener('load', () => {
  const isDark = localStorage.getItem("darkMode") === "true";
  const body = document.body;
  const moon = document.getElementById("moon2");
  const sun = document.getElementById("sun2");

  if (isDark) {
    body.classList.add("darkmode");
    if (moon && sun) {
      moon.style.display = "none";
      sun.style.display = "block";
    }
  } else {
    body.classList.remove("darkmode");
    if (moon && sun) {
      moon.style.display = "block";
      sun.style.display = "none";
    }
  }
});

//  Path: js/js.js

window.addEventListener("load", function() {
  const loader = document.getElementById('container-load');
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 500);
});
// document.getElementById('signup-form').addEventListener('submit', function(event) {
//   event.preventDefault(); // جلوگیری از ارسال فرم

//   const fullname = document.getElementById('fullname');
//   const email = document.getElementById('email');
//   const phone = document.getElementById('phone');
//   const password = document.getElementById('password');
//   const confirmPassword = document.getElementById('confirm-password');
//   let isValid = true;

//   // پاک کردن پیام‌های خطا
//   document.querySelectorAll('.error-message').forEach(function(el) {
//     el.remove();
//   });

//   // پاک کردن استایل خطا
//   document.querySelectorAll('.input-group input').forEach(function(input) {
//     input.style.border = '';
//   });

//   // اعتبارسنجی نام کامل
//   if (fullname.value.trim() === '') {
//     showError(fullname, 'نام کامل الزامی است');
//     isValid = false;
//   }

//   // اعتبارسنجی ایمیل
//   const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
//   if (!emailPattern.test(email.value)) {
//     showError(email, 'ایمیل معتبر نیست');
//     isValid = false;
//   }

//   // اعتبارسنجی شماره تلفن
//   const phonePattern = /^[0-9]{11}$/;
//   if (!phonePattern.test(phone.value)) {
//     showError(phone, 'شماره تلفن معتبر نیست');
//     isValid = false;
//   }

//   // اعتبارسنجی رمز عبور
//   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   if (!passwordPattern.test(password.value)) {
//     showError(password, 'رمز عبور باید حداقل 8 کاراکتر و شامل حروف بزرگ، حروف کوچک، اعداد و کاراکترهای خاص باشد');
//     isValid = false;
//   }

//   // اعتبارسنجی تکرار رمز عبور
//   if (password.value !== confirmPassword.value) {
//     showError(confirmPassword, 'رمز عبور و تکرار آن باید یکسان باشند');
//     isValid = false;
//   }

//   // اگر همه ورودی‌ها معتبر بودند، فرم ارسال شود
//   if (isValid) {
//     this.submit();
//   }
// });

// function showError(input, message) {
//   input.style.border = '1px solid red';
//   const error = document.createElement('div');
//   error.className = 'error-message';
//   error.style.color = 'red';
//   error.style.fontSize = '0.8rem';
//   error.textContent = message;
//   input.parentNode.appendChild(error);
// }




