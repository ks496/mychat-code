const Chat = require("../schemas/chat")


let chatInsert = async (params) => {
    let query = {
        user: {
            _id : params.sender_id
        },
    	receiver_id: params.receiver_id,
        sender_id: params.sender_id,
        text: params.text,
        createdAt: params.createdAt
    } 
    //console.log(query);  
    let add = new Chat(query)
    let result = await add.save()
   // console.log(result, "Result");
    return result
}
//function to list chat
let getChatList = async (params) => {
    //console.log(params,"kirti")
    let result= await Chat.find({
        $or : [
            {
                $and: [{receiver_id:params.receiver_id},{sender_id:params.sender_id}]
            },
            {
                $and: [{receiver_id:params.sender_id},{sender_id:params.receiver_id}]
            }
        ]
        }).sort({"createdAt":-1})
    return result
}



module.exports = {
    chatInsert,
    getChatList
};
