const mongoose =require("mongoose");
//using destructuring to pull out the schema from mongoose object
const { Schema } = mongoose;

//we use schema because mongoose removes the ability to creae random users with random attributes. mongoose wants to know

const userSchema = new Schema({

    googleID : {
        type : String
    },
    facebookID:{
        type: String
    }
});

//to tell mongoose to make a colletion 
//user is the name of the collectionand userSchema is the schema
mongoose.model('user',userSchema);



