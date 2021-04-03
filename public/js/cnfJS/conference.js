/*
                TO DO
                1) message delivered element
*/
const messages = document.querySelector(".messages-div"); 
const messageForm=document.querySelector(".messageForm");
const messageFormInput=document.querySelector("#input-chat");
const messageFormButton=document.querySelector(".send-div");
const messageTemplate=document.querySelector(".messageTemplate").innerHTML;
const disconnectTemplate=document.querySelector(".disconnectTemplate").innerHTML;
const joinTemplate=document.querySelector(".joinTemplate").innerHTML;
const {username , room}=Qs.parse(location.search,{ignoreQueryPrefix:true});
const socket= io();
socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error);
        location.href("/");
    }
});


socket.on('message',(message)=>{
    const html = Mustache.render(messageTemplate,{
        username:message.username,
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend',html);
    
});
console.log(1);
socket.on('connected',(message)=>{
    const html = Mustache.render(joinTemplate,{
        username:message.username,
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend',html);
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