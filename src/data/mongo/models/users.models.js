import { model, Schema } from "mongoose";

const collection= "users"
const schema = new Schema({
    
    name: {type: String, required: true},
    last_name: {type: String},
    email: {type: String, required: true, unique: true},
    password : {type: String, required: true},
    age: {type: Number, default:18},
    date: {type: Date, default: new Date()},
    photo: {type: String,default:"https://www.pngkit.com/png/full/888-8880443_pensando-especialmente-en-las-personas-con-movilidad-imagenes.png"} 
    
},{timestamps: true});

const User = model(collection,schema)

export default User