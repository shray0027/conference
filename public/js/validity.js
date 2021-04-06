const confirm_password=document.querySelector(".cpass");
const password=document.querySelector(".pass1");
const msg1=document.querySelector(".flashMsg1");

    
    function validation(){
        if(password.value != confirm_password.value){
            confirm_password.setCustomValidity("Password do not match !!");
        }
        else{
            confirm_password.setCustomValidity("");
        }
    }
    password.onchange =validation;
    confirm_password.onkeyup = validation;