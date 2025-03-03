const menuBox = document.getElementById('menu-box'); 
const menuBox2 = document.getElementById('overlay2');  
const li1 = document.getElementById("li1");
const anotherButton = document.getElementById("move"); 
const bi_down = document.getElementById("bi-down");



// let ismenu = true;

// function openMenu() {
//   menuBox.style.display = "flex";
//   menuBox2.style.display = "flex";
//   menuBox2.style.transition = "0.5s ease-in-out";
//   menuBox2.style.height = "100%";
//   body.style.overflow = "hidden";
//   ismenu = false;
// }

// function closeMenu() {
//   menuBox.style.display = "none";
//   menuBox2.style.transition = "0.5s ease-in-out";
//   menuBox2.style.height = "0";
//   body.style.overflow = "visible";
//   ismenu = true;
// }




// li1.addEventListener('click', openMenu);
// anotherButton.addEventListener('click', openMenu); // Add event listener to the new button

// li1.addEventListener('dblclick', closeMenu);
// anotherButton.addEventListener('dblclick', closeMenu);

let ismenu = true;

function toggleMenu() {

  menuBox.style.display = "flex";
  menuBox2.style.display = "flex";
  menuBox2.style.transition = "0.5s ease-in-out";
  menuBox2.style.height = "100%";
  body.style.overflow = "hidden";
  bi_down.style.transform = "rotate(180deg)";

  if (ismenu) {
    ismenu = false;
  } else {
    menuBox.style.display = "none";
    menuBox2.style.transition = "0.5s ease-in-out";
    menuBox2.style.height = "0";
    body.style.overflow = "visible";
    ismenu = true;
    bi_down.style.transform = "rotate(0deg)";
  }
}

li1.addEventListener('click', toggleMenu);
anotherButton.addEventListener('click', toggleMenu); // Add event listener to the new button
  

    window.addEventListener('scroll', function() {
      const scrollBar = document.querySelector('.scroll');
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      
      // Use transform for better performance
      scrollBar.style.transform = `scaleX(${scrollPercentage})`;
    });
    



  // function closetoggleMenu(){
  // menuBox.style.display ="none";
  // menuBox2.style.transition ="0.5s ease-in-out";
  // menuBox2.style.height ="0";
  // body.style.overflow ="visible";


  //   }
  
  
 






    
  




const menu = document.getElementById("myMenu")
const overlay = document.getElementById('overlay')



 
function openNav() {
  menu.style.width = "40%";
  overlay.style.display = "flex"

}

function closeNav() {
  menu.style.width = "0%";
  overlay.style.display = 'none'




}




const closee = document.getElementById("close")
const openmenu = document.getElementById("openmenu")
const body = document.body;  
const mobile = document.getElementById('parent-mobile' );  
closee.addEventListener('click', closeNav2);






function opencar() {
  openmenu.style.height = "100vh";
  openmenu.style.width = "100%";
  mobile.style.height = "300px";
  mobile.style.width = "90%";
 

  body.style.overflow= " hidden ";




}

function closeNav2() {
  openmenu.style.height = "0%";
  openmenu.style.width = "0%";
  mobile.style.height = "0";
  mobile.style.width = "0";

  body.style.overflow = "  visible";


}

const mode = document.getElementById('mode' );  
const mode2 = document.getElementById('mode2' );  



// function darkmode(){
//   const element = document.body;
//   const nav = document.getElementById('nav');
//   const bow = document.getElementById('bow');
//   const reg = document.getElementById('register');
//   const scroll2 = document.getElementById('scroll');
//   const button1 = document.getElementById("button-read1");
//   const button2 = document.getElementById("button-read2");
//   const button3 = document.getElementById("button-read3");
//   const moon = document.getElementById("moon");
//   const sun = document.getElementById("sun");
//   const li1 = document.getElementById("li1");
//   const li2 = document.getElementById("li2");
//   const btn = document.getElementById("closebtn");
//   const veil2 = document.getElementById("veil2");
//   const lb1 = document.getElementById("lb1");
//   const lb2 = document.getElementById("lb2");
//   const boxing1 = document.getElementById("boxing1");
//   const boxing2 = document.getElementById("boxing2");
//   const boxing3 = document.getElementById("boxing3");
//   const boxing4 = document.getElementById("boxing4");
//   const boxing5 = document.getElementById("boxing5");
//   const boxing6 = document.getElementById("boxing6");
//   const boxing7 = document.getElementById("boxing7");
//   const search_box = document.getElementById("search-box")
//   const search=document.getElementById("search")
//   const search_box_2 = document.getElementById("search-box-2")
//   const search_2 = document.querySelector(".search-input")









