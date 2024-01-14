import fs from "fs";
import crypto from "crypto";

class OrderManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.orders = [];
    this.init();
  }
  async createOrder(data) {
    try {
      //  if (!data.uid || !data.qid || !data.pid) {
      //    throw new Error("iud & quantity & pid & stateare required");
      //  }
      const order = {
        id: crypto.randomBytes(12).toString("hex"),
        uid: data.uid,
        quantity: data.quantity,
        pid: data.pid,
        state: data.state

      }
      this.orders.push(order);
      const jsonData = JSON.stringify(this.orders, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("create " + order.id);
      return order.id;
    } catch (error) {
      console.log(error.message)
      return error.message;
    }
  }
  readOrders() {
    try {
      if (this.orders.length === 0) {
        throw new Error("There are not orders!");
      } else {
        console.log(this.orders);
        return this.orders;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOrderById(id) {
    try {
      const one = this.orders.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any order with id=" + id);
      } else {
        console.log("read " + one);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async removeOrderById(id) {
    try {
      let one = this.orders.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any order");
      } else {
        this.orders = this.orders.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.orders, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("deleted " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async upDateOder(oid,dataQuantity, dataState) {
    try {
      const one = this.readOrderById(oid);
      if (one) {
        one.quantity = dataQuantity;
        one.state = dataState;
        const jsonData = JSON.stringify(this.orders, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log(`update order ${oid,one.quantity,one.state}`)
        return  one.quantity + one.state
      }else{
        throw new Error("There isn't any order");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  
  
}

const orders = new OrderManager("./src/data/fs/files/orders.json");
export default orders;
