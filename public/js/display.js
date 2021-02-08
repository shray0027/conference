const div_login=document.querySelector(".auth-page-login");
const div_signup=document.querySelector(".auth-page-signup");
const div_main=document.querySelector(".auth-page-main")

const login=()=>{
    div_main.style.display="none";
    div_signup.style.display="none";
    div_login.style.display="flex";
}
const signup=()=>{
    div_main.style.display="none";
    div_login.style.display="none";
    div_signup.style.display="flex";
}
const back=()=>{
    div_main.style.display="flex";
    div_login.style.display="none";
    div_signup.style.display="none";
}