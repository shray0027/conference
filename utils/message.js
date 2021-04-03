const generateMessage = (username,text)=>{
    return {
        username,
        text,
        timestamp:new Date().getTime()
    }
}
module.exports={generateMessage};