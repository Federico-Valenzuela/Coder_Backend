import User from "./models/users.models.js"
import Event from "./models/events.models.js"
import Product from "./models/products.models.js"
import Order from "./models/orders.models.js"
import notFoundOne from "../../utils/notFoundOne.utils.js";

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
    async read(obj){
        try {
            let {filter, order} =obj
            // filter consulta de filtro
            // sort para ordenar
            //if (!order) order = {name: 1} //order x defecto
            //if (!filter) filter = {} //filtro x defecto
            const all = await this.model
            .find(filter)
            //.populate("uid")
            //.populate("pid")
            .sort(order)
            if (all.length ===0){
                const  error = new Error("there aren't document")
                error.statusCode = 404
                throw error
            }
            return all
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
}

const users = new MongoManager(User)
const events = new MongoManager(Event)
const products = new MongoManager(Product)
const orders = new MongoManager(Order)

export {users, events,products,orders}