import { Router } from "express";
import usersRouter from "./users.router.views.js";
import productsRouter from "./home.router.views.js";
import products from "../../data/fs/products.fs.js";

const viewsRouter = Router()
viewsRouter.get('/', async (req,res,next)=>{
    try {
        const all = await products.readProducts()
        return res.render('index', {products: all})
    } catch (error) {
        next(error);

        
    }
})
viewsRouter.use('/', productsRouter)
viewsRouter.use('/register', usersRouter)


export default viewsRouter