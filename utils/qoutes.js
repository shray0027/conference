const request = require("request");
const qoutes = (callback) =>{
    const url ="https://api.quotable.io/random"
    request(url,{json:true},(err,body)=>{
        if(err){
           callback({
                content: "Happiness is when what you think, what you say, and what you do are in harmony.",
                author : "Mahatma Gandhi"
            });
        } else {
            callback({
                content : body.body.content,
                author : body.body.author});
        }
    });

}
module.exports=qoutes;