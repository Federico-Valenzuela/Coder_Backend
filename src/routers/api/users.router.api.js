import { Router } from "express";
import users from "../../data/fs/users.fs.js";
import propsUsers from "../../middlwares/propsUsers.mid.js"
//

const usersRouter = Router();

usersRouter.post("/", propsUsers ,async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.createUser(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
//
usersRouter.get("/", async (req, res, next) => {
  try {
    const all = await users.readUsers();
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readUserById(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid/:email", async (req, res, next) => {
  try {
    const { uid, email } = req.params;
    const response = await users.upDateUsers(uid, email);
    return res.json({
      statusCode: 200,
      response: "update: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await users.removeUserById(uid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;