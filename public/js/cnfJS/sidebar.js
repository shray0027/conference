const msg = document.querySelector(".messages");
const msgWindow = document.querySelector(".main_right_chat_msg").style;
const usr = document.querySelector(".participants");
const usrWindow = document.querySelector(".main_right_chat_usr").style;

msg.addEventListener("click",()=>{
    msg.classList.add("active");
    usr.classList.remove("active");
    msgWindow.display="block";
    usrWindow.display="none";
});
usr.addEventListener("click",()=>{
    usr.classList.add("active");
    msg.classList.remove("active");
    usrWindow.display="block";
    msgWindow.display="none";
})
