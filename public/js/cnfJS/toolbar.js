const chat = document.querySelector(".chat");
const chatclose = document.querySelector(".crossBtn");
const mic = document.querySelector(".mic");
const video = document.querySelector(".video");
const infoBtn = document.querySelector(".info");
const infoConsole = document.querySelector(".options-main");
const closeInfoConsole = document.querySelector(".crossInfoBtn");
const mainRight = document.querySelector(".main_right").style;
const meetDetails = document.querySelector(".meetDetails");



let toggleInfo=true;
closeInfoConsole.addEventListener("click",()=>{
    infoConsole.style.display="none";
    toggleInfo=true;
})
infoBtn.addEventListener("click",()=>{
    if(toggleInfo){
        infoConsole.style.display="flex";
        toggleInfo=false;
    } else {
        infoConsole.style.display="none";
        toggleInfo=true;
    }
})



let toggleChat=true;
chatclose.addEventListener("click",()=>{
    mainRight.display="none";
    toggleChat=true;
})
chat.addEventListener("click",()=>{
    if(toggleChat){
        mainRight.display="block";
        toggleChat=false;
    } else {
        mainRight.display="none";
        toggleChat=true;
    }
})
let toggleMic=true;
mic.addEventListener("click",()=>{
    if(toggleMic){
        mic.innerHTML='<i class="fas fa-microphone-slash"></i>';
        toggleMic=false;
    } else {
        mic.innerHTML='<i class="fas fa-microphone"></i>';
        toggleMic=true;
    }
})
let toggleVideo=true;
video.addEventListener("click",()=>{
    if(toggleVideo){
        video.innerHTML='<i class="fas fa-video-slash"></i>';
        toggleVideo=false;
    } else {
        video.innerHTML='<i class="fas fa-video"></i>';
        toggleVideo=true;
    }
})