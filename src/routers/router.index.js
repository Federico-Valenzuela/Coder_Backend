import { Router } from "express";
import apiRouter from "./api/index.router.api.js";

const router = Router()

router.use("/api",apiRouter)
//lo obligo a usas /api
//falta implementar el router vistas

export default router