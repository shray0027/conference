const chat = document.querySelector(".chat");
const mic = document.querySelector(".mic");
const video = document.querySelector(".video");
const mainRight = document.querySelector(".main_right").style;
let toggleChat=true;
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
        mic.innerHTML='<i class="fas fa-microphone"></i>';
        toggleMic=false;
    } else {
        mic.innerHTML='<i class="fas fa-microphone-slash"></i>';
        toggleMic=true;
    }
})
let toggleVideo=true;
video.addEventListener("click",()=>{
    if(toggleVideo){
        video.innerHTML='<i class="fas fa-video"></i>';
        toggleVideo=false;
    } else {
        video.innerHTML='<i class="fas fa-video-slash"></i>';
        toggleVideo=true;
    }
})