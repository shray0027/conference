let viewport = document.querySelector('meta[name="viewport"]');
console.log(viewport.content);
const desktopMode=()=>{
    viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
}




const messages = document.querySelector(".messages-div"); 
const messageForm=document.querySelector(".messageForm");
const messageFormInput=document.querySelector("#input-chat");
const messageFormButton=document.querySelector(".send-div");
const videoGrid=document.querySelector(".video-grid");
const messageTemplate=document.querySelector(".messageTemplate").innerHTML;
const disconnectTemplate=document.querySelector(".disconnectTemplate").innerHTML;
const usersDataTemplate=document.querySelector(".usersDataTemplate").innerHTML;
const joinTemplate=document.querySelector(".joinTemplate").innerHTML;
const partNoTemplate=document.querySelector(".partNoTemplate").innerHTML;
const avatarColor=localStorage.getItem('avatarColor');
const mainLeftVideo=document.querySelector(".main_left_video").innerHTML;
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true});
const usernameInitial=username.slice(0,1);
document.title="Conference - "+room;
//join part 
const copy = () => {
    const el = document.createElement('textarea');
    el.value =username+" invites you to join the Conference.\n\nMeet link : https://conference-jam.herokuapp.com\n\nRoom name :"+document.querySelector(".roomName").innerHTML+"\n\nConference is a video conferencing app developed by student of J.C.Bose university of technology,YMCA ,Faridabad."
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

const autoscroll = () => {
    // New message element
    const $newMessage = messages.lastElementChild
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    const visibleHeight = messages.offsetHeight
    const containerHeight = messages.scrollHeight

    const scrollOffset = messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight
    }
}

const socket= io();

const myPeer = new Peer(undefined,{
    host:'/',
    port:"443",
    path:'/peerjs'
});
myPeer.on('open',peerID=>{
    //console.log(peerID);

socket.emit('join',{username,avatarColor,room,usernameInitial},peerID,(error)=>{
    if(error){
        localStorage.setItem("error",error);
        location.href="/join";
    }
});

})

// chat sockets




socket.on('message',(message)=>{
    const html = Mustache.render(messageTemplate,{
        username:message.username,
        message:message.text,
        color:message.avatarColor,
        createdAt:moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend',html);
    autoscroll();
});
socket.on('socket-connected',(message,id)=>{
    const html = Mustache.render(joinTemplate,{
        username:message.username,
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend',html);

})
socket.on('roomData',({users,roomName})=>{
    document.querySelector(".roomName").innerHTML=roomName;
    const html = Mustache.render(usersDataTemplate,{
        users
    });
    document.querySelector(".main_right_chat_usr").innerHTML=html;
    const number= users.length;
    const htmlPart = Mustache.render(partNoTemplate,{
       number
    });
    document.querySelector(".participants").innerHTML=htmlPart;
})
socket.on('disconnected',(message)=>{
    const html = Mustache.render(disconnectTemplate,{
        username:message.username,
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend',html);
})

messageForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message = messageFormInput.value;
    messageFormButton.setAttribute('disabled','disabled');
    socket.emit("message",message,(error)=>{

        messageFormButton.removeAttribute('disabled');
        messageFormInput.value='';
        messageFormInput.focus();

        if(error){
           return  alert(error);
        }
    })
});




// video audeo part 

const peers={};
let myVideoStream;
const myVideo=document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream =>{
    myVideoStream=stream
    addVideoStream(myVideo,stream);
    myPeer.on('call',call=> {
          call.answer(stream); 
          const video = document.createElement('video');
          call.on('stream', userVideoStream=> {
            addVideoStream(video,userVideoStream);
      });
    });
    socket.on('peer-connected',(peerID)=>{
       // console.log("connected"+peerID);
        connectToNewUser(peerID,stream);
    })
});
socket.on('peer-disconnected',(peerID)=>{
   // console.log("disconnected"+peerID);
    if(peers[peerID]) peers[peerID].close()
})


function connectToNewUser(peerID,stream){
    const call = myPeer.call(peerID,stream)
    const video = document.createElement('video');
    call.on('stream',userVideoStream =>{
        addVideoStream(video,userVideoStream);
    })
    call.on('close',()=>{
        video.remove();
    })
    peers[peerID]=call;
    console.log(peers);
}
const muteUnmute = () => {
    let enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
    } else {
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  }
  
  const stopVideo = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getVideoTracks()[0].enabled = false;
    } else {
      myVideoStream.getVideoTracks()[0].enabled = true;
    }
  }

  function addVideoStream(video,stream){
    video.srcObject=stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videoGrid.append(video);
}


