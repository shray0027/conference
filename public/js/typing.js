const type=document.querySelector(".outside_lvl2_p2_w_sBr_l2_ques_type");
const tag=document.querySelector(".tag");
const like=document.querySelector(".like");
var i = 0;
var txt = 'Simple , just enter the code.';
var speed = 50;
setTimeout(function typeWriter() {
    if (i < txt.length) {
      type.innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  },100);

  setTimeout(()=>{
    tag.style.display="block";
  }, 2000);
  