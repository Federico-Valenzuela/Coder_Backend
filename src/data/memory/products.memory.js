import crypto from 'crypto';

class ProductManager {
  static id= 0
    
    constructor() {
        this.products = [];
    }
  
    readP() {
        return this.products;
    }
  
    createDataP(title,  photo, price, stock) {
        if (!title ||!photo || !price ||  !stock) {
        throw new Error("Error, todos los campos deben ser completados");
        }

        const product = {
        title,
        photo,
        price,
        stock,
        };
        //product.id = crypto.randomBytes(12).toString("hex")
        product.id = ProductManager.id++;
        this.products.push(product);
        return product;
    }
    readP() {
      return this.products;
  }
  
    readOneP(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error("Error, no se encontró el producto con el ID asignado");
        }
        return product;
    }
    removeProductById(id) {
        let one = this.products.find((each) => each.id === id);
        if (!one) {
          throw new Error("There isn't any product");
        }
        else {
          this.users = this.products.filter((each) => each.id !== id);
          console.log("deleted " + id);
          return id;
        }
    }
  upDate(id, dataTitle, dataPhoto, dataPrice, dataStock) {
  
    const one = this.readOneP(id);
    if (one) {
      one.title = dataTitle; 
      one.price = dataPrice; 
      one.stock = dataStock;
      one.Photo = dataPhoto;  
      console.log('modificado user id :'+ id)
      console.log(this.users)
    }else{
      console.log("no existe el id  ");
    }
  }
}

const managerP = new ProductManager()
managerP.createDataP('pera','ruta de foto', 10, 20)
managerP.createDataP('silla','ruta de foto', 30, 40)
managerP.createDataP('mesa','ruta de foto',50, 60)
//console.log(managerP.readP(1));
console.log(managerP.readP())
managerP.removeProductById(2)
managerP.readP()
managerP.upDate(1,'xx', 'yyyy','zzzz', 40)

 
 
 
  
  
 