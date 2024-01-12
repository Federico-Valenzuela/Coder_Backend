class UserManager {
  static idUser = 0
  constructor() {
  this.users = [];
  }
 
  readU() {
      return this.users;
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
      user.id = UserManager.idUser++

      this.users.push(user);
      return user;
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
}

const managerU = new UserManager()
managerU.createDataU('fede','ruta de foto', 'email')
managerU.createDataU('yesi','ruta de foto', 'email')
managerU.createDataU('edu','ruta de foto','email')
console.log(managerU.readU());
console.log(managerU.readOneU(2))
managerU.removeUserById(2)

