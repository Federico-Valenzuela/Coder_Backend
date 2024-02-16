import { Router } from "express";

import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.js";
import eventsRouter from "./events.router.api.js";
import ordersRouter from "./orders.router.js";
import cookiesRouter from "./cokies.router.api.js";
import sessionsRouter from "./sessions.router.api.js";


const apiRouter = Router()

//definir los enrutadores de los recursos
//lo obligo a usas /recurso
apiRouter.use("/users",usersRouter)
apiRouter.use("/events",eventsRouter)
apiRouter.use("/products",productsRouter)
apiRouter.use("/orders",ordersRouter)
apiRouter.use("/cookies",cookiesRouter)
apiRouter.use("/sessions",sessionsRouter)

export default apiRouter
//export el enrutador de la API para poder implementarlo en el enrutador del servidor