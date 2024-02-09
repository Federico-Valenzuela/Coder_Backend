import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const collection= "orders"
// en ingles representativo y minuscula
const schema = new Schema({
    
    user_id: {type: Types.ObjectId, required: true, ref: "users"},
    product_id : {type: Types.ObjectId, required: true, ref:"products"},
    quantity: {type: Number, default:1},
    state: {
        type: String,
        enum:["reserved","payed", "delivered"],
        default: "reserved"
    },
    
    
},{timestamps: true});// sellos de tiempo
schema.pre("find", function () {
    this.populate("user_id", "-password -createdAt -updatedAt -__v");
  });
  schema.pre("find", function () {
    this.populate("product_id", "title stock price");
  });
  schema.plugin(mongoosePaginate)

const Order = model(collection,schema)

export default Order