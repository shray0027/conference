

const errorDIV = document.querySelector(".error-div");
const errorMSG = document.querySelector(".error-msg");
const cross = document.querySelector(".cross");
const error = localStorage.getItem("error");
if(error!==null){
    errorDIV.style.display="block";
    errorMSG.textContent=error;
    setTimeout(()=>{
        errorDIV.style.display="none";
        localStorage.removeItem("error");
    },5000);
}
cross.addEventListener("click",()=>{
    errorDIV.style.display="none";
})