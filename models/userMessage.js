const mongoose =  require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    name: {
        type: String
    },
    email:{
        type: String
    },
    message:{
        type: String
    }
});

module.exports = mongoose.model('Messages',messageSchema);
