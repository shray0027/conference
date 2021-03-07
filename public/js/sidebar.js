const chat_Btn = document.querySelector(".chat_on");
const mainChat=document.querySelector(".main__chat");
let clicked=false;
chat_Btn.addEventListener("click",()=>{
    if(clicked){
        mainChat.style.display="none";
        mainChat.style.width="0px";
        clicked=false;
    } else {
    mainChat.style.display="flex";
    mainChat.style.width="300px";
    clicked=true;
    }
})