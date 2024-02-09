import { Router } from "express";
//import products from  "../../data/fs/products.fs.js"
import {products} from  "../../data/mongo/manager.mongo.js"

const productsRouter = Router()

productsRouter.get('/' ,async(req, res, next) => {
    try {
        const all = await products.read({})
        console.log(all)
        const productosFiltrados = all.docs.map((producto) => ({

            title: producto.title,
            
            photo: producto.photo,
            
            
            
            }));
       
        return res.render('home', {pr: productosFiltrados})


    } catch (error) {
        next(error)
    }
})

productsRouter.get('/real', async(req, res, next) => {
    try {
        const all = await products.read({})
        const productosFiltrados = all.docs.map((producto) => ({

            title: producto.title,
            
            photo: producto.photo,
            
            
            
            }));

        return res.render('real', {pr: productosFiltrados})
    } catch (error) {
        next(error)
    }
})
productsRouter.get('/form', (req, res, next) => {
    try {
        return res.render('form')
    } catch (error) {
        next(error)
    }
})

export  default productsRouter
    