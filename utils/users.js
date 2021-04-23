conferenceUsers=[];
const addUser=({id,username,avatarColor,room,usernameInitial}) =>{
        username=username.trim().toLowerCase();
        room = room.trim().toLowerCase();
        
        
        if(!username || !room){
            return {
                error : "username or room feild is empty!"
            }
        }

        //check for existing user
        const existingUser = conferenceUsers.find((user)=>{
            return user.room===room && user.username===username;
        });
    
        //validate username 
        if(existingUser){
            return {
                error:"Username already exist in room!"
            }
        }
        const user = {id,username,avatarColor,room,usernameInitial}
        conferenceUsers.push(user)
        return {user}
}

const removeUser=(id)=>{
    const index = conferenceUsers.findIndex((user)=> user.id===id);
    if(index!==-1){
        return conferenceUsers.splice(index,1)[0];
    }
}

const getUser= (id)=>{
    return conferenceUsers.find((user)=>user.id===id)
}

const getUsersInRoom= (room)=>{
    return  conferenceUsers.filter((user)=>user.room===room).sort() 
}


module.exports={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
