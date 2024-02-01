import { model, Schema } from "mongoose";

const collection= "events"
const schema = new Schema({
    
    title: {type: String, required: true},
    place: {type: String},
    img: {type: String,default:"https://img.ecartelera.com/noticias/53400/53400-m.jpg"},
    capacity: {type: Number, default: 50},
    price: {type: Number, default: 10},
    date: {type: Date, default: new Date()},
},{timestamps: true});

const Event = model(collection,schema)

export default Event