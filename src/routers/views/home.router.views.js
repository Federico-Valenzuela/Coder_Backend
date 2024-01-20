import { Router } from "express";
import products from  "../../data/fs/products.fs.js"

const productsRouter = Router()

productsRouter.get('/' ,async(req, res, next) => {
    try {
        const all = await products.readProducts()
        const inicio = await all.map()
        return res.render('home', {products: inicio})


    } catch (error) {
        next(error)
    }
})

productsRouter.get('/real', async(req, res, next) => {
    try {
        const all = await products.readProducts()

        return res.render('real', {products: all})
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
    