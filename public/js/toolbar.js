const videoBtn = document.querySelector(".video_on");
const micBtn = document.querySelector(".mic_on");
const chatBtn = document.querySelector(".chat_on");
const infoBtn= document.querySelector(".info_on");
const participantBtn= document.querySelector(".participants_on");
const settingBtn= document.querySelector(".settings_on");
const settingIcon=document.querySelector(".fa-cog");
let videoOn=true; 
const closeVideo=()=>{
    if(videoOn){
        videoBtn.innerHTML="<i class='fas fa-video-slash'></i>";
        videoBtn.classList.add("off");
        videoBtn.classList.remove("on");
        videoOn=false;
    } else{
        videoBtn.innerHTML="<i class='fas fa-video'></i>";
        videoBtn.classList.add("on");
        videoBtn.classList.remove("off");
        videoOn=true;
    }
}
let micOn=true;
const closeMic=()=>{
    if(micOn){
        micBtn.innerHTML="<i class='fas fa-microphone-slash'></i>";
        micBtn.classList.add("off");
        micBtn.classList.remove("on");
        micOn=false;
    } else {
        micBtn.innerHTML='<i class="fas fa-microphone"></i>';
        micBtn.classList.add("on");
        micBtn.classList.remove("off");
        micOn=true;
    }
}
let chatOn=true;
const closeMsg=()=>{
    if(chatOn){
        chatBtn.classList.add("offBlue");
        chatBtn.classList.remove("on");
        chatOn=false;
    } else {
        chatBtn.classList.add("on");
        chatBtn.classList.remove("offBlue");
        chatOn=true;
    }
}
let infoOn=true;
const showInfo=()=>{
    if(infoOn){
        infoBtn.classList.add("offBlue");
        infoBtn.classList.remove("on");
        infoOn=false;
    } else {
        infoBtn.classList.add("on");
        infoBtn.classList.remove("offBlue");
        infoOn=true;
    }
}
let settingOn=true;
const showSettings=()=>{
    if(settingOn){
        settingBtn.classList.add("offGreen");
        settingBtn.classList.remove("on");
        settingIcon.classList.add("rotate");
        settingOn=false;
    } else {
        settingBtn.classList.add("on");
        settingBtn.classList.remove("offGreen");
        settingIcon.classList.remove("rotate");
        settingOn=true;
    }
}
let participantOn=true;
const showParticipants=()=>{
    if(participantOn){
        participantBtn.classList.add("offGreen");
        participantBtn.classList.remove("on");
        participantOn=false;
    } else {
        participantBtn.classList.add("on");
        participantBtn.classList.remove("offGreen");
        participantOn=true;
    }
}