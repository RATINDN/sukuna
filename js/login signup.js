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


