import { Router } from "express";
import usersRouter from "./users.router.views.js";
import productsRouter from "./home.router.views.js";
//import products from "../../data/fs/products.fs.js";
import {products} from  "../../data/mongo/manager.mongo.js"

const viewsRouter = Router()
viewsRouter.get('/', async (req,res,next)=>{
    try {
        const all = await products.read({})
        //console.log(all)
        const productosFiltrados = all.docs.map((producto) => ({

            title: producto.title,
            
            photo: producto.photo,
            
            
            
            }));
        return res.render('index', {pr: productosFiltrados})
    } catch (error) {
        next(error);

        
    }
})
viewsRouter.use('/', productsRouter)
viewsRouter.use('/register', usersRouter)


export default viewsRouter