import { model, Schema } from "mongoose";

const collection= "products"
const schema = new Schema({
    
    title: {type: String, required: true},
    photo: {type: String,default:"https://img.ecartelera.com/noticias/53400/53400-m.jpg"},
    stock: {type: Number, default: 100},
    price: {type: Number, default: 10},
},{timestamps: true});

const Product = model(collection,schema)

export default Product