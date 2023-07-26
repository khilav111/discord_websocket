const Moment=require("moment");
function formatmessage(username,text){//this function will format the things we want to show ;
    return {
        username,
        text,
        time:Moment().format('h:mm a')// used for showing the current time;
    }
}
module.exports=formatmessage;