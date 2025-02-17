const menuBox = document.getElementById('menu-box'); 
const menuBox2 = document.getElementById('overlay2');  
const li1 = document.getElementById("li1");
const anotherButton = document.getElementById("move"); 



let ismenu = true;

function openMenu() {
  menuBox.style.display = "flex";
  menuBox2.style.display = "flex";
  menuBox2.style.transition = "0.5s ease-in-out";
  menuBox2.style.height = "100%";
  body.style.overflow = "hidden";
  ismenu = false;
}

function closeMenu() {
  menuBox.style.display = "none";
  menuBox2.style.transition = "0.5s ease-in-out";
  menuBox2.style.height = "0";
  body.style.overflow = "visible";
  ismenu = true;
}




li1.addEventListener('click', openMenu);
anotherButton.addEventListener('click', openMenu); // Add event listener to the new button

li1.addEventListener('dblclick', closeMenu);
anotherButton.addEventListener('dblclick', closeMenu);

// let ismenu = true;

// function toggleMenu() {

//   menuBox.style.display = "flex";
//   menuBox2.style.display = "flex";
//   menuBox2.style.transition = "0.5s ease-in-out";
//   menuBox2.style.height = "100%";
//   body.style.overflow = "hidden";

//   if (ismenu) {
//     ismenu = false;
//   } else {
//     menuBox.style.display = "none";
//     menuBox2.style.transition = "0.5s ease-in-out";
//     menuBox2.style.height = "0";
//     body.style.overflow = "visible";
//     ismenu = true;
//   }
// }

// li1.addEventListener('click', toggleMenu);
// anotherButton.addEventListener('click', toggleMenu); // Add event listener to the new button
  

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





const openmenu = document.getElementById("openmenu")
const body = document.body;  
const mobile = document.getElementById('parent-mobile' );  
openmenu.addEventListener('dblclick', closeNav2);






function opencar() {
  openmenu.style.height = "100%";
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



function darkmode(){
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
  const search_box = document.getElementById("search-box")
  const search=document.getElementById("search")
  const search_box_2 = document.getElementById("search-box-2")
  const search_2 = document.querySelector(".search-input")









  sun.classList.toggle("const-sun");
  moon.classList.toggle("const-moon");
element.classList.toggle("dark-mode");
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
menu.classList.toggle("const-menu");
openmenu.classList.toggle("const-open");
boxing1.classList.toggle("const-box");
boxing2.classList.toggle("const-box");
boxing3.classList.toggle("const-box");
boxing4.classList.toggle("const-box");
boxing5.classList.toggle("const-box");
boxing6.classList.toggle("const-box");
boxing7.classList.toggle("const-box");
search_box.classList.toggle("const-search")
search.classList.toggle("const-search-mode")
search_box_2.classList.toggle("const-search")
search_2.classList.toggle("const-search-mode")

















}



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



 

document.getElementById("search").addEventListener("input", function() {

  const query = this.value.toLowerCase();
  const listItems = document.querySelectorAll('h4');
  const box= document.querySelectorAll('.box');
  
  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    const Car = box[i];
    if (!item.textContent.toLowerCase().includes(query)) {
      item.style.display = 'none';
      Car.style.display = 'none';
    } else {
      item.style.display = 'block';
      Car.style.display = '';
    }
  }

});

document.getElementById("search-mobile").addEventListener("input", function() {

  const query = this.value.toLowerCase();
  const listItems = document.querySelectorAll('h4');
  const box= document.querySelectorAll('.box-mobile');
  
  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    const Car = box[i];
    if (!item.textContent.toLowerCase().includes(query)) {
      item.style.display = 'none';
      Car.style.display = 'none';
    } else {
      item.style.display = 'block';
      Car.style.display = '';
    }
  }

});






















// alert("Welcome to my shop" )


