import crypto from 'crypto';

class OrdersManager {
    static id = 0
    constructor() {
        this.orders = [];
    }
  
    createOrder(uid,  quantity, pid, state) {
        if (!uid ||!quantity || !pid ||  !state) {
        throw new Error("Error, todos los campos deben ser completados");
        }
       
        const order = {
           // id: crypto.randomBytes(12).toString("hex"),
            uid,
            quantity,
            pid,
            state,
        }
        order.id = OrdersManager.id++
        this.orders.push(order);
        return order;
    }

    readOrder() {
        console.log(this.orders)
        return this.orders;

    }
  
    readOneOrder(id) {
        const order = this.orders.find((order) => order.id === id);
        if (!order) {
            throw new Error("Error, no se encontró la order con el ID asignado");
        }
        return order;
    }
    removeOrderById(id) {
        let one = this.orders.find((each) => each.id === id);
        if (!one) {
          throw new Error("There isn't any order");
        }
        else {
          this.orders = this.orders.filter((each) => each.id !== id);
          console.log("deleted " + id);
          return id;
        }
    }
    upDate(id, dataQuantity,  dataState) {
  
        const one = this.readOneOrder(id);
        if (one) {
          one.quantity = dataQuantity; 
          one.state = dataState; 
            
          console.log('modificado user id :'+ id)
          console.log(this.orders)
        }else{
          console.log("no existe el id  ");
        }
      }
}

const managerOrder = new OrdersManager();
managerOrder.createOrder('fede', 10, 'vaso', '@@')
managerOrder.createOrder('edu', 30, 'pera','aa')
managerOrder.createOrder('yesi',50, 'silla', '@@')
managerOrder.readOrder()
console.log(managerOrder.readOneOrder(2));
//console.log(managerOrder.readOneOrder(2))

managerOrder.removeOrderById(2)
managerOrder.upDate(1,100000,'okkkkkkkkk')
managerOrder.readOrder()


 
 
 
  
  
 