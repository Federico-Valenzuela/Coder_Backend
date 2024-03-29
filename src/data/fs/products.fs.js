import fs from "fs";
import crypto from "crypto";

class ProductManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }
  async createProduct(data) {
    try {
      // if (!data.title || !data.photo || !data.price || !data.stock) {
      //   throw new Error("Name & Place are required");
      // }
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      this.products.push(product);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("create " + product.id);
      return product.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readProducts() {
    try {
      if (this.products.length === 0) {
        throw new Error("There are not products!");
      } else {
        console.log(this.products);
        return this.products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readProductById(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any product with" +`${id}`);
      } else {
        console.log("read " + one);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async upDateProduct(pid, dataStock,dataPrice) {
    try {
      const one = this.readProductById(pid);
      if (one) {
        one.stock = dataStock;
        one.price = dataPrice;
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log(`update product ${pid,one.stock,one.price}`)
        return  one.stock + one.price
      }else{
        throw new Error("There isn't any product");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }


  async removeProductById(id) {
    try {
      let one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any product");
      } else {
        this.products = this.products.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("deleted " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const products = new ProductManager("./src/data/fs/files/products.json");
export default products;