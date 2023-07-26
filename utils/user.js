const users=[];
//join the user to the chat
 const userJoin=(id,username,room)=>{
const user={id,username,room};
users.push(user);
return user;
}
//find the current user;
function getuser(id) {
    return users.find(user=>user.id===id);
  }
  
  function leaveuser(id){
    const ind=users.findIndex(user=>user.id===id);
    if(ind!==-1){
        return users.splice(ind,1)[0];//retuns 1 element of array from the index
    }
  }
  function getRoomUsers(room) {
    return users.filter(user => user.room === room);
  }
module.exports={
    userJoin,
    getuser,
    leaveuser,
    getRoomUsers,
} ;