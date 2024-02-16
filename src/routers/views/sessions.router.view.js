import { Router } from "express";
import has8char from "../../middlwares/has8char.mid.js";


const sessionsRouter = Router();

sessionsRouter.get("/register", has8char, async(req,res,next)=>{
  try {
    return res.render("register")
  } catch (error) {
    return next(error)
  }
})




sessionsRouter.get("/login", async(req,res,next)=>{
  try {
    return res.render("login")
  } catch (error) {
    return next(error)
  }
})

export default sessionsRouter;