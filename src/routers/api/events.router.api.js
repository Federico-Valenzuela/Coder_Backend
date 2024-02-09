import { Router } from "express";
//import events from "../../data/fs/events.fs.js";
import { events} from "../../data/mongo/manager.mongo.js";
import propsEvents from "../../middlwares/propsEvents.mid.js"

const eventsRouter = Router();

//quito el props  que debiera estar antes del async manejo desde el model las propiedades obligatorios
eventsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await events.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

eventsRouter.get("/", async (req, res, next) => {
  try {
    const all = await events.read({});
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

eventsRouter.get("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const one = await events.readOne(eid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

eventsRouter.put("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const data = req.body
    const response = await events.update(eid,data);
    return res.json({
      statusCode: 200,
      response: "capacity available: " + response,
    });
  } catch (error) {
    return next(error);
  }
});

eventsRouter.delete("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const response = await events.destroy(eid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default eventsRouter;
