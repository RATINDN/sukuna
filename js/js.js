  const menuBox = document.getElementById('menu-box' ); 
  const menuBox2 = document.getElementById('overlay2' );  
  const li1 = document.getElementById("li1");

  let ismenu=true;
  li1.addEventListener('click' ,()=>
    {
      menuBox.style.display ="flex" ;
  menuBox2.style.display ="flex";
  menuBox2.style.transition ="0.5s ease-in-out";
  menuBox2.style.height ="100%";
  body.style.overflow ="hidden";
  

  if(ismenu){
    ismenu=false;
  }

  else {
    menuBox.style.display ="none";
    menuBox2.style.transition ="0.5s ease-in-out";
    menuBox2.style.height ="0";
    body.style.overflow ="visible";
    ismenu=true;

  }
    }
    )
  



function toggleMenu(){
  menuBox.style.display ="flex" ;
  menuBox2.style.display ="flex";
  menuBox2.style.transition ="0.5s ease-in-out";
  menuBox2.style.height ="100%";
  body.style.overflow ="hidden";
}

   function closetoggleMenu(){
  menuBox.style.display ="none";
  menuBox2.style.transition ="0.5s ease-in-out";
  menuBox2.style.height ="0";
  body.style.overflow ="visible";


    }
  
  
 






    
  




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
const body = document.getElementById('body' );  
const mobile = document.getElementById('parent-mobile' );  






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




window.addEventListener("load", function () {
  document.getElementById("container20").style.display = "none";
  const load = document.getElementById("container-load")

  load.style.width = "100%"
  load.style.height = "0"

});


























// alert("Welcome to my shop" )