//   sun.classList.toggle("const-sun");
//   moon.classList.toggle("const-moon");
// element.classList.toggle("dark-mode");
// nav.classList.toggle("dark-mode");
// bow.classList.toggle("const-bow");
// reg.classList.toggle("const-register");
// scroll2.classList.toggle("const-scroll");
// button1.classList.toggle("const-button2");
// button2.classList.toggle("const-button2");
// button3.classList.toggle("const-button2");
// li1.classList.toggle("const-li1");
// li2.classList.toggle("const-li2");
// btn.classList.toggle("const-closebtn");
// veil2.classList.toggle("const-veil2");
// lb1.classList.toggle("const-lb");
// lb2.classList.toggle("const-lb");
// menu.classList.toggle("const-menu");
// openmenu.classList.toggle("const-open");
// boxing1.classList.toggle("const-box");
// boxing2.classList.toggle("const-box");
// boxing3.classList.toggle("const-box");
// boxing4.classList.toggle("const-box");
// boxing5.classList.toggle("const-box");
// boxing6.classList.toggle("const-box");
// boxing7.classList.toggle("const-box");
// search_box.classList.toggle("const-search")
// search.classList.toggle("const-search-mode")
// search_box_2.classList.toggle("const-search")
// search_2.classList.toggle("const-search-mode")

   















// }


function darkmode() {
  const element = document.body;
  const myMenu = document.getElementById('myMenu');
  const nav = document.getElementById('nav');
  const bow = document.getElementById('bow');
  const reg = document.getElementById('register');
  const scroll2 = document.getElementById('scroll');
  const button1 = document.getElementById("button-read1");
  const button2 = document.getElementById("button-read2");
  const button3 = document.getElementById("button-read3");
  const moon = document.getElementById("moon");
  const sun = document.getElementById("sun");
  const li1 = document.getElementById("li1");
  const li2 = document.getElementById("li2");
  const btn = document.getElementById("closebtn");
  const veil2 = document.getElementById("veil2");
  const lb1 = document.getElementById("lb1");
  const lb2 = document.getElementById("lb2");
  const boxing1 = document.getElementById("boxing1");
  const boxing2 = document.getElementById("boxing2");
  const boxing3 = document.getElementById("boxing3");
  const boxing4 = document.getElementById("boxing4");
  const boxing5 = document.getElementById("boxing5");
  const boxing6 = document.getElementById("boxing6");
  const boxing7 = document.getElementById("boxing7");
  const search_box = document.getElementById("search-box");
  const search = document.getElementById("search");
  const search_box_2 = document.getElementById("search-box-2");
  const search_2 = document.querySelector(".search-input");
  const openmenu = document.getElementById("openmenu"); // Mobile menu

  const isDark = element.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
  sun.classList.toggle("const-sun");
  moon.classList.toggle("const-moon");
  nav.classList.toggle("dark-mode");
  bow.classList.toggle("const-bow");
  reg.classList.toggle("const-register");
  scroll2.classList.toggle("const-scroll");
  button1.classList.toggle("const-button2");
  button2.classList.toggle("const-button2");
  button3.classList.toggle("const-button2");
  li1.classList.toggle("const-li1");
  li2.classList.toggle("const-li2");
  btn.classList.toggle("const-closebtn");
  veil2.classList.toggle("const-veil2");
  lb1.classList.toggle("const-lb");
  lb2.classList.toggle("const-lb");
  boxing1.classList.toggle("const-box");
  boxing2.classList.toggle("const-box");
  boxing3.classList.toggle("const-box");
  boxing4.classList.toggle("const-box");
  boxing5.classList.toggle("const-box");
  boxing6.classList.toggle("const-box");
  boxing7.classList.toggle("const-box");
  search_box.classList.toggle("const-search");
  search.classList.toggle("const-search-mode");
  search_box_2.classList.toggle("const-search");
  search_2.classList.toggle("const-search-mode");
  openmenu.classList.toggle("const-menu"); // Toggle dark mode for mobile menu
  myMenu.classList.toggle("dark-mode");
}

