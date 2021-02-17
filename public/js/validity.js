const confirm_password=document.querySelector(".cpass");
const password=document.querySelector(".pass1");
const msg1=document.querySelector(".flashMsg1");

// function validation(){
//     if(pass.value.length<12){
//         msg1.innerHTML="<i class='far fa-check-circle'></i> strong";
//         msg1.style.color="green";
//     }
//     if(pass.value.length<12){
//         msg1.innerHTML="<i class='fas fa-exclamation-triangle'></i> not strong";
//         msg1.style.color="yellow";
//     }
//         if(pass.value.length<8){
//             msg1.innerHTML="<i class='fas fa-exclamation-triangle'></i> too short";
//             msg1.style.color="red";
//         } 
        
//     }

    
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