import User from "./models/users.models.js";
import Event from "./models/events.models.js";
import Product from "./models/products.models.js";
import Order from "./models/orders.models.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";
import {Types} from  "mongoose";

class MongoManager{
    constructor(model){
        this.model = model;
    }
    async create(data){
        try {
            const one = await this.model.create(data)
            return one._id
        } catch (error) {
            throw error
        }
    }
    async read({filter, orderAndPaginate}){
        try {

            const all = await this.model
            .paginate(filter, orderAndPaginate)
            //console.log(all.docs);
            // .find(filter)
            // .sort(order)
             if (all.totalPages.length ===0){
                 const  error = new Error("there aren't document")
                 error.statusCode = 404
                 throw error
             }
            return all
        } catch (error) {
            throw error
        }
    }
    async reportBill(uid){
        try {
            const report = await this.model.aggregate([
                {$match:{user_id: new Types.ObjectId(uid)}},
                {$lookup:{
                    from:"products",
                    foreignField: "_id",
                    localField: "product_id",
                    as:"product_id"
                }},
                {$replaceRoot: {
                     newRoot: {
                         $mergeObjects: [ {
                             $arrayElemAt: ["$product_id", 0]}, "$$ROOT"]
                        }
                    }
                },
                {$set: {subtotal:{$multiply:["$price","$quantity"]}}},
                {$group:{_id:"$user_id",total:{$sum:"$subtotal"}}},
                {$project:{_id:false, user_id:"_id",total:"$total",date:new Date(), currency:"USD"}},
                //{$merge:{into:"bills"}}
                ])
            return report
        } catch (error) {
            throw error
        }
    }

    async readOne(id) {
        try {
          const one = await this.model.findById(id);
          notFoundOne(one)
          return one
          
        } catch (error) {
          throw error;
        }
      }
    async update(id, data){
        try {
            const opt  = {new : true}
            //devuelve el objeto luego de la modificacion sino me traeria el mismo
            const  one = await this.model.findByIdAndUpdate(id, data, opt)
            notFoundOne(one)  
            return one
        } catch (error) {
            throw error
        }
        
    }
    async destroy(id){
        try {
            const  one = await this.model.findByIdAndDelete(id)
            notFoundOne(one) 
            return one
        } catch (error) {
            throw error
        }
    }

    async stats({ filter }) {
        try {
          let stats = await this.model.find(filter).explain("executionStats");
          console.log(stats);
          stats = {
            quantity: stats.executionStats.nReturned,
            time: stats.executionStats.executionTimeMillis,
          };
          return stats;
        } catch (error) {
          throw error;
        }
      }
}

const users = new MongoManager(User)
const events = new MongoManager(Event)
const products = new MongoManager(Product)
const orders = new MongoManager(Order)

export {users, events,products,orders}