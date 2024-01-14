
import crypto from 'crypto';
class UserManager {
  static id = 0
  
  constructor() {
  this.users = [];
  }
 
  
 
  createDataU( name, photo, email) {
      if (!name || !photo || !email ) {
          throw new Error("Error, todos los campos deben ser completados");
      }
      const user = {
      name,
      photo,
      email
      };
      user.id = UserManager.id++
      //user.id = crypto.randomBytes(12).toString("hex")

      this.users.push(user);
      return user;
  }
  readU() {
    console.log(this.users)
    return this.users;
}
 
  readOneU(id) {
      const user = this.users.find((user) => user.id === id);
      if (!user) {
      throw new Error("Error, no se encontró el producto con el ID asignado");
      }

      return user;
  }
  removeUserById(id) {
    let one = this.users.find((each) => each.id === id);
    if (!one) {
      throw new Error("There isn't any user");
    }
    else {
      this.users = this.users.filter((each) => each.id !== id);
      console.log("deleted " + id);
      return id;
    }
  }
  upDate(id, dataName, dataPhoto, dataEmail) {
    const one = this.readOneU(id);
    if (one) {
      one.name = dataName; 
      one.photo = dataPhoto; 
      one.mail=dataEmail;
      console.log('modificado user id :'+ id)
      console.log(this.users)
    }else{
      console.log("no existe el id  ");
    }
  }  
}


const managerU = new UserManager()

managerU.createDataU('fede','ruta de foto', 'email')
managerU.createDataU('yesi','ruta de foto', 'email')
managerU.createDataU('edu','ruta de foto','email')
managerU.readU()

console.log(managerU.readOneU(2));

//console.log(managerU.readOneU('7c45a54ad456174daf428007'));
//console.log(managerU.readOneU(9))
managerU.removeUserById(2)
managerU.readU()
managerU.upDate(1,'xx', 'yyyy','zzzz', 'aaaa')

