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

// window.addEventListener("load", function() {
//   const loader = document.getElementById('container-load');
//   loader.style.opacity = '0';
//   setTimeout(() => {
//     loader.style.display = 'none';
//   }, 500);
// });

// Add this function at the end of your js.js file
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.container-load');
  if (!loader) return;

  // Function to hide the loader
  const hideLoader = () => {
    loader.style.opacity = '0'; // Fade out using the transition defined in CSS
    setTimeout(() => {
      loader.style.display = 'none'; // Remove from display after the transition
    }, 500); // Match the 0.5s transition duration in CSS
  };

  // Check for images
  const images = document.querySelectorAll('img');
  let loadedImages = 0;
  const totalImages = images.length;

  // If no images, wait for window.onload only
  if (totalImages === 0) {
    window.addEventListener('load', hideLoader);
    return;
  }

  // Track image loading
  const onImageLoad = () => {
    loadedImages++;
    if (loadedImages === totalImages) {
      hideLoader();
    }
  };

  // Monitor image loading
  images.forEach((img) => {
    if (img.complete) {
      onImageLoad();
    } else {
      img.addEventListener('load', onImageLoad);
      img.addEventListener('error', onImageLoad); // Handle broken images
    }
  });

  // Fallback: Ensure window.onload also triggers the loader hide
  window.addEventListener('load', () => {
    if (loadedImages === totalImages) {
      hideLoader();
    }
  });

  // Fallback timeout to prevent infinite loading
  setTimeout(() => {
    if (loader.style.display !== 'none') {
      hideLoader();
    }
  }, 10000); // 10 seconds timeout
});


const faviconLink = document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.href = 'images/favicon (1).ico'; 
faviconLink.type = 'image/x-icon';

document.head.appendChild(faviconLink);


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




