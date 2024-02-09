import { Router } from "express";
//import events from  "../../data/fs/events.fs.js"
import {events} from "../../data/mongo/manager.mongo.js"

const eventsRouter = Router()

eventsRouter.get('/' ,async(req, res, next) => {
    try {
        const all = await events.read({})
        return res.render('events', {events: all})


    } catch (error) {
        next(error)
    }
})

eventsRouter.get('/new', async(req, res, next) => {
    try {
        return res.render('new')
    } catch (error) {
        next(error)
    }
})

export  default eventsRouter
    