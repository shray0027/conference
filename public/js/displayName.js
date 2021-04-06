const circleDiv = document.querySelector(".circle_profile");
const colors = ["#9a51e0","#2e9cdb","#2f80ed","#219653","#f2c94c","#f29a4b","#eb5757","#26AE60"] ;
const index=Math.floor(Math.random()*8);
circleDiv.style.background=colors[index];