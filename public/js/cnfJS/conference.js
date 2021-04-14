

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

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true});

const socket= io();

const myPeer = new Peer(undefined,{
    host:'/',
    port:"443",
    path:'/peerjs'
});

// const myVideo=document.createElement('video');
// myVideo.muted = true;

// navigator.mediaDevices.getUserMedia({
//     video:true,
//     audio:true
// }).then(stream =>{
//     addVideoStream(myVideo,stream);
// });



document.title="Conference - "+room;



const usernameInitial=username.slice(0,1);

myPeer.on('open',id=>{
    console.log(id);
})

socket.emit('join',{username,avatarColor,room,usernameInitial},(error)=>{
    if(error){
        alert(error);
        location.href="/";
    }
});


socket.on('message',(message)=>{
    const html = Mustache.render(messageTemplate,{
        username:message.username,
        message:message.text,
        color:message.avatarColor,
        createdAt:moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend',html);

});
socket.on('connected',(message)=>{
    const html = Mustache.render(joinTemplate,{
        username:message.username,
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend',html);

})
socket.on('roomData',({users})=>{
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

function addVideoStream(video,stream){
    video.srcObject=stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videoGrid.append(video);
}