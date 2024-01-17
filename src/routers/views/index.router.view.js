import { Router } from "express";
import eventsRouter from "./events.router.views.js";
import usersRouter from "./users.router.views.js";

const viewsRouter = Router()
viewsRouter.get('/',(req,res,next)=>{
    try {
        const mainEvents= ['hp', 'pokemon', 'batman']
        const date = new Date()
        return res.render('index',{
            events: mainEvents, date , details:'detalle pagina inicio'
        })
    } catch (error) {
        next(error);
    }
})
viewsRouter.use('/events', eventsRouter)
viewsRouter.use('/users', usersRouter)


export default viewsRouter