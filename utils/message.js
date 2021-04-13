const generateMessage = (username,avatarColor,text)=>{
    return {
        username,
        avatarColor,
        text,
        timestamp:new Date().getTime()
    }
}
module.exports={generateMessage};