window.addEventListener('load', () => {
  const isDark = localStorage.getItem("darkMode") === "true";
  const element = document.body;
  const nav = document.getElementById('nav');
  const bow = document.getElementById('bow');
  const reg = document.getElementById('register');
  const scroll2 = document.getElementById('scroll');
  const button1 = document.getElementById("button-read1");
  const button2 = document.getElementById("button-read2");
  const button3 = document.getElementById("button-read3");
  const moon = document.getElementById("moon");
  const sun = document.getElementById("sun");
  const li1 = document.getElementById("li1");
  const li2 = document.getElementById("li2");
  const btn = document.getElementById("closebtn");
  const veil2 = document.getElementById("veil2");
  const lb1 = document.getElementById("lb1");
  const lb2 = document.getElementById("lb2");
  const boxing1 = document.getElementById("boxing1");
  const boxing2 = document.getElementById("boxing2");
  const boxing3 = document.getElementById("boxing3");
  const boxing4 = document.getElementById("boxing4");
  const boxing5 = document.getElementById("boxing5");
  const boxing6 = document.getElementById("boxing6");
  const boxing7 = document.getElementById("boxing7");
  const search_box = document.getElementById("search-box");
  const search = document.getElementById("search");
  const search_box_2 = document.getElementById("search-box-2");
  const search_2 = document.querySelector(".search-input");
  const openmenu = document.getElementById("openmenu"); // Mobile menu
  const myMenu = document.getElementById('myMenu');

  if (isDark) {
    element.classList.add("dark-mode");
    sun.classList.add("const-sun");
    moon.classList.add("const-moon");
    nav.classList.add("dark-mode");
    bow.classList.add("const-bow");
    reg.classList.add("const-register");
    scroll2.classList.add("const-scroll");
    button1.classList.add("const-button2");
    button2.classList.add("const-button2");
    button3.classList.add("const-button2");
    li1.classList.add("const-li1");
    li2.classList.add("const-li2");
    btn.classList.add("const-closebtn");
    veil2.classList.add("const-veil2");
    lb1.classList.add("const-lb");
    lb2.classList.add("const-lb");
    boxing1.classList.add("const-box");
    boxing2.classList.add("const-box");
    boxing3.classList.add("const-box");
    boxing4.classList.add("const-box");
    boxing5.classList.add("const-box");
    boxing6.classList.add("const-box");
    boxing7.classList.add("const-box");
    search_box.classList.add("const-search");
    search.classList.add("const-search-mode");
    search_box_2.classList.add("const-search");
    search_2.classList.add("const-search-mode");
    openmenu.classList.add("const-menu"); // Apply dark mode to mobile menu
    myMenu.classList.add("dark-mode");
  } else {
    element.classList.remove("dark-mode");
    sun.classList.remove("const-sun");
    moon.classList.remove("const-moon");
    nav.classList.remove("dark-mode");
    bow.classList.remove("const-bow");
    reg.classList.remove("const-register");
    scroll2.classList.remove("const-scroll");
    button1.classList.remove("const-button2");
    button2.classList.remove("const-button2");
    button3.classList.remove("const-button2");
    li1.classList.remove("const-li1");
    li2.classList.remove("const-li2");
    btn.classList.remove("const-closebtn");
    veil2.classList.remove("const-veil2");
    lb1.classList.remove("const-lb");
    lb2.classList.remove("const-lb");
    boxing1.classList.remove("const-box");
    boxing2.classList.remove("const-box");
    boxing3.classList.remove("const-box");
    boxing4.classList.remove("const-box");
    boxing5.classList.remove("const-box");
    boxing6.classList.remove("const-box");
    boxing7.classList.remove("const-box");
    search_box.classList.remove("const-search");
    search.classList.remove("const-search-mode");
    search_box_2.classList.remove("const-search");
    search_2.classList.remove("const-search-mode");
    openmenu.classList.remove("const-menu"); // Remove dark mode from mobile menu
    myMenu.classList.remove("dark-mode");
  }
});



var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  grabCursor: true,
  loop: true,

  spaceBetween: 30,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },


});






