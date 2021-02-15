const search = (name)=>{
   let index;
   for(let i=0;i<name.length;i++){
       if(name[i]=="@"){
            index=i;
            break;
       }
   }
   return name.slice(0,index);
}
module.exports=search;