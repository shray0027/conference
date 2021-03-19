//DOM
const datePara=document.querySelector(".date-para");
const timePara=document.querySelector(".time-para");
const timeSpan=document.querySelector(".time-span");


// date formatting 

const date= new Date();
const year= date.getFullYear();
const months= ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const month=months[date.getMonth()];
const dateNo=date.getUTCDate();
const days=["SUN","MON","TUE","WED","THUR","FRI","SAT"];
const day=days[date.getUTCDay()];
datePara.textContent=day+" ,"+dateNo+" "+month+" "+year;

//time formatting

let time = new Date(); 
let hour = time.getHours(); 
let min = time.getMinutes(); 
let sec = time.getSeconds(); 
am_pm = "AM"; 
if (hour > 12) { 
     hour -= 12; 
     am_pm = "PM"; 
} 
if (hour == 0) { 
    hr = 12; 
    am_pm = "AM"; 
} 
hour = hour < 10 ? "0" + hour : hour; 
min = min < 10 ? "0" + min : min; 
sec = sec < 10 ? "0" + sec : sec; 
timePara.textContent=hour + ":"  + min;
timeSpan.textContent=am_pm; 
  
const menu = document.querySelector(".menu-btn");
const btn3 = document.querySelector(".btn3");
let show = false;

menu.addEventListener('click', toggleBtn);

function toggleBtn(){
    if(!show){
        btn3.style.zIndex="1";
        show=true;
    } 
    if(show){
        btn3.style.zIndex="-1";
        show=false;
    }
}