import { Router } from "express";
import apiRouter from "./api/index.router.api.js";
import viewsRouter from "./views/index.router.view.js";
const router = Router()

router.use("/api",apiRouter)
router.use("/",viewsRouter)
//lo obligo a usas /api
//falta implementar el router vistas

export default router