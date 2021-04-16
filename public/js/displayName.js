const circleDiv = document.querySelector(".circle_profile");
const colors = ["#9a51e0","#2e9cdb","#2f80ed","#219653","#f2c94c","#f29a4b","#eb5757","#26AE60","#ff8882","#7b113a","#56776c","#822659","#6930c3","#008891","#fd3a69"] ;
const index=Math.floor(Math.random()*15);
console.log(index);
circleDiv.style.background=colors[index];
localStorage.setItem("avatarColor",colors[index]);