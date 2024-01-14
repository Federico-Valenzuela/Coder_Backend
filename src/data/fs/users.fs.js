import fs from "fs";
import crypto from "crypto";

class UsersManager {
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error.message;
    }
  }
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }
  async createUser(data) {
    try {
      // if (!data.name || !data.email || !data.prhoto) {
      //   throw new Error("Name & Email are required");
      // }
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        email: data.email,
        photo: data.photo
      };
      this.users.push(user);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("create " + user.id);
      return user.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readUsers() {
    try {
      if (this.users.length === 0) {
        throw new Error("There are not users!");
      } else {
        console.log(this.users);
        return this.users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readUserById(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any user with" +`${id}`);
      } else {
        console.log("read " + one);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async upDateUsers(uid, dataEmail,) {
    try {
      const one = this.readUserById(uid);
      if (one) {
        one.email = dataEmail;
        const jsonData = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log(`update user ${uid,one.email}`)
        return  one.email 
      }else{
        throw new Error("There isn't any user");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async removeUserById(id) {
    try {
      let one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any user");
      } else {
        this.users = this.users.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.users, null, 2);
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

const users = new UsersManager("./src/data/fs/files/users.json");

export default users;