window.addEventListener("load", function() {
  const loader = document.getElementById('container-load');
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 500); 
});



 


document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const boxes = document.querySelectorAll('.box');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    boxes.forEach(box => {
      const title = box.getAttribute('data-title').toLowerCase();
      if (title.includes(query)) {
        box.classList.remove('hide');
      } else { 
        box.classList.add('hide');
        
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-mobile');
  const boxes = document.querySelectorAll('.box-mobile');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    boxes.forEach(box => {
      const title = box.getAttribute('data-title').toLowerCase();
      if (title.includes(query)) {
        box.classList.remove('hide');
      } else { 
        box.classList.add('hide');
        
      }
    });
  });
});







window.addEventListener('scroll', function() {
  const pageUpButton = document.querySelector('.page-up');
  if (window.scrollY > 150) {   
    pageUpButton.style.width = '50px';
  } else {
    pageUpButton.style.width = '0';
  }
});

document.querySelector('.page-up').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'    
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const lorem = document.getElementById("lorem");
  const buttonRead2 = document.getElementById("button-read2");
  const defaultText = lorem.innerHTML; // ذخیره متن پیش‌فرض
  let isDefault = true; // وضعیت پیش‌فرض

  if (buttonRead2) {
    buttonRead2.addEventListener('click', function() {
      if (isDefault) {
        lorem.classList.add('hidden');
        setTimeout(() => {
          lorem.innerHTML += " ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی";
          lorem.classList.remove('hidden');
        }, 500);
        buttonRead2.textContent = "بستن"; // تغییر متن دکمه به "بستن"
      } else {
        lorem.classList.add('hidden');
        setTimeout(() => {
          lorem.innerHTML = defaultText; // بازگرداندن به متن پیش‌فرض
          lorem.classList.remove('hidden');
        }, 500);
        buttonRead2.textContent = "مطالعه بیشتر"; // تغییر متن دکمه به "مطالعه بیشتر"
      }
      isDefault = !isDefault; // تغییر وضعیت
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const lorem = document.getElementById("lorem2");
  const buttonRead3 = document.getElementById("button-read3");
  const defaultText = lorem.innerHTML; // ذخیره متن پیش‌فرض
  let isDefault = true; // وضعیت پیش‌فرض

  if (buttonRead3) {
    buttonRead3.addEventListener('click', function() {
      if (isDefault) {
        lorem.classList.add('hidden');
        setTimeout(() => {
          lorem.innerHTML += " ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی";
          lorem.classList.remove('hidden');
        }, 500);
        buttonRead3.textContent = "بستن"; // تغییر متن دکمه به "بستن"
      } else {
        lorem.classList.add('hidden');
        setTimeout(() => {
          lorem.innerHTML = defaultText; // بازگرداندن به متن پیش‌فرض
          lorem.classList.remove('hidden');
        }, 500);
        buttonRead3.textContent = "مطالعه بیشتر"; // تغییر متن دکمه به "مطالعه بیشتر"
      }
      isDefault = !isDefault; // تغییر وضعیت
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const lorem = document.getElementById("lorem3");
  const buttonRead1 = document.getElementById("button-read1");
  const defaultText = lorem.innerHTML; // ذخیره متن پیش‌فرض
  let isDefault = true; // وضعیت پیش‌فرض

  if (buttonRead1) {
    buttonRead1.addEventListener('click', function() {
      if (isDefault) {
        lorem.classList.add('hidden');
        setTimeout(() => {
          lorem.innerHTML += " ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی";
          lorem.classList.remove('hidden');
        }, 500);
        buttonRead1.textContent = "بستن"; // تغییر متن دکمه به "بستن"
      } else {
        lorem.classList.add('hidden');
        setTimeout(() => {
          lorem.innerHTML = defaultText; // بازگرداندن به متن پیش‌فرض
          lorem.classList.remove('hidden');
        }, 500);
        buttonRead1.textContent = "مطالعه بیشتر"; // تغییر متن دکمه به "مطالعه بیشتر"
      }
      isDefault = !isDefault; // تغییر وضعیت
    });
  }
});




const faviconLink = document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.href = 'images/favicon (1).ico'; 
faviconLink.type = 'image/x-icon';

document.head.appendChild(faviconLink);




// alert("Welcome to my shop" )


