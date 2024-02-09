import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const collection= "products"
const schema = new Schema({
    
    title: {type: String, required: true},
    photo: {type: String,default:"https://img.ecartelera.com/noticias/53400/53400-m.jpg"},
    stock: {type: Number, default: 100},
    price: {type: Number, default: 10},
},{timestamps: true});
schema.plugin(mongoosePaginate)

const Product = model(collection,schema)

export default Product