import { Router } from "express";

//import users from "../../data/fs/users.fs.js";
import {users} from "../../data/mongo/manager.mongo.js"

const usersRouter = Router();

usersRouter.use("/:uid", (req, res, next) => {
  try {
    const { uid } = req.params
    const one = users.readOne(uid)
    if (!one) {
      return res.render('notFound', {not: 'user'})
    }
    
    return res.render("register", { user : one });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
    