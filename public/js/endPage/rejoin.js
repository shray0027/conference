const rejoinBtn = document.getElementById("rejoin");
const href = localStorage.previousMeeting;
rejoinBtn.setAttribute("onclick","window.location.href='"+href+"'");